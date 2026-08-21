"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Trophy,
  Rocket,
  Code2,
  GitBranch,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { EXPERIENCES_DATA } from "@/data/portfolioData";

export default function ExperienceSection() {
  const getExperienceIcon = (type: string) => {
    switch (type) {
      case "Hackathon":
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case "Development":
        return <Rocket className="w-4 h-4 text-cyan-400" />;
      case "Problem Solving":
        return <Code2 className="w-4 h-4 text-fuchsia-400" />;
      case "Open Source":
      default:
        return <GitBranch className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getCardStyle = (type: string) => {
    switch (type) {
      case "Hackathon":
        return "card-frontend border-amber-500/30";
      case "Development":
        return "card-fullstack border-cyan-500/30";
      case "Problem Solving":
        return "card-ai border-fuchsia-500/30";
      case "Open Source":
      default:
        return "card-fullstack border-emerald-500/30";
    }
  };

  return (
    <section
      id="experience"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-2 w-[400px] h-[400px] top-10 -left-20 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-1 w-[450px] h-[450px] bottom-10 -right-20 animate-orb-pulse" style={{ animationDelay: "3s" }} />

      {/* Section Header with Editorial Index */}
      <div className="mb-20 space-y-3 relative z-10">
        <div className="section-index-badge">
          <Terminal className="w-3.5 h-3.5" />
          <span>04 / Milestones & Trajectory</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Milestones & <span className="text-gradient-primary">Engineering Journey</span>
        </h2>

        <p className="max-w-2xl text-foreground/75 text-base sm:text-lg leading-relaxed">
          Hackathon participation, full-stack web application deployments,
          and continuous algorithmic problem-solving discipline.
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative z-10">
        {/* Gradient Connecting Laser Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 hidden sm:block rounded-full shadow-[0_0_15px_var(--glow-primary)]" />

        <div className="space-y-10">
          {EXPERIENCES_DATA.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Node Badge */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 hidden sm:flex w-10 h-10 rounded-full border-2 border-primary bg-background shadow-[0_0_20px_var(--glow-primary)] items-center justify-center">
                  {getExperienceIcon(item.type)}
                </div>

                {/* Left/Right Card */}
                <div className="w-full sm:w-1/2 sm:px-8">
                  <div className={`p-6 sm:p-7 rounded-3xl backdrop-blur-2xl transition-all duration-300 group hover:scale-[1.02] shadow-xl ${getCardStyle(item.type)}`}>
                    {/* Top Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-foreground/10">
                      <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>

                      {item.badge && (
                        <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] font-mono font-bold uppercase shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Role & Organization */}
                    <div className="space-y-1 mb-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                        {item.role}
                      </h3>
                      <p className="text-sm font-semibold text-primary/90">
                        {item.organization}
                      </p>
                      {item.location && (
                        <p className="text-xs text-muted-foreground">
                          {item.location}
                        </p>
                      )}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2.5">
                      {item.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
