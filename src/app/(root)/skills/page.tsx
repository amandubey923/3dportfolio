import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiHtml5,
  DiCss3,
} from "react-icons/di";
import { SiC, SiCplusplus, SiExpress, SiPostman, SiNextdotjs, SiTailwindcss, SiMysql, SiGithub, SiVercel, SiNetlify, SiAdobe } from "react-icons/si";

export default function SkillsPage() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto py-28 px-6">
      {/* ================= HEADING ================= */}
      <div className="mb-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          My <span className="text-primary">Skills</span>
        </h2>

        <p className="mt-6 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          A structured overview of my technical expertise, tools, and workflows
          that I actively use to build scalable, production-ready applications.
        </p>

        {/* Accent Line */}
        <div className="mt-8 h-[2px] w-24 bg-primary/60" />
      </div>

      {/* ================= SKILLS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">

        {/* ================= PROGRAMMING ================= */}
        <SkillCard title="Programming Languages">
          <Skill icon={<SiC />} label="C" />
          <Skill icon={<SiCplusplus />} label="C++" />
          <Skill icon={<DiJavascript1 />} label="JavaScript" />
        </SkillCard>

        {/* ================= FRONTEND ================= */}
        <SkillCard title="Frontend Development">
          <Skill icon={<DiReact />} label="React.js" />
          <Skill icon={<SiNextdotjs />} label="Next.js & Shadcn" />
          <Skill icon={<SiTailwindcss />} label="Tailwind CSS" />
          <Skill icon={<DiHtml5 />} label="HTML5" />
          <Skill icon={<DiCss3 />} label="CSS3" />
        </SkillCard>

        {/* ================= BACKEND ================= */}
        <SkillCard title="Backend Development">
          <Skill icon={<DiNodejs />} label="Node.js" />
          <Skill icon={<SiExpress />} label="Express.js" />
          <Skill icon={<SiPostman />} label="REST APIs & Postman" />
        </SkillCard>

        {/* ================= DATABASES ================= */}
        <SkillCard title="Databases">
          <Skill icon={<DiMongodb />} label="MongoDB" />
          <Skill icon={<SiMysql />} label="SQL Databases" />
          <Skill icon={<span className="text-primary font-bold">CV</span>} label="Convex" />
        </SkillCard>

        {/* ================= TOOLS ================= */}
        <SkillCard title="Tools & Platforms">
          <Skill icon={<DiGit />} label="Git" />
          <Skill icon={<SiGithub />} label="GitHub" />
          <Skill icon={<SiVercel />} label="Vercel" />
          <Skill icon={<SiNetlify />} label="Netlify" />
          <Skill icon={<SiAdobe />} label="Adobe Suite" />
        </SkillCard>

        {/* ================= WORKFLOW ================= */}
        <SkillCard title="Development Workflow">
          <Skill label="Clean Architecture" />
          <Skill label="Component-Driven UI" />
          <Skill label="API-First Approach" />
          <Skill label="Performance Optimization" />
        </SkillCard>

      </div>
    </section>
  );
}

/* ================= CARD COMPONENT ================= */
function SkillCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-8 transition-all duration-500 hover:border-primary hover:shadow-[0_0_80px_var(--cyber-glow-primary)]">
      {/* Glow Layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      <h3 className="relative z-10 text-2xl font-semibold mb-8 tracking-wide">
        {title}
      </h3>

      <ul className="relative z-10 space-y-4">
        {children}
      </ul>
    </div>
  );
}

/* ================= SKILL ITEM ================= */
function Skill({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <li className="flex items-center gap-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground">
      {/* Icon */}
      {icon && (
        <span className="text-xl text-primary drop-shadow-[0_0_6px_var(--cyber-glow-primary)]">
          {icon}
        </span>
      )}

      {/* Text */}
      <span className="text-base font-medium tracking-wide text-sky-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]">
        {label}
      </span>
    </li>
  );
}
