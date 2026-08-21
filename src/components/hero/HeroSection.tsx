"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  MessageSquare,
  Github,
  Linkedin,
  Code,
  Sparkles,
  Terminal,
  Layers,
  Award,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import DeveloperWorldCanvas from "@/components/3d/DeveloperWorldCanvas";
import TerminalSnippet from "./TerminalSnippet";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-cyber-grid"
    >
      {/* Dynamic Ambient Multi-Color Glow Orbs */}
      <div className="ambient-orb ambient-orb-1 w-[500px] h-[500px] -top-32 -left-20 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-2 w-[450px] h-[450px] top-1/3 -right-20 animate-orb-pulse" style={{ animationDelay: "2s" }} />
      <div className="ambient-orb ambient-orb-3 w-[400px] h-[400px] -bottom-32 left-1/3 animate-orb-pulse" style={{ animationDelay: "4s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN: HERO CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Status Pill with Gradient Ring */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-xl shadow-[0_0_20px_var(--glow-primary)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-85" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-foreground tracking-wide font-mono uppercase">
                {PERSONAL_INFO.status}
              </span>
            </div>

            {/* Main Headline with Rich Gradient */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-primary to-secondary" />
                <span className="text-xs sm:text-sm font-mono tracking-widest text-primary uppercase font-bold">
                  Software Engineer · Full-Stack Developer
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                <span className="text-foreground">Aman </span>
                <span className="text-gradient-hero drop-shadow-[0_0_30px_var(--glow-primary)]">
                  Dubey
                </span>
              </h1>
            </div>

            {/* Concise Value Statement */}
            <p className="max-w-xl text-base sm:text-lg text-foreground/80 leading-relaxed font-normal">
              Architecting scalable cloud systems, intelligent AI platforms,
              and high-performance web applications with clean code and system-level discipline.
            </p>

            {/* Primary Action Buttons with Clear Hierarchy */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Primary CTA */}
              <a
                href="#projects"
                className="btn-primary-gradient inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold active:scale-95 group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-glass inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold active:scale-95 group"
              >
                <FileText className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
                <span>View Resume</span>
              </a>

              {/* Tertiary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground font-medium text-sm transition group"
              >
                <MessageSquare className="w-4 h-4 text-primary/80 transition-transform group-hover:scale-110" />
                <span className="underline-offset-4 group-hover:underline">Open Channel</span>
              </a>
            </div>

            {/* Social Quick Links */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-mono text-muted-foreground mr-1">
                Ecosystem:
              </span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition hover:scale-105"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition hover:scale-105"
                title="LeetCode Profile"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.geeksforgeeks}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition text-xs font-mono font-bold"
                title="GeeksforGeeks"
              >
                GfG
              </a>
            </div>

            {/* Live Terminal Snippet */}
            <div className="pt-2">
              <TerminalSnippet />
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: 3D UNIVERSE CANVAS ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] lg:min-h-[520px]"
          >
            {/* Glowing Backdrop Ring */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/15 to-transparent blur-[80px] pointer-events-none" />

            {/* 3D WebGL Canvas */}
            <div className="w-full h-full relative z-10">
              <DeveloperWorldCanvas />
            </div>

            {/* Floating Live 3D Badge */}
            <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-primary/30 bg-black/70 backdrop-blur-xl shadow-[0_0_20px_var(--glow-primary)] text-xs font-mono text-primary pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Interactive 3D Engine</span>
            </div>
          </motion.div>
        </div>

        {/* ================= VERIFIED STATS STRIP ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl glass-card-premium relative overflow-hidden group"
            >
              {/* Subtle gradient corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="text-2xl sm:text-3xl font-extrabold text-gradient-primary">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
