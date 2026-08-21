"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Palette, Sun, Moon, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import ADLogo from "@/components/ui/ADLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenThemeModal: () => void;
  navItems: { label: string; href: string }[];
  activeSection: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenThemeModal,
  navItems,
  activeSection,
}: MobileMenuProps) {
  const { isDark, toggleDarkLight, currentTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-card/95 border-l border-white/[0.08] backdrop-blur-2xl p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Header with AD Monogram */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
                <ADLogo size="xs" showWordmark={true} />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl border border-white/[0.06] text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="py-5 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3.5 pt-5 border-t border-white/[0.06]">
              {/* Quick Controls */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenThemeModal();
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-white/[0.07] bg-white/[0.02] text-xs font-medium text-foreground hover:border-primary/40 transition"
                >
                  <Palette className="w-3.5 h-3.5 text-primary" />
                  <span>Theme</span>
                </button>

                <button
                  onClick={toggleDarkLight}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-white/[0.07] bg-white/[0.02] text-xs font-medium text-foreground hover:border-primary/40 transition"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>

              {/* Resume CTA */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/15 border border-primary/30 text-primary font-semibold text-xs hover:bg-primary/25 transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Official Resume</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/[0.06] text-muted-foreground hover:text-primary transition"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/[0.06] text-muted-foreground hover:text-primary transition"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2 rounded-lg border border-white/[0.06] text-muted-foreground hover:text-primary transition"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
