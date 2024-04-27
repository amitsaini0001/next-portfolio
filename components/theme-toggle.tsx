"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="-rotate-90 flex items-start justify-start font-elite ">
        <p className="max-h-12 text-sm absolute left-0 top-0">Loading..</p>
      </div>
    );
  }

  return (
    <div className="-rotate-90 flex items-start justify-start font-elite hover:cursor-pointer"
    onClick={() =>
        theme === "dark" ? setTheme("light") : setTheme("dark")
      }
    >
      <Button
        asChild
        size={"icon"}
        variant={"outline"}
        className="w-6 h-6 container border-[color:var(--border-color)] "
        
      >
        <div>
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </div>
      </Button>
      <p className="max-h-5 text-sm absolute left-8 top-1">{theme}</p>
    </div>
  );
}
