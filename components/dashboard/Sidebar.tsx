"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Mic,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Voice Interview", href: "/dashboard/interview-voice", icon: Mic },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-xl bg-card border border-border shadow-lg hover:bg-muted transition-colors"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <Menu className="h-5 w-5 text-foreground" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full z-50 w-64
        bg-sidebar-bg border-r border-sidebar-border
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 px-5 border-b border-sidebar-border shrink-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-bg text-white shadow-md shadow-primary/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight gradient-text">
            CareerOS
          </span>
        </div>

        {/* Navigation Label */}
        <div className="px-5 pt-6 pb-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Navigation
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                <item.icon
                  className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                    isActive ? "text-primary" : "group-hover:text-foreground"
                  }`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4 text-primary/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Card */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          {mounted && (
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/30 border border-border/50 text-xs">
              <span className="text-muted-foreground font-semibold">Theme</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground border border-border bg-card transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          )}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shadow-sm">
              AI
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                AI Assistant
              </p>
              <p className="text-[11px] text-muted-foreground">Ready to help</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>
        </div>
      </aside>
    </>
  );
}
