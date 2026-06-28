"use client";

import { Prompt } from "@/components/terminal/prompt";

type Group = { name: string; items: string[] };

const groups: Group[] = [
  {
    name: "frontend",
    items: [
      "React",
      "Next.js",
      "Gatsby",
      "Vue",
      "Svelte",
      "Preact",
      "TypeScript",
      "JavaScript",
      "Tailwind",
      "Styled Components",
      "Storybook",
      "Micro-frontends",
      "Design Systems",
      "Accessibility (a11y)",
      "SEO",
      "Web Performance",
      "Three.js",
    ],
  },
  {
    name: "backend",
    items: [
      "Node.js",
      ".NET",
      "C#",
      "C++",
      "Python",
      "Java",
      "Spring Boot",
      "PHP",
      "REST APIs",
      "GraphQL",
      "Serverless",
      "Event-Driven",
      "API Design",
      "Microservices",
      "WebSockets",
    ],
  },
  {
    name: "data",
    items: [
      "PostgreSQL",
      "MySQL",
      "MSSQL",
      "MongoDB",
      "SQLite",
      "Redis",
      "Firebase",
      "NeonDB",
      "Turso",
      "DynamoDB",
      "Prisma",
    ],
  },
  {
    name: "mobile",
    items: [
      "React Native",
      "Expo",
      "SwiftUI",
      "SwiftData",
      "Kotlin",
      "Android",
      "StoreKit 2",
      "RevenueCat",
      "CloudKit",
      "PDFKit",
      "Push Notifications",
    ],
  },
  {
    name: "cloud_devops",
    items: [
      "AWS",
      "GCP",
      "Vercel",
      "Render",
      "Lambda",
      "S3",
      "CloudFront",
      "Route 53",
      "AWS CDK",
      "CloudFormation",
      "Terraform",
      "SST",
      "Docker",
      "Nginx",
      "Ansible",
      "Jenkins",
      "Azure DevOps",
      "GitHub Actions",
      "CI/CD",
      "Observability",
      "Datadog",
      "New Relic",
      "Dynatrace",
    ],
  },
  {
    name: "ai_ml",
    items: [
      "OpenAI",
      "LangChain",
      "ComfyUI",
      "Custom LoRA Training",
      "Image/Video Generation",
      "Ostris",
      "TensorFlow",
      "OpenCV",
      "OCR Pipelines",
      "RAG",
      "Embeddings",
      "Prompt Engineering",
      "AI Agents",
    ],
  },
  {
    name: "web3",
    items: ["Web3.js", "Smart Contract UX", "Decentralised Apps", "Glue", "Vana"],
  },
  {
    name: "integrations",
    items: [
      "Contentful",
      "Strapi",
      "Notion API",
      "Confluence API",
      "Figma API",
      "Messenger",
      "WhatsApp",
      "Telegram",
      "Stripe",
    ],
  },
  {
    name: "product",
    items: [
      "SaaS",
      "Consumer Apps",
      "Billing & Subscriptions",
      "Analytics",
      "Growth",
      "Go-to-Market",
      "A/B Testing",
    ],
  },
  {
    name: "leadership",
    items: [
      "System Design",
      "Architecture",
      "Tech Strategy",
      "Roadmapping",
      "Mentoring",
      "Code Review",
      "Engineering Standards",
      "Stakeholder Mgmt",
      "Hiring",
      "Agile / Scrum",
    ],
  },
];

export default function Skills() {
  return (
    <div className="space-y-4">
      <Prompt command="ls -la ./skills/" />
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.name} className="space-y-1">
            <div className="text-[10px] md:text-xs text-terminal-dim">
              drwxr-xr-x amit amit{"  "}<span className="text-terminal-green">{g.name}/</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="text-[10px] md:text-xs px-2 py-0.5 border border-terminal-green/40 text-foreground hover:bg-terminal-green hover:text-background transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Prompt className="pt-2" command="" />
    </div>
  );
}
