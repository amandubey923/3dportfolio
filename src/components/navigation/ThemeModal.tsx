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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-card/95 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Visual System Themes
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    6 calibrated visual modes with dedicated lighting & contrast
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkLight}
                  title="Toggle Light / Dark mode"
                  className="p-2 rounded-xl border border-white/[0.06] hover:border-primary/40 text-muted-foreground hover:text-foreground transition"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/[0.05] text-muted-foreground hover:text-foreground transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {allThemes.map((theme) => {
                const isSelected = theme.id === themeId;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                    }}
                    className={`relative flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "border-primary/40 bg-primary/[0.08] shadow-[0_0_15px_var(--glow-primary)]"
                        : "border-white/[0.05] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Swatch */}
                    <div
                      className="w-7 h-7 rounded-lg shrink-0 border border-white/10 shadow-inner flex items-center justify-center relative overflow-hidden mt-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${theme.previewColor} 0%, ${theme.secondaryPreview} 100%)`,
                      }}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground truncate">
                          {theme.name}
                        </span>
                        {theme.id === "cyber-cyan" && (
                          <span className="text-[9px] uppercase font-mono font-semibold px-1.5 py-0.2 rounded bg-primary/15 text-primary">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                        {theme.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer tip */}
            <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3 h-3 text-primary/70" />
                Persisted in local storage
              </span>
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition"
              >
                Apply & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
