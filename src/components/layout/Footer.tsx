"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Github, Linkedin, Code, Mail, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import ADLogo from "@/components/ui/ADLogo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-foreground/10 bg-card/80 backdrop-blur-2xl overflow-hidden">
      {/* Top Gradient Laser Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_0_15px_var(--glow-primary)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Mission with AD Monogram */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <ADLogo size="sm" showWordmark={true} />
            <p className="text-xs text-foreground/65 max-w-sm">
              Designing scalable systems, intuitive interfaces, and AI platforms with clarity and long-term engineering impact.
            </p>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3.5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-foreground/10 bg-card text-foreground/70 hover:text-primary hover:border-primary/60 hover:shadow-[0_0_15px_var(--glow-primary)] transition hover:scale-105"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-foreground/10 bg-card text-foreground/70 hover:text-primary hover:border-primary/60 hover:shadow-[0_0_15px_var(--glow-primary)] transition hover:scale-105"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-foreground/10 bg-card text-foreground/70 hover:text-primary hover:border-primary/60 hover:shadow-[0_0_15px_var(--glow-primary)] transition hover:scale-105"
              title="LeetCode"
            >
              <Code className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl border border-foreground/10 bg-card text-foreground/70 hover:text-primary hover:border-primary/60 hover:shadow-[0_0_15px_var(--glow-primary)] transition hover:scale-105"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl btn-primary-gradient ml-2 active:scale-95 transition cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Build Info */}
        <div className="mt-8 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground/60">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All verified credentials & projects preserved.
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-primary font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen 3D Architecture
          </span>
        </div>
      </div>
    </footer>
  );
}
