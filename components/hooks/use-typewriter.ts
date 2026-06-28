"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text: string, opts?: { speed?: number; startDelay?: number; enabled?: boolean }) {
  const speed = opts?.speed ?? 18;
  const startDelay = opts?.startDelay ?? 0;
  const enabled = opts?.enabled ?? true;
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setOut(text);
      setDone(true);
      return;
    }

    setOut("");
    setDone(false);
    let i = 0;
    let raf: number;
    let timer: ReturnType<typeof setTimeout>;

    const start = setTimeout(() => {
      const tick = () => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          return;
        }
        timer = setTimeout(() => {
          raf = requestAnimationFrame(tick);
        }, speed);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, speed, startDelay, enabled]);

  return { text: out, done };
}
