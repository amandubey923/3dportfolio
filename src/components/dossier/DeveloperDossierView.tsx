"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  FolderGit2,
  Code2,
  Languages as LanguagesIcon,
  Flame,
  Dumbbell,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiGoogle,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function DeveloperDossierView() {
  return (
    <div className="relative min-h-screen pt-20 pb-14 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center">
      {/* =========================================================================
          MAIN RESUME CARD PANEL WITH CONTINUOUS PERIMETER BORDER GLOW
         ========================================================================= */}
      <div className="relative w-full rounded-3xl p-[1.5px] overflow-hidden shadow-[0_16px_45px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-foreground/[0.08]">
        {/* Continuous Traveling Edge Highlight strictly on the border perimeter */}
        <div
          className="absolute inset-[-200%] animate-[spin_10s_linear_infinite] pointer-events-none opacity-40 dark:opacity-75"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 290deg, var(--primary) 325deg, var(--secondary) 360deg)",
          }}
        />

        {/* Clean, 100% Solid Opaque Inner Resume Surface (Zero internal light wash) */}
        <div
          className="relative z-10 rounded-[22.5px] p-5 sm:p-7 space-y-5 sm:space-y-6 border border-foreground/[0.08] shadow-2xl"
          style={{ backgroundColor: "var(--background-subtle)" }}
        >
          {/* =====================================================================
              1. RESUME HEADER: PORTRAIT + IDENTITY + COMPACT CONTACT STRIP
             ===================================================================== */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-5 border-b border-foreground/[0.08]">
            {/* Portrait Frame (+12% refined size) */}
            <div className="relative w-28 h-32 sm:w-32 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-foreground/[0.12] bg-card/80 shadow-md">
              <Image
                src={PERSONAL_INFO.portraitImage}
                alt={PERSONAL_INFO.name}
                fill
                priority
                className="object-cover scale-105"
                style={{ objectPosition: "center 12%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Identity & Contact Info */}
            <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-none">
                    AMAN DUBEY
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-primary mt-1">
                    Software Engineer • Full-Stack Developer
                  </p>
                </div>

                {/* PDF Resume CTA */}
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-gradient inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md active:scale-95 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Resume (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Compact Contact Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-foreground/80 pt-1">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-1.5 hover:text-primary transition font-medium"
                  title="Email"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>

                <span className="opacity-30 hidden sm:inline">•</span>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-1.5 hover:text-primary transition font-medium"
                  title="Phone"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>

                <span className="opacity-30 hidden sm:inline">•</span>

                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>

                <span className="opacity-30 hidden sm:inline">•</span>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition font-medium"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5 text-primary" />
                  <span>GitHub</span>
                </a>

                <span className="opacity-30 hidden sm:inline">•</span>

                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition font-medium"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 text-primary" />
                  <span>LinkedIn</span>
                </a>

                <span className="opacity-30 hidden sm:inline">•</span>

                <Link
                  href="/"
                  className="flex items-center gap-1.5 hover:text-primary transition font-medium"
                  title="Portfolio Home"
                >
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Portfolio</span>
                </Link>
              </div>
            </div>
          </div>

          {/* =====================================================================
              2. TWO-COLUMN RESUME BODY
             ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* ----------------- LEFT COLUMN (42%) ----------------- */}
            <div className="md:col-span-5 space-y-5">
              {/* Profile Summary */}
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Profile Summary</span>
                </h3>
                <p className="text-xs sm:text-[13px] text-foreground/90 leading-relaxed font-normal">
                  Information Technology engineer focused on building clean, scalable, and high-performance web applications. Strong foundations in React, Next.js, Node.js, Express, MongoDB, SQL, and continuous algorithmic problem solving.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="space-y-2.5">
                <h3 className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Technical Skills</span>
                </h3>

                {/* Languages */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-foreground/60 uppercase block">
                    Languages
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiCplusplus className="w-3 h-3 text-blue-500" />
                      <span>C / C++</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiJavascript className="w-3 h-3 text-amber-500" />
                      <span>JavaScript (ES6+)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiTypescript className="w-3 h-3 text-sky-500" />
                      <span>TypeScript</span>
                    </span>
                  </div>
                </div>

                {/* Frontend */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-foreground/60 uppercase block">
                    Frontend
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiReact className="w-3 h-3 text-cyan-500" />
                      <span>React.js</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiNextdotjs className="w-3 h-3 text-foreground" />
                      <span>Next.js (App Router)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiTailwindcss className="w-3 h-3 text-teal-500" />
                      <span>Tailwind CSS</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiHtml5 className="w-3 h-3 text-orange-500" />
                      <span>HTML5</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiCss3 className="w-3 h-3 text-blue-500" />
                      <span>CSS3</span>
                    </span>
                  </div>
                </div>

                {/* Backend */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-foreground/60 uppercase block">
                    Backend
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiNodedotjs className="w-3 h-3 text-emerald-500" />
                      <span>Node.js</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiExpress className="w-3 h-3 text-foreground/80" />
                      <span>Express.js</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <span>REST APIs</span>
                    </span>
                  </div>
                </div>

                {/* Database */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-foreground/60 uppercase block">
                    Databases
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiMongodb className="w-3 h-3 text-green-600" />
                      <span>MongoDB</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiPostgresql className="w-3 h-3 text-sky-500" />
                      <span>SQL / PostgreSQL</span>
                    </span>
                  </div>
                </div>

                {/* AI & Tools */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-foreground/60 uppercase block">
                    AI & Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiGoogle className="w-3 h-3 text-primary" />
                      <span>Gemini AI</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiGit className="w-3 h-3 text-rose-500" />
                      <span>Git</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <SiGithub className="w-3 h-3 text-foreground" />
                      <span>GitHub</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] text-xs font-medium text-foreground hover:border-primary/40 transition">
                      <VscVscode className="w-3 h-3 text-blue-500" />
                      <span>VS Code</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Languages Known */}
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <LanguagesIcon className="w-3.5 h-3.5" />
                  <span>Languages</span>
                </h3>
                <div className="flex flex-wrap gap-1.5 text-xs font-medium text-foreground">
                  <span className="px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03]">
                    🇬🇧 English <span className="text-[11px] text-foreground/60">(Professional)</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03]">
                    🇮🇳 Hindi <span className="text-[11px] text-foreground/60">(Native)</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03]">
                    🇩🇪 German <span className="text-[11px] text-foreground/60">(Elementary)</span>
                  </span>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interests</span>
                </h3>
                <div className="flex flex-wrap gap-1.5 text-xs font-medium text-foreground">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03]">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <span>Reading Philosophy</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03]">
                    <Dumbbell className="w-3.5 h-3.5 text-primary" />
                    <span>Fitness / Gym</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ----------------- RIGHT COLUMN (58%) ----------------- */}
            <div className="md:col-span-7 space-y-5">
              {/* Education */}
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Education</span>
                </h3>

                <div className="p-3.5 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">
                        B.Tech — Information Technology
                      </h4>
                      <p className="text-xs text-foreground/70">
                        CGC Mohali / Chandigarh Group of Colleges, Landran
                      </p>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/25 shrink-0">
                      CGPA: 8.17
                    </span>
                  </div>
                  <div className="text-[11px] text-foreground/65 flex items-center justify-between pt-0.5">
                    <span>2023 – 2027</span>
                    <span>Coursework: DSA · DBMS · OOP · OS · Web Systems</span>
                  </div>
                </div>
              </div>

              {/* Selected Projects (EXACTLY TWO PROJECTS ONLY) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Selected Projects</span>
                  </h3>
                  <span className="text-[11px] text-foreground/60 font-medium">
                    2 Featured Builds
                  </span>
                </div>

                {/* Project 1: Reader's HUB */}
                <div className="p-3.5 sm:p-4 rounded-2xl border border-amber-500/35 bg-amber-500/[0.03] space-y-2 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30 uppercase">
                          #1 Featured
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-foreground">
                          Reader&apos;s HUB
                        </h4>
                      </div>
                      <p className="text-xs font-semibold text-primary mt-0.5">
                        Next-Gen Digital Library & Reading Ecosystem Platform
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="https://reader-hub-library.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg btn-primary-gradient text-[11px] font-bold shadow-sm"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live</span>
                      </a>
                      <a
                        href="https://github.com/amandubey923/ReadersHUB-A-Digital-Library-Platform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg btn-secondary-glass text-[11px] font-semibold text-foreground"
                        title="Source Code"
                      >
                        <Github className="w-3 h-3 text-primary" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>

                  <ul className="space-y-1 text-xs sm:text-[13px] text-foreground/85 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Engineered high-performance client-side catalog indexing and instant title/author search.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Implemented interactive multi-theme customizer engine with local persistence.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Built structured user reviews curation, rating workflows, and book collection management.</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {["Next.js", "TypeScript", "Tailwind CSS", "React.js", "Node.js"].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded border border-foreground/[0.08] bg-foreground/[0.02] text-[11px] text-foreground/75 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project 2: Dentiva AI */}
                <div className="p-3.5 sm:p-4 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] space-y-2 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-foreground">
                        Dentiva AI Dental-Health
                      </h4>
                      <p className="text-xs font-semibold text-primary mt-0.5">
                        AI-Powered Dental Assistant, Voice Consultation & Smart Booking
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="https://dentiva-ai-aman.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg btn-primary-gradient text-[11px] font-bold shadow-sm"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live</span>
                      </a>
                      <a
                        href="https://github.com/amandubey923/dentiva-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg btn-secondary-glass text-[11px] font-semibold text-foreground"
                        title="Source Code"
                      >
                        <Github className="w-3 h-3 text-primary" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>

                  <ul className="space-y-1 text-xs sm:text-[13px] text-foreground/85 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Built conversational AI voice consultation workflow for symptom assessment.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Engineered interactive doctor appointment booking system with real-time slot selection.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Designed mobile-optimized clinical interface for patient dental guidance.</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {["React.js", "Voice AI", "Tailwind CSS", "REST API"].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded border border-foreground/[0.08] bg-foreground/[0.02] text-[11px] text-foreground/75 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Problem Solving / DSA */}
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Problem Solving / DSA</span>
                </h3>

                <div className="p-3.5 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-base sm:text-lg font-black text-foreground">
                      500+ Problems Solved
                    </span>
                    <p className="text-xs text-foreground/70">
                      LeetCode & GeeksforGeeks • 250+ Days Streak Badge
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={PERSONAL_INFO.socials.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.04] text-xs font-bold text-primary hover:border-primary transition"
                    >
                      LeetCode
                    </a>
                    <a
                      href={PERSONAL_INFO.socials.geeksforgeeks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-foreground/[0.08] bg-foreground/[0.04] text-xs font-bold text-primary hover:border-primary transition"
                    >
                      GFG
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
