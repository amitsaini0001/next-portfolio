"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("h-7 w-24 border border-terminal-green/40 text-[10px] text-terminal-dim flex items-center justify-center", className)}>
        loading...
      </div>
    );
  }

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : SunMoon;

  return (
    <button
      onClick={cycle}
      className={cn(
        "group h-7 px-2 border border-terminal-green/60 hover:bg-terminal-green hover:text-background transition-colors text-[10px] md:text-xs flex items-center gap-1.5 font-mono",
        className
      )}
      aria-label={`theme: ${theme}`}
    >
      <Icon className="h-3 w-3" />
      <span>theme={theme}</span>
    </button>
  );
}
