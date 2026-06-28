"use client";

import { ThreeScene } from "./three-scene";
import { TerminalWindow } from "@/components/terminal/terminal-window";
import { UserInfo } from "@/components/hooks/use-user-info";
import { cn } from "@/lib/utils";

type Props = {
  user: UserInfo | null;
  pin: { lat: number; lng: number } | null;
  className?: string;
};

export function GlobePanel({ user, pin, className }: Props) {
  const locked = !!pin;
  const labeledPin = pin && user ? { ...pin, label: user.city } : pin;
  return (
    <TerminalWindow
      title="amit@portfolio: ~/scan"
      className={cn("flex flex-col", className)}
      bodyClassName="p-0 relative overflow-hidden"
    >
      {/* Canvas fills the body */}
      <div className="absolute inset-0">
        <ThreeScene pin={labeledPin} />
      </div>

      {/* Scan-grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--terminal-green) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--terminal-green) / 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Corner brackets */}
      <Brackets />

      {/* Top-left status */}
      <div className="pointer-events-none absolute top-2 left-2 text-[10px] leading-tight">
        <div className="text-terminal-dim">
          <span className="text-terminal-green/80">●</span> {locked ? "TARGET_LOCKED" : "SCANNING..."}
        </div>
        <div className="text-terminal-dim/70">mode=geo:ipv4</div>
      </div>

      {/* Bottom-left telemetry */}
      <div className="pointer-events-none absolute bottom-2 left-2 text-[10px] leading-tight font-mono">
        {locked && user ? (
          <>
            <Row k="LAT" v={user.latitude.toFixed(4)} />
            <Row k="LNG" v={user.longitude.toFixed(4)} />
            <Row k="LOC" v={`${user.city}, ${user.country}`} />
          </>
        ) : (
          <div className="text-terminal-dim animate-pulse-slow">resolving target...</div>
        )}
      </div>

      {/* Bottom-right info */}
      <div className="pointer-events-none absolute bottom-2 right-2 text-[10px] leading-tight font-mono text-right">
        <div className="text-terminal-dim">
          <span className="text-terminal-green/80">[</span>WGS84<span className="text-terminal-green/80">]</span>
        </div>
        <div className="text-terminal-dim/70">render=webgl2</div>
      </div>
    </TerminalWindow>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-1.5">
      <span className="text-terminal-dim/70 w-8">{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

function Brackets() {
  const cls = "pointer-events-none absolute border-terminal-green/70 w-4 h-4";
  return (
    <>
      <div className={cn(cls, "top-1 left-1 border-t border-l")} />
      <div className={cn(cls, "top-1 right-1 border-t border-r")} />
      <div className={cn(cls, "bottom-1 left-1 border-b border-l")} />
      <div className={cn(cls, "bottom-1 right-1 border-b border-r")} />
    </>
  );
}
