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
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Ambient Gradient Orbs */}
      <div className="ambient-orb ambient-orb-1 w-[400px] h-[400px] top-10 -right-20 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-2 w-[350px] h-[350px] bottom-0 -left-20 animate-orb-pulse" style={{ animationDelay: "3s" }} />

      {/* Section Header with Editorial Index */}
      <div className="mb-12 sm:mb-16 space-y-3 relative z-10">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10 w-full min-w-0">
        {/* Left: Bio Portrait Card with hero.png as Visual Anchor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative w-full min-w-0"
        >
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-primary/50 via-secondary/25 to-transparent shadow-[0_0_40px_var(--glow-primary)] group w-full min-w-0">
            <div className="rounded-[22px] bg-card/90 backdrop-blur-2xl p-3.5 sm:p-4 overflow-hidden space-y-4 w-full min-w-0">
              {/* Image Container with Ambient Backlight & Proper Framing */}
              <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-black/40 via-card/60 to-black/80 shadow-inner">
                {/* Ambient Backlight Glow behind Subject */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-3xl pointer-events-none" />

                <Image
                  src={PERSONAL_INFO.portraitImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  priority
                  className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: "center 12%" }}
                />

                {/* Subtle gradient overlay at base for smooth integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Status Overlay Badge */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl border border-white/15 bg-black/70 backdrop-blur-xl flex items-center justify-between shadow-xl min-w-0">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground truncate">
                      {PERSONAL_INFO.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium truncate">
                      Information Technology
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Work
                  </div>
                </div>
              </div>

              {/* Context Quick Grid */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] space-y-2 w-full min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/60 font-medium">Location:</span>
                  <span className="font-semibold text-foreground">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/60 font-medium">Specialization:</span>
                  <span className="font-bold text-primary truncate ml-2">Full-Stack & Next.js Systems</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/60 font-medium">Core Focus:</span>
                  <span className="font-medium text-foreground truncate ml-2">Clean Architecture & DSA</span>
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
          className="lg:col-span-7 space-y-6 w-full min-w-0"
        >
          {/* Engineering Narrative Card */}
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl glass-card-premium border-l-4 border-l-primary space-y-3 shadow-xl w-full min-w-0">
            <h3 className="text-base sm:text-xl font-bold text-foreground flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-primary shrink-0" />
              <span>Engineering Mindset & Systems Thinking</span>
            </h3>
            <p className="text-foreground/85 leading-relaxed text-xs sm:text-base break-words">
              My engineering approach is built around discipline, architectural patience,
              and long-term software maintainability. Rather than taking hasty shortcuts,
              I emphasize solid fundamentals, clean modular code, and building web applications
              that are reliable, accessible, and easy to maintain.
            </p>
            <p className="text-foreground/85 leading-relaxed text-xs sm:text-base break-words">
              I view software as a complete craft connecting thoughtful design, clean typography,
              and dependable full-stack server architecture.
            </p>
          </div>

          {/* Three Core Pillars with Distinct Gradient Personalities */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full min-w-0">
            {/* Pillar 1: Discipline (Cyan/Blue) */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl card-ai hover:scale-[1.02] transition-all duration-300 space-y-2.5 sm:space-y-3 w-full min-w-0">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
                <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-foreground">
                Discipline & Consistency
              </h4>
              <p className="text-[11px] sm:text-xs text-foreground/65 leading-relaxed break-words">
                Demonstrated in Smart India Hackathon teamwork and 250+ unbroken days of algorithmic problem solving.
              </p>
            </div>

            {/* Pillar 2: Architecture (Indigo/Purple) */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl card-fullstack hover:scale-[1.02] transition-all duration-300 space-y-2.5 sm:space-y-3 w-full min-w-0">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] shrink-0">
                <Layers className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-foreground">
                Clean Architecture
              </h4>
              <p className="text-[11px] sm:text-xs text-foreground/65 leading-relaxed break-words">
                Component-driven UI, type-safe data validation, robust database schemas, and modular RESTful APIs.
              </p>
            </div>

            {/* Pillar 3: Global Perspective (Pink/Orange) */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl card-frontend hover:scale-[1.02] transition-all duration-300 space-y-2.5 sm:space-y-3 w-full min-w-0">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)] shrink-0">
                <Globe2 className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-foreground">
                Global Perspective
              </h4>
              <p className="text-[11px] sm:text-xs text-foreground/65 leading-relaxed break-words">
                Learning German to deepen linguistic structure, precision logic, and international engineering agility.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
