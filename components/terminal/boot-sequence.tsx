"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTypewriter } from "@/components/hooks/use-typewriter";
import { UserInfo } from "@/components/hooks/use-user-info";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "ready" | "error";

type Props = {
  user: UserInfo | null;
  status: Status;
  onComplete?: () => void;
  onRenderGlobe?: () => void;
};

const RENDER_GLOBE_PREFIX = "rendering globe";

type Line =
  | { kind: "log"; text: string; tone?: "ok" | "warn" | "danger" | "dim" }
  | { kind: "kv"; key: string; value: string };

export function BootSequence({ user, status, onComplete, onRenderGlobe }: Props) {
  const lines = useMemo<Line[]>(() => buildLines(user, status), [user, status]);
  const [index, setIndex] = useState(0);
  const renderFired = useRef(false);

  const current = lines[index];
  const isTyping = current?.kind === "log";
  const { text, done } = useTypewriter(
    isTyping ? (current as Extract<Line, { kind: "log" }>).text : "",
    { speed: 14, enabled: isTyping }
  );

  useEffect(() => {
    if (!current) return;
    if (current.kind === "log") {
      if (done) {
        const t = setTimeout(() => setIndex((i) => i + 1), 80);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => setIndex((i) => i + 1), 50);
      return () => clearTimeout(t);
    }
  }, [done, current]);

  // Fire onRenderGlobe the moment the "rendering globe..." line starts typing
  useEffect(() => {
    if (renderFired.current) return;
    if (current?.kind === "log" && current.text.startsWith(RENDER_GLOBE_PREFIX)) {
      renderFired.current = true;
      onRenderGlobe?.();
    }
  }, [current, onRenderGlobe]);

  useEffect(() => {
    if (index >= lines.length && onComplete) onComplete();
  }, [index, lines.length, onComplete]);

  // Auto-scroll the terminal body to keep the newest output in view as it types
  const contentRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const findScroller = (start: HTMLElement | null) => {
      let el: HTMLElement | null = start;
      while (el) {
        const cs = getComputedStyle(el);
        if (
          cs.overflowY === "auto" ||
          cs.overflowY === "scroll" ||
          cs.overflow === "auto" ||
          cs.overflow === "scroll"
        ) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    };
    const scroller = findScroller(contentRef.current?.parentElement ?? null);
    if (scroller) {
      scroller.scrollTop = scroller.scrollHeight;
    } else {
      endRef.current?.scrollIntoView({ block: "end", behavior: "auto" });
    }
  }, [index, text]);

  return (
    <div
      ref={contentRef}
      className="font-mono text-xs md:text-sm leading-relaxed space-y-0.5"
    >
      {lines.slice(0, index).map((line, i) => (
        <LineView key={i} line={line} />
      ))}
      {current?.kind === "log" && (
        <div className={toneClass((current as Extract<Line, { kind: "log" }>).tone)}>
          <span className="text-terminal-dim mr-2">&gt;</span>
          {text}
          {!done && <span className="term-cursor" />}
        </div>
      )}
      <div ref={endRef} aria-hidden />
    </div>
  );
}

function LineView({ line }: { line: Line }) {
  if (line.kind === "log") {
    return (
      <div className={cn("animate-fade-in", toneClass(line.tone))}>
        <span className="text-terminal-dim mr-2">&gt;</span>
        {line.text}
      </div>
    );
  }
  return (
    <div className="animate-fade-in pl-4 flex gap-2 text-terminal-dim">
      <span className="w-24 md:w-28 shrink-0 text-terminal-dim/70">{line.key}</span>
      <span className="text-foreground truncate">{line.value}</span>
    </div>
  );
}

function toneClass(tone?: "ok" | "warn" | "danger" | "dim") {
  switch (tone) {
    case "danger":
      return "text-terminal-danger";
    case "warn":
      return "text-terminal-warn";
    case "dim":
      return "text-terminal-dim";
    default:
      return "text-foreground";
  }
}

function buildLines(user: UserInfo | null, status: Status): Line[] {
  const base: Line[] = [
    { kind: "log", text: "booting amit.os v4.7 ..." },
    { kind: "log", text: "loading kernel modules ... ok", tone: "dim" },
    { kind: "log", text: "establishing secure shell ... ok", tone: "dim" },
    { kind: "log", text: "resolving target ip ..." },
  ];

  if (status === "loading" || status === "idle") {
    base.push({ kind: "log", text: "geolocation lookup in progress ...", tone: "dim" });
    return base;
  }

  if (status === "error") {
    return [
      ...base,
      { kind: "log", text: "geolocation lookup failed", tone: "danger" },
      { kind: "log", text: "operating with degraded telemetry", tone: "warn" },
      { kind: "log", text: "rendering globe (no pin) ...", tone: "dim" },
      { kind: "log", text: "ready.", tone: "ok" },
    ];
  }

  if (!user) return base;

  return [
    ...base,
    { kind: "log", text: `target acquired: ${user.ip}`, tone: "warn" },
    { kind: "log", text: "geolocation lookup ...", tone: "dim" },
    { kind: "kv", key: "city", value: user.city },
    { kind: "kv", key: "region", value: user.region },
    { kind: "kv", key: "country", value: `${user.countryName} (${user.country})` },
    { kind: "kv", key: "lat/lng", value: `${user.latitude.toFixed(2)}, ${user.longitude.toFixed(2)}` },
    { kind: "kv", key: "timezone", value: user.timezone },
    { kind: "kv", key: "asn", value: user.asn },
    { kind: "kv", key: "isp", value: user.org },
    { kind: "log", text: "rendering globe + pin ...", tone: "dim" },
    { kind: "log", text: "ready. type `help` for commands.", tone: "ok" },
  ];
}
