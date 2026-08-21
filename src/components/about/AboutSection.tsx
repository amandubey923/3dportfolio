"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  Cpu,
  Globe2,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Ambient Gradient Orbs */}
      <div className="ambient-orb ambient-orb-1 w-[400px] h-[400px] top-10 -right-20 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-2 w-[350px] h-[350px] bottom-0 -left-20 animate-orb-pulse" style={{ animationDelay: "3s" }} />

      {/* Section Header with Editorial Index */}
      <div className="mb-20 space-y-3 relative z-10">
        <div className="section-index-badge">
          <Compass className="w-3.5 h-3.5" />
          <span>01 / Philosophy & Identity</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          How I Think. <span className="text-gradient-primary">How I Build.</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
          Bridging system-level engineering rigor, algorithmic discipline, and
          human-centered design to craft scalable, high-impact digital software.
        </p>
      </div>

      {/* Main Grid: Visual Bio & Core Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Left: Holographic Bio Portrait Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-primary/40 via-secondary/20 to-transparent shadow-[0_0_40px_var(--glow-primary)] group">
            <div className="rounded-[22px] bg-card/85 backdrop-blur-2xl p-4 overflow-hidden space-y-4">
              {/* Image Container with Inner Highlight */}
              <div className="relative w-full h-88 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                <Image
                  src={PERSONAL_INFO.portraitImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-black/20" />

                {/* Status Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl border border-white/15 bg-black/60 backdrop-blur-xl flex items-center justify-between shadow-lg">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">
                      {PERSONAL_INFO.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Information Technology
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Work
                  </div>
                </div>
              </div>

              {/* Context Quick Grid */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-semibold text-foreground">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Specialization:</span>
                  <span className="font-bold text-primary">Full-Stack & AI Systems</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Cognitive Pursuit:</span>
                  <span className="font-medium text-foreground">German Language & DSA</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Detailed Storytelling & 3 Distinct Gradient Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Engineering Narrative Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-card-premium border-l-4 border-l-primary space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-primary" />
              Engineering Mindset & Systems Thinking
            </h3>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              My engineering approach is built around discipline, architectural patience,
              and long-term software maintainability. Rather than taking hasty shortcuts,
              I emphasize deep fundamentals, clean code decoupling, and building systems
              that stay resilient as traffic scales.
            </p>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              I view software as an interactive ecosystem intertwined with human psychology,
              clean typography, and dependable server-side pipelines.
            </p>
          </div>

          {/* Three Core Pillars with Distinct Gradient Personalities */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Pillar 1: Discipline (Cyan/Blue) */}
            <div className="p-5 rounded-2xl card-ai hover:scale-[1.02] transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">
                Discipline & Stamina
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tested in national hackathons (SIH Finalist) and 100+ unbroken days of algorithmic problem solving.
              </p>
            </div>

            {/* Pillar 2: Architecture (Indigo/Purple) */}
            <div className="p-5 rounded-2xl card-fullstack hover:scale-[1.02] transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">
                Clean Architecture
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Component-driven UI, stream processors, ACID transactions, and decoupled microservices.
              </p>
            </div>

            {/* Pillar 3: Global Perspective (Pink/Orange) */}
            <div className="p-5 rounded-2xl card-frontend hover:scale-[1.02] transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">
                Global Perspective
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Learning German to deepen linguistic structure, precision logic, and international engineering agility.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
