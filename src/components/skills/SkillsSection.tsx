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
  "Next.js": "Reader's HUB, Transaction-Validator, AI Fitness",
  "TypeScript": "Reader's HUB, Transaction-Validator, 3D Portfolio",
  "JavaScript": "Full-Stack Web Applications, LeetCode DSA",
  "C++": "LeetCode 250+ Streak, 500+ DSA Solutions",
  "SQL": "Relational Data Modeling & PostgreSQL Schemas",
  "HTML5 & CSS3": "Responsive Layouts across all projects",
  "HTML5 Canvas": "Interactive Graphics & PDF Annotations",
  "PDF.js": "Reader's HUB Digital Reading Platform",
  "Node.js": "Productify SaaS, AI Image Studio, Reader's HUB",
  "Express.js": "Productify SaaS, AI Image Studio, Book Store App",
  "WebSockets": "Video Calling Interview Platform",
  "Tailwind CSS": "Reader's HUB, Transaction-Validator, Dentiva AI",
  "MongoDB": "Productify SaaS, Book Store App",
  "PostgreSQL": "Dentiva AI Healthcare Platform",
  "Convex": "AI Fitness Platform (FitPilot AI)",
  "Prisma ORM": "Dentiva AI Clinical Management Dashboard",
  "Neon (SQL)": "Serverless Database Deployments",
  "Google Gemini API": "Reader's HUB, AI Fitness, Portfolio Chatbot",
  "Gemini API": "Reader's HUB, AI Fitness, Portfolio Chatbot",
  "Vapi AI": "Dentiva AI Voice Consultation Engine",
  "Clerk Auth": "AI Fitness Platform & Dentiva AI",
  "Resend": "Transactional Email Confirmations",
  "WebRTC": "Video Calling Interview Platform",
  "Git": "Version Control across all repositories",
  "GitHub": "Collaboration & Public Repositories",
  "VS Code": "Primary Development IDE",
  "Postman": "REST API Testing & Verification",
  "Vercel": "Reader's HUB, Transaction-Validator, Productify",
  "Netlify": "Dentiva AI, Video Interview Platform",
  "Render": "Backend Web Service Deployments",
  "Railway": "Cloud Infrastructure & Database Hosting",
  "Data Structures & Algorithms": "500+ Problems Solved, 250+ Days Streak",
  "Object-Oriented Programming (OOP)": "Clean Modular Architecture",
  "Operating Systems": "OS Processes, Concurrency & Memory Management",
  "Web Architecture": "Client-Server Systems & Scalable Full-Stack Design",
  "Database Management Systems (DBMS)": "Relational SQL & Document Modeling",
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
    const classes = ["card-ai", "card-fullstack", "card-frontend", "card-ai", "card-fullstack", "card-frontend", "card-ai"];
    return classes[index % classes.length];
  };

  const getSkillBadgeClass = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("react") || n.includes("tailwind") || n.includes("netlify") || n.includes("render") || n.includes("railway")) return "badge-tech-react";
    if (n.includes("node") || n.includes("express") || n.includes("git")) return "badge-tech-node";
    if (n.includes("type") || n.includes("c++") || n.includes("javascript")) return "badge-tech-ts";
    if (n.includes("next") || n.includes("vercel") || n.includes("vs code")) return "badge-tech-next";
    if (n.includes("mongo") || n.includes("postgres") || n.includes("firebase") || n.includes("convex") || n.includes("neon") || n.includes("prisma") || n.includes("sql")) return "badge-tech-mongo";
    if (n.includes("gemini") || n.includes("vapi") || n.includes("ai") || n.includes("resend")) return "badge-tech-ai";
    if (n.includes("structures") || n.includes("algorithms") || n.includes("oop") || n.includes("operating") || n.includes("clerk") || n.includes("web architecture") || n.includes("pdf")) return "badge-tech-three";
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
      className="relative py-16 sm:py-24 lg:py-28 px-3.5 xs:px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto overflow-hidden min-w-0"
    >
      {/* Background Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="ambient-orb ambient-orb-2 w-[260px] sm:w-[450px] h-[260px] sm:h-[450px] top-1/4 -left-16 sm:-left-24 animate-orb-pulse pointer-events-none" />
        <div className="ambient-orb ambient-orb-1 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bottom-10 -right-16 sm:-right-20 animate-orb-pulse pointer-events-none" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Section Header with Editorial Index */}
      <div className="mb-8 sm:mb-14 space-y-2 sm:space-y-3 relative z-10 w-full min-w-0 max-w-full">
        <div className="section-index-badge">
          <Cpu className="w-3.5 h-3.5" />
          <span>02 / Technical Arsenal</span>
        </div>

        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight break-words">
          Skills & <span className="text-gradient-primary">Architectural Stack</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed break-words">
          Technologies and tools I use across my projects. Hover or tap any skill chip to inspect where it is deployed.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 relative z-10 w-full min-w-0 max-w-full">
        {/* Category Pills with Gradient Active Glow */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-2 pt-1 w-full min-w-0 max-w-full no-scrollbar overscroll-x-contain touch-pan-x">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
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
        <div className="relative w-full sm:w-72 shrink-0 min-w-0 max-w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-w-0 max-w-full pl-9 pr-4 py-2 sm:py-2.5 rounded-xl border border-foreground/10 bg-card text-xs text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_var(--glow-primary)] transition"
          />
        </div>
      </div>

      {/* Active Skill Connection Banner */}
      {hoveredSkill && SKILL_PROJECT_MAP[hoveredSkill] && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-primary/40 bg-primary/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono relative z-10 shadow-lg w-full min-w-0 max-w-full overflow-hidden"
        >
          <div className="flex items-center gap-2 flex-wrap min-w-0 w-full sm:w-auto">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="text-primary font-bold shrink-0">{hoveredSkill}:</span>
            <span className="text-foreground/90 font-sans break-words min-w-0">Applied in {SKILL_PROJECT_MAP[hoveredSkill]}</span>
          </div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 text-primary hover:underline font-bold text-xs shrink-0 mt-1 sm:mt-0"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </motion.div>
      )}

      {/* Interactive Category Grid with Gradient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10 w-full min-w-0 max-w-full">
        <AnimatePresence>
          {filteredCategories.map((category, idx) => (
            <motion.div
              layout="position"
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{ maxWidth: "100%", width: "100%" }}
              className={`w-full min-w-0 max-w-full overflow-hidden p-3.5 xs:p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-2xl transition-all duration-300 group flex flex-col justify-between ${getCategoryThemeClass(idx)}`}
            >
              <div className="w-full min-w-0 max-w-full">
                {/* Card Header with Glowing Icon */}
                <div className="flex items-center gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-foreground/10 min-w-0 w-full">
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-foreground/[0.04] text-primary border border-foreground/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--glow-primary)] transition duration-300 shrink-0">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-foreground break-words">
                      {category.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-foreground/65 font-normal break-words leading-relaxed mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 w-full min-w-0 max-w-full">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onClick={() => setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`inline-flex max-w-full min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 hover:scale-[1.02] sm:hover:scale-105 active:scale-95 cursor-pointer break-words leading-snug ${getSkillBadgeClass(skill.name)}`}
                    >
                      <span className="break-words min-w-0">{skill.name}</span>
                      {skill.tag && (
                        <span className="text-[9px] sm:text-[10px] opacity-75 font-mono break-words min-w-0">
                          · {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Count */}
              <div className="mt-4 sm:mt-6 pt-2.5 sm:pt-3 border-t border-foreground/10 flex items-center justify-between text-[11px] sm:text-xs text-foreground/60 font-mono w-full min-w-0 max-w-full">
                <span>{category.skills.length} Capabilities</span>
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
