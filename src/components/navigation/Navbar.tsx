"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Menu,
  Palette,
  Sun,
  Moon,
  FileText,
  Command,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import ThemeModal from "./ThemeModal";
import CommandMenu from "./CommandMenu";
import MobileMenu from "./MobileMenu";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isDark, toggleDarkLight, currentTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["hero", "about", "skills", "projects", "experience", "certifications", "contact"];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-2.5" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between px-4 sm:px-5 py-2 rounded-2xl transition-all duration-300 ${
              isScrolled
                ? "bg-card/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
                : "bg-card/40 backdrop-blur-md border border-white/[0.04]"
            }`}
          >
            {/* Left: Brand Identity */}
            <a
              href="#hero"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-primary/30 p-0.5 group-hover:border-primary/60 transition">
                <Image
                  src={PERSONAL_INFO.avatarImage}
                  alt={PERSONAL_INFO.name}
                  width={32}
                  height={32}
                  priority
                  className="rounded-[8px] object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-xs sm:text-sm tracking-tight text-foreground group-hover:text-primary transition">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                  Available
                </span>
              </div>
            </a>

            {/* Middle: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-muted/40 border border-white/[0.04]">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-primary/15 text-primary font-semibold shadow-[0_0_12px_var(--glow-primary)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Command Palette Trigger */}
              <button
                onClick={() => setIsCommandMenuOpen(true)}
                title="Search & Quick Actions (Cmd+K)"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/[0.07] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-primary/40 text-xs font-medium transition"
              >
                <Command className="w-3.5 h-3.5 text-primary" />
                <span className="hidden md:inline text-muted-foreground text-xs">Jump</span>
                <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-muted/80 text-muted-foreground border border-white/[0.06]">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Selector Modal Trigger */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                title="Select Visual Mode"
                className="relative p-2 rounded-xl border border-white/[0.07] bg-white/[0.02] text-muted-foreground hover:text-primary hover:border-primary/40 transition group"
              >
                <Palette className="w-4 h-4" />
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full border border-card"
                  style={{ backgroundColor: currentTheme.previewColor }}
                />
              </button>

              {/* Dark/Light Fast Toggle */}
              <button
                onClick={toggleDarkLight}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2 rounded-xl border border-white/[0.07] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400/90" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-400/90" />
                )}
              </button>

              {/* Resume CTA (Desktop) */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary/15 border border-primary/30 text-primary font-semibold text-xs hover:bg-primary/25 hover:border-primary/50 transition active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              {/* Mobile Burger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-white/[0.07] bg-white/[0.02] text-foreground"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Theme Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* Command Palette */}
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
      />
    </>
  );
}
