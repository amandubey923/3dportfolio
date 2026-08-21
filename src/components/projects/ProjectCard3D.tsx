"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Maximize2,
  ArrowUpRight,
  Sparkles,
  Code2,
} from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectCard3DProps {
  project: Project;
  onInspect: (project: Project) => void;
}

export default function ProjectCard3D({ project, onInspect }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rX = ((mouseY - height / 2) / height) * -8;
    const rY = ((mouseX - width / 2) / width) * 8;
    setRotateX(rX);
    setRotateY(rY);

    // Calculate glare percentage
    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "AI & ML":
        return {
          cardClass: "card-ai",
          tagClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
          titleGradient: "text-gradient-ai",
        };
      case "Full Stack":
        return {
          cardClass: "card-fullstack",
          tagClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          titleGradient: "text-gradient-fullstack",
        };
      case "Frontend & Tools":
      default:
        return {
          cardClass: "card-frontend",
          tagClass: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
          titleGradient: "text-gradient-frontend",
        };
    }
  };

  const theme = getCategoryTheme(project.category);
  const isFeaturedReaderHub = project.id === "readers-hub";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.6 }}
      className={`group relative rounded-3xl backdrop-blur-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl ${
        isFeaturedReaderHub
          ? "border-amber-400/40 shadow-[0_0_35px_rgba(251,191,36,0.18)]"
          : ""
      } ${theme.cardClass}`}
    >
      {/* Specular Interactive Cursor Glare Sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.3), transparent 80%)`,
        }}
      />

      {/* Top Image Preview with Gradient Overlay */}
      <div>
        <div className="relative h-56 w-full overflow-hidden border-b border-white/10 bg-black/40">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-black/30 pointer-events-none" />

          {/* Top Category & Featured Badges */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
            <span className={`px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${theme.tagClass}`}>
              {project.category}
            </span>
            {isFeaturedReaderHub && (
              <span className="px-2.5 py-1 rounded-full border border-amber-400/50 bg-amber-400/25 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_18px_rgba(251,191,36,0.4)] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                #1 Featured Platform
              </span>
            )}
          </div>

          {/* Inspect Button Icon */}
          <button
            onClick={() => onInspect(project)}
            title="Inspect Architecture"
            className="absolute top-3.5 right-3.5 p-2 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md text-white hover:text-primary hover:border-primary transition group-hover:scale-110 shadow-lg z-10"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          <div>
            <h3 className={`text-xl font-bold transition duration-200 ${theme.titleGradient}`}>
              {project.title}
            </h3>
            <p className="text-xs text-primary/90 font-mono font-semibold mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-foreground/80 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.04] text-[11px] font-mono text-foreground/90 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-lg border border-white/10 bg-white/[0.02] text-[11px] font-mono text-primary font-bold">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-6 pt-0 mt-1 flex items-center justify-between border-t border-white/10 pt-4">
        {/* Primary Action: Live Demo or GitHub for Repo-only */}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/15 border border-primary/30 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_var(--glow-primary)] transition-all group/link active:scale-95"
          >
            <span>Live Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        ) : (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition active:scale-95"
          >
            <Code2 className="w-3.5 h-3.5 text-primary" />
            <span>View Source Code</span>
          </a>
        )}

        {/* Inspect Details & GitHub Repo Link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspect(project)}
            className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition"
          >
            Details
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition"
            title="Inspect GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
