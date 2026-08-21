"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { THEMES, ThemeConfig } from "@/data/themes";

interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeId: string;
  isDark: boolean;
  setTheme: (id: string) => void;
  toggleDarkLight: () => void;
  allThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "aman_portfolio_theme_v2";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<string>("cyber-cyan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES.some((t) => t.id === saved)) {
        setThemeId(saved);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // ignore
    }

    const root = document.documentElement;

    // Apply all css variables
    Object.entries(currentTheme.cssVars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    if (currentTheme.isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    // Dispatch event for Three.js scene
    window.dispatchEvent(
      new CustomEvent("portfolio-theme-change", {
        detail: currentTheme,
      })
    );
  }, [themeId, currentTheme, mounted]);

  const setTheme = (id: string) => {
    if (THEMES.some((t) => t.id === id)) {
      setThemeId(id);
    }
  };

  const toggleDarkLight = () => {
    if (currentTheme.isDark) {
      setThemeId("ivory-slate");
    } else {
      setThemeId("cyber-cyan");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        isDark: currentTheme.isDark,
        setTheme,
        toggleDarkLight,
        allThemes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

