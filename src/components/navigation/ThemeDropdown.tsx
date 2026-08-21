"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sun, Moon, Sparkles, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeDropdown({ isOpen, onClose }: ThemeDropdownProps) {
  const { themeId, setTheme, allThemes, isDark, toggleDarkLight } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside click & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.95, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -6 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ backgroundColor: "var(--background-subtle)" }}
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-foreground/15 dark:border-primary/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-3.5 z-[100] overflow-hidden space-y-3 backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-foreground/[0.08]">
            <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
              Appearance
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-foreground/[0.08] text-foreground/70 hover:text-foreground transition cursor-pointer"
              aria-label="Close appearance menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Light / Dark Segmented Switcher */}
          <div className="flex items-center p-0.5 rounded-xl border border-foreground/[0.08] bg-foreground/[0.03]">
            <button
              onClick={() => {
                if (isDark) toggleDarkLight();
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !isDark
                  ? "bg-amber-400 text-black shadow-sm font-bold"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.05]"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light</span>
            </button>

            <button
              onClick={() => {
                if (!isDark) toggleDarkLight();
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isDark
                  ? "btn-primary-gradient text-primary-foreground shadow-sm font-bold"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.05]"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
          </div>

          {/* Section Subtitle */}
          <div className="pt-0.5">
            <span className="text-[10px] font-mono font-semibold text-foreground/60 uppercase tracking-wider block mb-1.5">
              Curated Color Themes
            </span>

            {/* Vertical Compact Theme Rows */}
            <div className="space-y-1 max-h-64 overflow-y-auto pr-0.5 no-scrollbar">
              {allThemes.map((theme) => {
                const isSelected = theme.id === themeId;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-left group cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border border-primary/40 shadow-[0_0_12px_var(--glow-primary)]"
                        : "hover:bg-foreground/[0.05] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Circular Swatch */}
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-foreground/20 shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${theme.previewColor} 0%, ${theme.secondaryPreview} 100%)`,
                        }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-xs font-semibold truncate ${
                            isSelected
                              ? "text-primary font-bold"
                              : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {theme.name}
                        </span>
                        <span className="text-[10px] text-foreground/60 truncate">
                          {theme.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Active Check */}
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 ml-1.5 font-bold" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
