"use client";

import { Prompt } from "@/components/terminal/prompt";

type Channel = {
  label: string;
  command: string;
  href: string;
  display: string;
};

const channels: Channel[] = [
  {
    label: "email",
    command: "./send-mail.sh",
    href: "mailto:amit231564@gmail.com",
    display: "amit231564@gmail.com",
  },
  {
    label: "phone",
    command: "./call.sh",
    href: "tel:+61497845880",
    display: "+61 497 845 880",
  },
  {
    label: "github",
    command: "git remote -v",
    href: "https://github.com/amitsaini0001",
    display: "github.com/amitsaini0001",
  },
  {
    label: "linkedin",
    command: "curl linkedin",
    href: "https://www.linkedin.com/in/meisamit",
    display: "linkedin.com/in/meisamit",
  },
  {
    label: "resume",
    command: "wget resume.pdf",
    href: "/amit-resume-26.pdf",
    display: "amit_saini_resume.pdf",
  },
];

export default function Contact() {
  return (
    <div className="space-y-4">
      <Prompt command="cat contact.txt" />
      <div className="text-[10px] md:text-xs text-terminal-dim leading-relaxed">
        # principal full stack engineer · melbourne, au<br />
        # available for: tech lead · architecture · ai products · contract / full-time
      </div>

      <div className="space-y-3 pt-2">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            download={c.label === "resume" ? "amit_saini_resume.pdf" : undefined}
            className="group block border-l-2 border-terminal-green/30 pl-3 md:pl-4 hover:border-terminal-green hover:bg-terminal-green/5 transition-colors"
          >
            <div className="text-[10px] md:text-xs text-terminal-dim">
              <span className="text-terminal-green/80">[{c.label}]</span> <span className="text-foreground">{c.command}</span>
            </div>
            <div className="mt-1 text-sm md:text-base text-terminal-green term-glow group-hover:underline">
              {c.display}
            </div>
          </a>
        ))}
      </div>
      <Prompt className="pt-2" command="" />
    </div>
  );
}
