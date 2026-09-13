"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window with Gradient Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="relative w-full max-w-2xl max-h-[86vh] my-auto rounded-2xl sm:rounded-3xl border border-primary/40 bg-card/95 backdrop-blur-2xl shadow-[0_0_40px_var(--glow-primary)] overflow-y-auto flex flex-col z-10"
        >
          {/* Hero Banner Preview */}
          <div className="relative h-36 xs:h-40 sm:h-52 w-full shrink-0 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

            {/* Top Close & Category Tag */}
            <div className="absolute top-2.5 sm:top-3.5 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-primary/40 bg-black/75 backdrop-blur-md text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                  {project.category}
                </span>
                {project.id === "readers-hub" && (
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-amber-400/60 bg-slate-950/90 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_16px_rgba(245,158,11,0.35)]">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                    <span className="font-extrabold text-amber-400">#1</span>
                    <span className="font-bold text-amber-200">FEATURED</span>
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full border border-white/20 bg-black/70 backdrop-blur-md text-white hover:bg-primary hover:text-primary-foreground transition shadow-lg cursor-pointer shrink-0"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

            {/* Bottom Title on Hero */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-3.5 sm:left-5 right-3.5 sm:right-5">
              <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground drop-shadow-md line-clamp-1">
                {project.title}
              </h2>
              <p className="text-[11px] sm:text-xs text-primary font-mono font-semibold mt-0.5 line-clamp-1">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-3.5 sm:p-5 md:p-6 space-y-3.5 sm:space-y-5">
            {/* Long Description */}
            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                System Overview & Architecture
              </h3>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Key Architectural Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.03] text-xs text-foreground/90 leading-snug"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-1.5 sm:space-y-2 w-full min-w-0">
              <h3 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Core Technologies & Tools</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full min-w-0">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg border border-primary/30 bg-primary/10 text-primary text-[11px] sm:text-xs font-mono font-semibold max-w-full break-words"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 sm:pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 w-full min-w-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-gradient inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs shadow-lg active:scale-95 transition text-center w-full sm:w-auto"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>Launch Live Platform</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-glass inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl font-semibold text-xs transition text-center w-full sm:w-auto"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  <span>View Source Code</span>
                </a>
              </div>

              {project.metrics && (
                <span className="text-[11px] sm:text-xs font-mono text-muted-foreground text-center sm:text-right">
                  Status: <span className="text-emerald-400 font-bold">{project.metrics}</span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
