"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, FolderGit2, Home, Sparkles } from "lucide-react";
import ADLogo from "@/components/ui/ADLogo";

export default function NotFound() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-cyber-grid py-20">
      {/* Dynamic Ambient Multi-Color Glow Orbs */}
      <div className="ambient-orb ambient-orb-1 w-[500px] h-[500px] top-1/4 -left-20 animate-orb-pulse" />
      <div
        className="ambient-orb ambient-orb-2 w-[450px] h-[450px] bottom-1/4 -right-20 animate-orb-pulse"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <ADLogo size="md" showWordmark={false} withGlow={true} />
        </motion.div>

        {/* 404 Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-xl shadow-[0_0_20px_var(--glow-primary)] text-xs font-mono font-bold text-primary uppercase tracking-widest"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          <span>404 // Coordinate Out of Bounds</span>
        </motion.div>

        {/* Massive 3D Glowing 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative select-none"
        >
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none text-gradient-hero drop-shadow-[0_0_50px_var(--glow-strong)] animate-float-slow">
            404
          </h1>

          {/* Holographic Wire Reflection */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none blur-sm">
            <span className="text-8xl sm:text-9xl lg:text-[12rem] font-black tracking-tighter text-primary">
              404
            </span>
          </div>
        </motion.div>

        {/* Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            PAGE NOT FOUND
          </h2>
          <p className="max-w-md mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have moved into another dimension.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {/* Back Home Button */}
          <Link
            href="/"
            className="btn-primary-gradient inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold active:scale-95 group shadow-lg"
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back Home</span>
          </Link>

          {/* View Projects Button */}
          <Link
            href="/#projects"
            className="btn-secondary-glass inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold active:scale-95 group shadow-lg"
          >
            <FolderGit2 className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
            <span>View Projects</span>
          </Link>
        </motion.div>

        {/* Footer Coordinate Stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary/70" />
          <span>PORTFOLIO_SYSTEM // HTTP_STATUS_404</span>
        </motion.div>
      </div>
    </div>
  );
}

