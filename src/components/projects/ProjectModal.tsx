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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl border border-primary/40 bg-card/95 backdrop-blur-2xl shadow-[0_0_50px_var(--glow-primary)] overflow-y-auto flex flex-col z-10"
        >
          {/* Hero Banner Preview */}
          <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

            {/* Top Close & Category Tag */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full border border-primary/40 bg-black/75 backdrop-blur-md text-primary text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                  {project.category}
                </span>
                {project.id === "readers-hub" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/60 bg-slate-950/90 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_16px_rgba(245,158,11,0.35)]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-extrabold text-amber-400">#1</span>
                    <span className="font-bold text-amber-200">FEATURED</span>
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/20 bg-black/70 backdrop-blur-md text-white hover:bg-primary hover:text-primary-foreground transition shadow-lg"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Title on Hero */}
            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground drop-shadow-md">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-primary font-mono font-semibold mt-1">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Long Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                System Overview & Architecture
              </h3>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Key Architectural Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] text-xs sm:text-sm text-foreground/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Core Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg active:scale-95 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Platform</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-glass inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              </div>

              {project.metrics && (
                <span className="text-xs font-mono text-muted-foreground">
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
