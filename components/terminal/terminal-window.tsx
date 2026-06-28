"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  title?: string;
  user?: string;
  host?: string;
  cwd?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function TerminalWindow({
  title,
  user = "amit",
  host = "portfolio",
  cwd = "~",
  children,
  className,
  bodyClassName,
}: Props) {
  return (
    <div className={cn("term-box bg-background/80 backdrop-blur-sm flex flex-col min-h-0", className)}>
      <div className="flex items-center justify-between border-b border-terminal-green/40 px-3 py-1.5 text-[10px] md:text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-terminal-danger/80" />
          <span className="h-2 w-2 rounded-full bg-terminal-warn/80" />
          <span className="h-2 w-2 rounded-full bg-terminal-green/80" />
        </div>
        <div className="flex-1 text-center text-terminal-dim truncate px-2">
          {title ?? `${user}@${host}: ${cwd}`}
        </div>
        <div className="text-terminal-dim text-[10px]">[ssh]</div>
      </div>
      <div className={cn("p-3 md:p-4 flex-1 min-h-0 overflow-auto no-scrollbar", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
