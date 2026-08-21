"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Cpu,
  Terminal,
  FileText,
  Mail,
  Palette,
  Github,
  Linkedin,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenThemeModal: () => void;
}

export default function CommandMenu({
  isOpen,
  onClose,
  onOpenThemeModal,
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const { allThemes, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    {
      label: "Explore Projects",
      category: "Navigation",
      icon: FolderGit2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      label: "Technical Skills Matrix",
      category: "Navigation",
      icon: Cpu,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      label: "Engineering Journey & Milestones",
      category: "Navigation",
      icon: Terminal,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      label: "Open Developer Dossier",
      category: "Navigation",
      icon: FileText,
      action: () => {
        window.location.href = "/dossier";
        onClose();
      },
    },
    {
      label: "Open Channel / Contact",
      category: "Navigation",
      icon: Mail,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      label: "Download Official Resume (PDF)",
      category: "External / Document",
      icon: FileText,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      label: "Visit GitHub Profile",
      category: "Socials",
      icon: Github,
      action: () => {
        window.open(PERSONAL_INFO.socials.github, "_blank");
        onClose();
      },
    },
    {
      label: "Connect on LinkedIn",
      category: "Socials",
      icon: Linkedin,
      action: () => {
        window.open(PERSONAL_INFO.socials.linkedin, "_blank");
        onClose();
      },
    },
    {
      label: "Change Visual Theme Palette",
      category: "Preferences",
      icon: Palette,
      action: () => {
        onClose();
        onOpenThemeModal();
      },
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-xl rounded-2xl border border-white/[0.08] bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-primary shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none"
              />
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.04] text-muted-foreground border border-white/[0.06]">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No matching commands found.
                </div>
              ) : (
                filteredActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={action.action}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] hover:text-primary transition group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.03] group-hover:bg-primary/15 text-muted-foreground group-hover:text-primary transition">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-foreground group-hover:text-primary">
                          {action.label}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/70 group-hover:text-primary/70">
                        {action.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
