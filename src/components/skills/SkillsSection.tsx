"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Cpu,
  Search,
  Sparkles,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const getFilteredCategories = () => {
    return SKILL_CATEGORIES.map((category) => {
      const filteredSkills = category.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return {
        ...category,
        skills: filteredSkills,
      };
    }).filter((category) => {
      if (selectedCategory !== "All" && category.title !== selectedCategory) {
        return false;
      }
      return category.skills.length > 0;
    });
  };

  const filteredCategories = getFilteredCategories();

  const getCategoryThemeClass = (index: number) => {
    const classes = ["card-ai", "card-fullstack", "card-frontend", "card-ai", "card-fullstack", "card-frontend"];
    return classes[index % classes.length];
  };

  const getSkillBadgeClass = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("react")) return "badge-tech-react";
    if (n.includes("node") || n.includes("express")) return "badge-tech-node";
    if (n.includes("type") || n.includes("c++") || n.includes("javascript")) return "badge-tech-ts";
    if (n.includes("next")) return "badge-tech-next";
    if (n.includes("mongo") || n.includes("sql") || n.includes("database")) return "badge-tech-mongo";
    if (n.includes("three") || n.includes("webgl") || n.includes("framer")) return "badge-tech-three";
    if (n.includes("ai") || n.includes("cloud") || n.includes("aws")) return "badge-tech-ai";
    return "badge-tech-default";
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5" />;
      case "Layout":
        return <Layout className="w-5 h-5" />;
      case "Server":
        return <Server className="w-5 h-5" />;
      case "Database":
        return <Database className="w-5 h-5" />;
      case "Cloud":
        return <Cloud className="w-5 h-5" />;
      case "Cpu":
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-2 w-[450px] h-[450px] top-1/4 -left-24 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-1 w-[400px] h-[400px] bottom-10 -right-20 animate-orb-pulse" style={{ animationDelay: "2.5s" }} />

      {/* Section Header with Editorial Index */}
      <div className="mb-16 space-y-3 relative z-10">
        <div className="section-index-badge">
          <Cpu className="w-3.5 h-3.5" />
          <span>02 / Technical Arsenal</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Skills & <span className="text-gradient-primary">Architectural Stack</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
          Production-proven technologies, frameworks, and engineering methodologies
          utilized across high-throughput web applications and AI services.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 relative z-10">
        {/* Category Pills with Gradient Active Glow */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

        {/* Search Input with Gradient Focus */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-card/60 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_var(--glow-primary)] transition"
          />
        </div>
      </div>

      {/* Interactive Category Grid with Gradient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((category, idx) => (
            <motion.div
              layout
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-3xl backdrop-blur-2xl transition-all duration-300 group flex flex-col justify-between ${getCategoryThemeClass(idx)}`}
            >
              <div>
                {/* Card Header with Glowing Icon */}
                <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-white/10">
                  <div className="p-3 rounded-2xl bg-white/[0.05] text-primary border border-white/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--glow-primary)] transition duration-300">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Colorful Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 ${getSkillBadgeClass(skill.name)}`}
                    >
                      <span>{skill.name}</span>
                      {skill.tag && (
                        <span className="text-[10px] opacity-75 font-mono">
                          · {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Count */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>{category.skills.length} Capabilities</span>
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
