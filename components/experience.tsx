"use client";

import { Prompt } from "@/components/terminal/prompt";

type Role = {
  time: string;
  role: string;
  company: string;
  location: string;
  stack: string;
  url?: string;
};

const roles: Role[] = [
  {
    time: "2025—now",
    role: "Founder / Principal Engineer",
    company: "Beemur Apps",
    location: "Melbourne",
    stack: "AI image/video gen · ComfyUI · LoRA · React Native · SwiftUI",
  },
  {
    time: "Sep—Dec 2025",
    role: "Senior Software Consultant",
    company: "Mastercard",
    location: "Australia",
    stack: "Gatsby → Next.js migration · Contentful · SEO/perf",
  },
  {
    time: "2024—2025",
    role: "Lead Software Engineer",
    company: "Labrys",
    location: "Brisbane",
    stack: "Web3 · Next.js · MongoDB · Redis · Web3.js · Glue · Vana",
  },
  {
    time: "2023—2024",
    role: "Senior Software Engineer",
    company: "Shell Energy",
    location: "Melbourne",
    stack: "Micro-frontends · React · Storybook · AWS CDK · Lambda",
    url: "https://shellenergy.com.au",
  },
  {
    time: "2022—2023",
    role: "Technical Lead",
    company: "Petcircle",
    location: "Sydney",
    stack: "Preact · Next.js · Strapi · AWS · Spring Boot",
    url: "https://petcircle.com.au",
  },
  {
    time: "2020—2022",
    role: "Full Stack Tech Lead",
    company: "TinyMCE",
    location: "Brisbane",
    stack: "React · Gatsby · CloudFormation · Ansible · ~1M MAUs",
    url: "https://tiny.cloud",
  },
  {
    time: "2018—2020",
    role: "Software Developer",
    company: "SITA",
    location: "Brisbane",
    stack: "C# · C++ · React · Vue · Node.js · ML · Raspberry Pi",
    url: "https://sita.aero",
  },
  {
    time: "2017",
    role: "Android Developer",
    company: "WULI",
    location: "Brisbane",
    stack: "Kotlin · Android",
  },
];

export default function Experience() {
  return (
    <div className="space-y-4">
      <Prompt command="cat experience.log" />
      <pre className="text-terminal-dim text-[10px] md:text-xs leading-tight whitespace-pre overflow-x-auto no-scrollbar">
{`# 8+ years · web · mobile · backend · cloud · ai
# scroll for history\n`}
      </pre>
      <div className="space-y-3 md:space-y-4">
        {roles.map((r, i) => (
          <RoleRow key={`${r.company}-${i}`} role={r} index={i} />
        ))}
      </div>
      <Prompt className="pt-2" command="" />
    </div>
  );
}

function RoleRow({ role, index }: { role: Role; index: number }) {
  const inner = (
    <div className="group border-l-2 border-terminal-green/30 pl-3 md:pl-4 hover:border-terminal-green transition-colors">
      <div className="flex flex-wrap items-baseline gap-x-2 text-[10px] md:text-xs text-terminal-dim">
        <span className="text-terminal-green/80">[{String(index).padStart(2, "0")}]</span>
        <span>{role.time}</span>
        <span>·</span>
        <span>{role.location}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm md:text-base">
        <span className="text-foreground font-semibold">{role.role}</span>
        <span className="text-terminal-dim">@</span>
        <span className="text-terminal-green term-glow">{role.company}</span>
      </div>
      <div className="mt-1 text-[10px] md:text-xs text-terminal-dim">{role.stack}</div>
    </div>
  );

  if (role.url) {
    return (
      <a
        href={role.url}
        target="_blank"
        rel="noreferrer"
        className="block hover:bg-terminal-green/5 transition-colors"
      >
        {inner}
      </a>
    );
  }
  return inner;
}
