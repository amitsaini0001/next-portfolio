import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Roboto as FontSans, Special_Elite as Special } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const specialElite = Special({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--special-elite",
});

export const metadata: Metadata = {
  title: "Amit Saini",
  description: "Amit Saini Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://cdn.jsdelivr.net/gh/tengbao/vanta/dist/vanta.clouds.min.js"
        ></script>
      </head>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable,
          specialElite.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
