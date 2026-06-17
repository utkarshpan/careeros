"use client";

import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center justify-between h-full px-6 lg:px-8">
        {/* Left — spacer for mobile hamburger area */}
        <div className="lg:hidden w-12" />

        {/* Center/Left — Page context */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm font-medium text-muted-foreground">
            Workspace Active
          </span>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>
          )}

          {/* Notifications */}
          <button
            className="p-2.5 rounded-xl hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground relative"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
          </button>

          {/* Separator */}
          <div className="h-8 w-px bg-border mx-1" />

          {/* User button */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
