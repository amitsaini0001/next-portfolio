"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";

type Pin = { lat: number; lng: number; label?: string };

type Props = {
  pin?: Pin | null;
};

const RADIUS = 0.8;
const BASE_MARKER_SIZE = 0.05;

export default function SceneCanvas({ pin }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState(320);

  // Mutable state read by the animation loop. The globe is created ONCE on
  // mount; pin changes only update these refs — no globe recreate.
  const stateRef = useRef({
    phi: 0,
    theta: 0.25,
    targetPhi: null as number | null,
    targetTheta: 0.25,
    dragging: false,
  });
  const markersRef = useRef<COBEOptions["markers"]>([]);
  const localRef = useRef<{ x: number; y: number; z: number } | null>(null);

  // Resize: square sized to the smaller of container width/height
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const s = Math.max(160, Math.min(rect.width, rect.height));
      setSide(s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // React to pin changes — add marker dynamically + start focus animation
  useEffect(() => {
    if (pin) {
      localRef.current = localFromLatLng(pin.lat, pin.lng);
      markersRef.current = [
        { location: [pin.lat, pin.lng], size: BASE_MARKER_SIZE, id: "user-pin" },
      ];
      const [tPhi, tTheta] = locationToAngles(pin.lat, pin.lng);
      stateRef.current.targetPhi = tPhi;
      stateRef.current.targetTheta = tTheta;
    } else {
      localRef.current = null;
      markersRef.current = [];
      stateRef.current.targetPhi = null;
      stateRef.current.targetTheta = 0.25;
    }
  }, [pin]);

  // Create the cobe globe ONCE on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Hide canvas until the first real frame is painted; otherwise users
    // see a flash of cobe's default (white sphere) before our options apply.
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 250ms ease";

    const scale = 1;
    let raf = 0;
    let lastX = 0;
    let lastY = 0;
    let revealed = false;

    const opts: COBEOptions = {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: stateRef.current.phi,
      theta: stateRef.current.theta,
      dark: 1,
      diffuse: 1.2,
      scale,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 1, 0.5],
      markerColor: [0.1, 1, 0.4],
      glowColor: [0.1, 1, 0.4],
      offset: [0, 0],
      markers: markersRef.current,
    };

    const globe = createGlobe(canvas, opts);

    const animate = () => {
      const s = stateRef.current;
      if (!s.dragging) {
        if (s.targetPhi !== null) {
          const diff = s.targetPhi - s.phi;
          if (Math.abs(diff) > 0.0005) {
            s.phi += diff * 0.08;
          }
        }
        s.theta += (s.targetTheta - s.theta) * 0.08;
      }

      // Pulse marker size (mutate in-place to avoid allocations)
      const markers = markersRef.current;
      if (markers && markers.length > 0) {
        const t = performance.now() * 0.003;
        const pulseSize = BASE_MARKER_SIZE + (Math.sin(t * 2) + 1) * 0.025;
        markers[0].size = pulseSize;
      }

      globe.update({ phi: s.phi, theta: s.theta, markers });

      // Reveal after first painted frame (double-rAF guarantees commit)
      if (!revealed) {
        revealed = true;
        requestAnimationFrame(() => {
          canvas.style.opacity = "1";
        });
      }

      // Position the HTML label overlay (if marker exists)
      if (markerRef.current) {
        const local = localRef.current;
        if (local) {
          const p = projectToScreen(local, s.phi, s.theta, scale);
          markerRef.current.style.left = `${p.x * 100}%`;
          markerRef.current.style.top = `${p.y * 100}%`;
          markerRef.current.style.opacity = p.visible ? "1" : "0";
        } else {
          markerRef.current.style.opacity = "0";
        }
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      const s = stateRef.current;
      s.dragging = true;
      s.targetPhi = null;
      lastX = e.clientX;
      lastY = e.clientY;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
      canvas.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      s.phi += dx * 0.005;
      s.theta = clamp(s.theta + dy * 0.005, -1.4, 1.4);
      s.targetTheta = s.theta;
    };

    const onUp = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.dragging) return;
      s.dragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
    >
      <div className="relative" style={{ width: side, height: side }}>
        <canvas
          ref={canvasRef}
          width={1200}
          height={1200}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
        {pin && (
          <div
            ref={markerRef}
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: "50%",
              top: "50%",
              opacity: 0,
              willChange: "left, top",
            }}
          >
            <div
              className="absolute rounded-full border border-terminal-green/80"
              style={{
                width: 12,
                height: 12,
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                animation: "marker-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            <div
              className="absolute rounded-full border border-terminal-green/60"
              style={{
                width: 12,
                height: 12,
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                animation: "marker-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
                animationDelay: "0.8s",
              }}
            />
            <div
              className="absolute rounded-full bg-terminal-green"
              style={{
                width: 6,
                height: 6,
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 8px hsl(var(--terminal-green))",
              }}
            />
            <div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                transform: "translate(-50%, calc(-100% - 16px))",
              }}
            >
              <div className="whitespace-nowrap text-[10px] font-mono uppercase tracking-wide text-terminal-green term-glow bg-background/80 backdrop-blur-sm px-1.5 py-0.5 border border-terminal-green/60">
                {pin.label ?? "TARGET"}
              </div>
              <div
                className="mx-auto bg-terminal-green/60"
                style={{ width: 1, height: 10 }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marker-ping {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.9;
          }
          80%,
          100% {
            transform: translate(-50%, -50%) scale(3.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function locationToAngles(lat: number, lng: number): [number, number] {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

function localFromLatLng(lat: number, lng: number) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const cosLat = Math.cos(latRad);
  return {
    x: Math.cos(lngRad) * cosLat,
    y: Math.sin(latRad),
    z: -Math.sin(lngRad) * cosLat,
  };
}

function projectToScreen(
  local: { x: number; y: number; z: number },
  phi: number,
  theta: number,
  scale: number
) {
  const cx = Math.cos(theta);
  const sx = Math.sin(theta);
  const cy = Math.cos(phi);
  const sy = Math.sin(phi);
  const rx = local.x * cy + local.z * sy;
  const ry = local.x * sy * sx + local.y * cx + local.z * (-cy * sx);
  const rz = local.x * (-sy * cx) + local.y * sx + local.z * cy * cx;
  const fracX = (rx * RADIUS * scale + 1) / 2;
  const fracY = (1 - ry * RADIUS * scale) / 2;
  return { x: fracX, y: fracY, visible: rz > 0 };
}
