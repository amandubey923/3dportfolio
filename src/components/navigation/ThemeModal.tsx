"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Palette, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  const { themeId, setTheme, allThemes, isDark, toggleDarkLight } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Translucent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Floating Premium Theme Popover/Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 350 }}
            className="relative w-full max-w-lg rounded-3xl border border-primary/30 bg-card/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_0_50px_var(--glow-primary)] overflow-hidden z-10 space-y-4 max-h-[92vh] flex flex-col justify-between"
          >
            {/* Ambient Corner Atmosphere */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-start justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-primary/15 text-primary border border-primary/30 shadow-[0_0_15px_var(--glow-primary)]">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                      VISUAL SYSTEM THEMES
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5">
                      6 calibrated visual modes with dedicated lighting & contrast
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-foreground transition"
                  aria-label="Close Theme Switcher"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Light / Dark Segmented Switcher */}
              <div className="pt-3 pb-1 flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                  Appearance Mode
                </span>

                <div className="inline-flex p-1 rounded-xl border border-white/10 bg-background/60 backdrop-blur-md">
                  <button
                    onClick={() => {
                      if (isDark) toggleDarkLight();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      !isDark
                        ? "bg-amber-400 text-black shadow-md font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!isDark) toggleDarkLight();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isDark
                        ? "btn-primary-gradient text-primary-foreground shadow-md font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>

              {/* Theme Grid - Instant Live Switching */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-h-[52vh] overflow-y-auto pr-1">
                {allThemes.map((theme) => {
                  const isSelected = theme.id === themeId;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`relative flex items-start gap-3.5 p-3.5 rounded-2xl border text-left transition-all duration-200 group ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_var(--glow-primary)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      {/* Gradient Preview Swatch */}
                      <div
                        className="w-8 h-8 rounded-xl shrink-0 border border-white/20 shadow-md flex items-center justify-center relative overflow-hidden mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, ${theme.previewColor} 0%, ${theme.secondaryPreview} 100%)`,
                        }}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold" />
                        )}
                      </div>

                      {/* Theme Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-foreground group-hover:text-primary transition truncate">
                            {theme.name}
                          </span>
                          {theme.id === "cyber-cyan" && (
                            <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 shrink-0">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-snug">
                          {theme.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimalist Footer - No Apply Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-primary font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Live instant preview · Persistent across sessions
              </span>
              <span className="text-[11px] font-mono text-muted-foreground/70">
                Esc / ✕ to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
