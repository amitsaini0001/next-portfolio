"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  user?: string;
  host?: string;
  cwd?: string;
  command?: string;
  children?: ReactNode;
  className?: string;
};

export function Prompt({
  user = "amit",
  host = "portfolio",
  cwd = "~",
  command,
  children,
  className,
}: Props) {
  return (
    <div className={cn("font-mono text-sm leading-relaxed", className)}>
      <div className="flex flex-wrap items-baseline gap-x-1">
        <span className="text-terminal-dim">{user}@{host}</span>
        <span className="text-terminal-dim">:</span>
        <span className="text-terminal-green/80">{cwd}</span>
        <span className="text-terminal-dim">$</span>
        {command && <span className="text-foreground">{command}</span>}
      </div>
      {children && <div className="mt-1">{children}</div>}
    </div>
  );
}
