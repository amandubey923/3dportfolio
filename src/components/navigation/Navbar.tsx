"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import ADLogo from "@/components/ui/ADLogo";
import ThemeDropdown from "./ThemeDropdown";
import CommandMenu from "./CommandMenu";
import MobileMenu from "./MobileMenu";

const NAV_ITEMS = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Dossier", href: "/dossier" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
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

      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
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
                ? "bg-card/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                : "bg-card/45 backdrop-blur-md border border-white/5"
            }`}
          >
            {/* Left: Brand Identity with AD Monogram */}
            <Link
              href="/#hero"
              className="focus:outline-none"
            >
              <ADLogo size="sm" showWordmark={true} />
            </Link>

            {/* Middle: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-background/50 border border-white/5">
              {NAV_ITEMS.map((item) => {
                const isDossier = item.href === "/dossier";
                const isDossierActive = isDossier && pathname === "/dossier";
                const sectionId = item.href.replace("/#", "").replace("#", "");
                const isSectionActive = pathname === "/" && activeSection === sectionId;
                const isActive = isDossierActive || isSectionActive;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "btn-primary-gradient shadow-[0_0_15px_var(--glow-primary)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Controls & Actions (Quick Jump | 🎨 Theme | ☀/☾ | Resume) */}
            <div className="flex items-center gap-2 relative">
              {/* 1. Quick Jump / Command Menu */}
              <button
                onClick={() => setIsCommandMenuOpen(true)}
                title="Search & Quick Actions (Cmd+K)"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-primary/40 text-xs font-medium transition"
              >
                <Command className="w-3.5 h-3.5 text-primary" />
                <span className="hidden md:inline text-muted-foreground text-xs">Jump</span>
                <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-muted/80 text-muted-foreground border border-white/10">
                  ⌘K
                </kbd>
              </button>

              {/* 2. 🎨 Theme Switcher Dropdown Anchor */}
              <div className="relative">
                <button
                  onClick={() => setIsThemeDropdownOpen((prev) => !prev)}
                  title="Change Color Theme"
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition group hover:scale-105 active:scale-95 ${
                    isThemeDropdownOpen
                      ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_var(--glow-primary)]"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                  <span className="hidden sm:inline text-xs font-semibold">Theme</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.previewColor} 0%, ${currentTheme.secondaryPreview} 100%)`,
                    }}
                  />
                </button>

                {/* Compact Dropdown Popover */}
                <ThemeDropdown
                  isOpen={isThemeDropdownOpen}
                  onClose={() => setIsThemeDropdownOpen(false)}
                />
              </div>

              {/* 3. ☀/☾ Light/Dark Fast Toggle */}
              <button
                onClick={toggleDarkLight}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2 rounded-xl border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 active:scale-95 transition"
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                )}
              </button>

              {/* 4. Resume CTA */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary/15 border border-primary/30 text-primary font-bold text-xs hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_var(--glow-primary)] transition active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/[0.03] text-foreground"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Command Palette */}
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        onOpenThemeModal={() => setIsThemeDropdownOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenThemeModal={() => setIsThemeDropdownOpen(true)}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
      />
    </>
  );
}
