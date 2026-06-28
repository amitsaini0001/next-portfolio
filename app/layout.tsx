import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CrtOverlay } from "@/components/crt-overlay";
import { cn } from "@/lib/utils";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "amit@portfolio — principal engineer",
  description:
    "Amit Saini — Principal Full Stack Engineer & Tech Lead. Web, Mobile, Backend, Cloud & AI.",
  metadataBase: new URL("https://next-portfolio-delta-ruby.vercel.app"),
  openGraph: {
    title: "amit@portfolio",
    description: "Principal Full Stack Engineer & Tech Lead.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background text-foreground antialiased font-mono lg:overflow-hidden",
          mono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <CrtOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
