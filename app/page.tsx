"use client";

import { useMemo, useState } from "react";
import { Github, Linkedin, FileDown, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/theme-toggle";
import { TerminalWindow } from "@/components/terminal/terminal-window";
import { BootSequence } from "@/components/terminal/boot-sequence";
import { GlobePanel } from "@/components/scene/globe-panel";
import { useUserInfo } from "@/components/hooks/use-user-info";

import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Contact from "@/components/contact";

type Tab = "exp" | "skills" | "contact";

const NAV: { key: Tab; cmd: string; label: string }[] = [
  { key: "exp", cmd: "cat experience.log", label: "experience" },
  { key: "skills", cmd: "ls ./skills/", label: "skills" },
  { key: "contact", cmd: "./contact.sh", label: "contact" },
];

export default function Home() {
  const { data: user, status } = useUserInfo();
  const [tab, setTab] = useState<Tab>("exp");
  const [bootDone, setBootDone] = useState(false);
  const [globeRevealed, setGlobeRevealed] = useState(false);

  const pin = useMemo(() => {
    if (status !== "ready" || !user) return null;
    if (user.latitude === 0 && user.longitude === 0) return null;
    return { lat: user.latitude, lng: user.longitude };
  }, [user, status]);

  // Only flow the pin into the globe after the boot sequence says so
  const effectivePin = globeRevealed ? pin : null;

  return (
    <main className="min-h-dvh w-screen bg-background text-foreground relative overflow-y-auto lg:h-dvh lg:overflow-hidden">
      {/* Header bar */}
      <div className="sticky top-0 z-20 px-3 md:px-6 pt-3 md:pt-4 pb-2 flex items-center justify-between gap-2 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-terminal-dim">
          <Terminal className="h-3 w-3" />
          <span className="hidden sm:inline">amit.os v4.7</span>
          <span className="text-terminal-green animate-pulse-slow">●</span>
          <span className="hidden md:inline">{user?.city ?? "scanning..."}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/amitsaini0001"
            target="_blank"
            rel="noreferrer"
            className="h-7 w-7 border border-terminal-green/60 hover:bg-terminal-green hover:text-background transition-colors flex items-center justify-center"
            aria-label="github"
          >
            <Github className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/meisamit"
            target="_blank"
            rel="noreferrer"
            className="h-7 w-7 border border-terminal-green/60 hover:bg-terminal-green hover:text-background transition-colors flex items-center justify-center"
            aria-label="linkedin"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a
            href="/amit_saini_resume.pdf"
            download="amit_saini_resume.pdf"
            className="h-7 w-7 border border-terminal-green/60 hover:bg-terminal-green hover:text-background transition-colors flex items-center justify-center"
            aria-label="resume"
          >
            <FileDown className="h-3.5 w-3.5" />
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Content grid */}
      <div className="relative z-10 w-full px-3 md:px-6 pb-12 lg:pb-10 lg:h-[calc(100dvh-72px)]">
        <div className="w-full lg:h-full grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
          {/* Left column — identity + boot + globe */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3 md:gap-4 lg:min-h-0">
            <IdentityCard />
            <TerminalWindow
              title="amit@portfolio: ~/init"
              className="min-h-[180px] lg:flex-1 lg:min-h-0"
            >
              <BootSequence
                user={user}
                status={status}
                onComplete={() => setBootDone(true)}
                onRenderGlobe={() => setGlobeRevealed(true)}
              />
            </TerminalWindow>
            <GlobePanel
              user={user}
              pin={effectivePin}
              className="h-[260px] sm:h-[320px] lg:h-[44%] lg:min-h-[280px]"
            />
          </div>

          {/* Right column — nav + main content */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-3 md:gap-4 lg:min-h-0">
            <Nav tab={tab} setTab={setTab} disabled={!bootDone} />
            <TerminalWindow
              title={`amit@portfolio: ~/${tab}`}
              className="min-h-[400px] lg:flex-1 lg:min-h-0"
              bodyClassName="text-sm"
            >
              {tab === "exp" && <Experience />}
              {tab === "skills" && <Skills />}
              {tab === "contact" && <Contact />}
            </TerminalWindow>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="lg:absolute bottom-0 left-0 right-0 z-20 px-3 md:px-6 py-2 md:py-3 flex items-center justify-between text-[10px] text-terminal-dim gap-2 border-t border-terminal-green/20 bg-background/80 backdrop-blur-sm">
        <span className="truncate">© {new Date().getFullYear()} amit saini</span>
        <span className="truncate hidden sm:inline">
          three.js · next.js · react · ❤
        </span>
        <span className="truncate">
          {status === "ready" && user
            ? `you: ${user.city}, ${user.country}`
            : status === "error"
            ? "you: redacted"
            : "scanning..."}
        </span>
      </div>
    </main>
  );
}

function IdentityCard() {
  return (
    <div className="term-box bg-background/80 backdrop-blur-sm p-3 md:p-4 space-y-2">
      <pre className="ascii-shadow text-terminal-green text-[8px] md:text-[10px] leading-[1.05] whitespace-pre overflow-hidden">
{`     _              _ _
    / \\   _ __ ___ (_) |_
   / _ \\ | '_ \` _ \\| | __|
  / ___ \\| | | | | | | |_
 /_/   \\_\\_| |_| |_|_|\\__|`}
      </pre>
      <div className="space-y-0.5">
        <div className="text-sm md:text-base font-semibold text-foreground">
          Amit Saini <span className="text-terminal-dim font-normal">/ principal engineer</span>
        </div>
        <div className="text-[10px] md:text-xs text-terminal-dim leading-tight">
          full stack · mobile · cloud · ai · 8+ yrs<br />
          melbourne, au · 🇦🇺
        </div>
      </div>
    </div>
  );
}

function Nav({
  tab,
  setTab,
  disabled,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  disabled: boolean;
}) {
  return (
    <div className="term-box bg-background/80 backdrop-blur-sm p-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] md:text-xs text-terminal-dim pl-1 hidden sm:inline">
          $
        </span>
        {NAV.map((n) => (
          <button
            key={n.key}
            disabled={disabled}
            onClick={() => setTab(n.key)}
            className={cn(
              "text-[10px] md:text-xs px-2 py-1 border transition-colors",
              tab === n.key
                ? "border-terminal-green bg-terminal-green text-background"
                : "border-terminal-green/40 text-foreground hover:bg-terminal-green/10",
              disabled && "opacity-30 cursor-not-allowed"
            )}
          >
            {n.cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
