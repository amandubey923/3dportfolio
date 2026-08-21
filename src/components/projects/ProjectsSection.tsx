"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Search, Sparkles } from "lucide-react";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";
import ProjectCard3D from "./ProjectCard3D";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Full Stack", "AI & ML", "Frontend & Tools"];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="projects"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-1 w-[450px] h-[450px] top-10 -right-20 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-3 w-[400px] h-[400px] bottom-1/3 -left-20 animate-orb-pulse" style={{ animationDelay: "3.5s" }} />

      {/* Section Header with Editorial Index */}
      <div className="mb-16 space-y-3 relative z-10">
        <div className="section-index-badge">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>03 / Featured Deployments</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Projects & <span className="text-gradient-primary">Engineered Systems</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
          Production full-stack applications, real-time communication workspaces,
          and intelligent AI platforms built with modern web architectures.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 relative z-10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "btn-primary-gradient shadow-[0_0_20px_var(--glow-primary)] scale-105"
                    : "border border-white/10 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
          <input
            type="text"
            placeholder="Search by name, tech or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-card/60 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_var(--glow-primary)] transition"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard3D
                project={project}
                onInspect={(p) => setSelectedProject(p)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center space-y-2 relative z-10">
          <p className="text-muted-foreground text-sm">
            No projects matched your criteria.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-primary font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detail Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
