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
  ArrowUpRight,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import Link from "next/link";

// Verified Skill-to-Project Connection Map
const SKILL_PROJECT_MAP: Record<string, string> = {
  "React.js": "Reader's HUB, Dentiva AI, AI Fitness Platform",
  "Next.js": "Reader's HUB, Transaction-Validator, Productify SaaS",
  "TypeScript": "Reader's HUB, Transaction-Validator, 3D Portfolio",
  "JavaScript": "All 10 Projects, LeetCode DSA",
  "C++": "LeetCode 250+ Streak, Algorithmic Problem Solving",
  "Node.js": "Productify SaaS, AI Image Studio, Reader's HUB",
  "Express.js": "Productify SaaS, AI Image Studio, Book Store App",
  "Tailwind CSS": "Reader's HUB, Transaction-Validator, Dentiva AI",
  "MongoDB": "Productify SaaS, Book Store App",
  "PostgreSQL": "Full-Stack Relational Applications",
  "Firebase": "Authentication & Realtime Cloud Services",
  "Convex": "Reader's HUB Realtime Data Sync",
  "Neon (SQL)": "Serverless Postgres Deployments",
  "Gemini AI": "AI Fitness Platform, Portfolio Chatbot",
  "Vapi AI": "Dentiva AI Voice Assistant Engine",
  "Prisma ORM": "Type-Safe Database Schema Client",
  "Clerk Auth": "Secured Identity & User Management",
  "Git": "Version Control across all repositories",
  "GitHub": "Collaboration & 10+ Public Projects",
  "Vercel": "Reader's HUB, Transaction-Validator, Productify",
  "Netlify": "Dentiva AI, AI Fitness, Video Interview",
  "Data Structures & Algorithms": "250+ Days Streak, 500+ Problems Solved",
  "OOP": "Clean Architecture & Design Patterns",
  "Operating Systems": "Process Concurrency & Memory Management",
  "Web Development": "10+ Production Deployments & Responsive UI",
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
    if (n.includes("react") || n.includes("tailwind") || n.includes("netlify") || n.includes("render") || n.includes("railway")) return "badge-tech-react";
    if (n.includes("node") || n.includes("express") || n.includes("git")) return "badge-tech-node";
    if (n.includes("type") || n.includes("c++") || n.includes("javascript")) return "badge-tech-ts";
    if (n.includes("next") || n.includes("vercel") || n.includes("vs code")) return "badge-tech-next";
    if (n.includes("mongo") || n.includes("postgres") || n.includes("firebase") || n.includes("convex") || n.includes("neon") || n.includes("prisma") || n.includes("sql")) return "badge-tech-mongo";
    if (n.includes("gemini") || n.includes("vapi") || n.includes("ai") || n.includes("code-rabbit")) return "badge-tech-ai";
    if (n.includes("structures") || n.includes("algorithms") || n.includes("oop") || n.includes("operating") || n.includes("clerk") || n.includes("web development")) return "badge-tech-three";
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
          Production-proven technologies and frameworks grounded in real application codebases. Hover any skill chip to inspect where it is deployed.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 relative z-10">
        {/* Category Pills with Gradient Active Glow */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "btn-primary-gradient shadow-[0_0_20px_var(--glow-primary)] scale-105"
                    : "border border-foreground/10 bg-card text-foreground/75 hover:text-foreground hover:border-primary/40"
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
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-foreground/10 bg-card text-xs text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_var(--glow-primary)] transition"
          />
        </div>
      </div>

      {/* Active Skill Connection Banner */}
      {hoveredSkill && SKILL_PROJECT_MAP[hoveredSkill] && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-3.5 rounded-2xl border border-primary/40 bg-primary/10 backdrop-blur-xl flex items-center justify-between gap-3 text-xs font-mono relative z-10 shadow-lg"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-bold">{hoveredSkill}:</span>
            <span className="text-foreground/90 font-sans">Applied in {SKILL_PROJECT_MAP[hoveredSkill]}</span>
          </div>
          <Link
            href="/#projects"
            className="hidden sm:inline-flex items-center gap-1 text-primary hover:underline font-bold"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </motion.div>
      )}

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
                <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-foreground/10">
                  <div className="p-3 rounded-2xl bg-foreground/[0.04] text-primary border border-foreground/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--glow-primary)] transition duration-300">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-xs text-foreground/65 line-clamp-1 font-normal">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 cursor-pointer ${getSkillBadgeClass(skill.name)}`}
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
              <div className="mt-6 pt-3 border-t border-foreground/10 flex items-center justify-between text-xs text-foreground/60 font-mono">
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
