import Image from "next/image";
import Link from "next/link";
import { Github, Images } from "lucide-react";

/* ================= TYPES ================= */
interface ProjectCardProps {
  image: string;
  title: string;
  desc: string;
  live: string;
  github: string;
}

/* ================= PAGE ================= */
export default function ProjectsPage() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto py-32 px-6">
      
      {/* ================= HEADING ================= */}
      <div className="mb-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          My <span className="text-primary">Projects</span>
        </h2>

        <p className="mt-6 max-w-2xl text-muted-foreground">
          A curated selection of projects showcasing my ability to design,
          develop, and deploy scalable, real-world applications using modern web
          technologies.
        </p>
      </div>

      {/* ================= PROJECT GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* ===== PROJECT 1 ===== */}
        <ProjectCard
          image="/projects/project10.png"
          title="Transaction-Validator "
          desc="Transaction Validation & Processing Platform, Upload transaction CSV files, validate records, clean data, detect errors and download processed files."
          live="https://transaction-validator-aman.vercel.app"
          github="https://github.com/amandubey923/transaction-validator"
        />

        <ProjectCard
          image="/projects/project7.png"
          title="Dentiva AI Dental-Health"
          desc="An AI-powered dental assistant web application that enables seamless doctor booking, appointment, and AI voice chat."
          live="https://dentiva-ai-aman.netlify.app"
          github="https://github.com/amandubey923/dentiva-ai"
        />

        {/* ===== PROJECT 2 ===== */}
        <ProjectCard
          image="/projects/project1.png"
          title="AI Fitness Platform"
          desc="An AI-powered fitness web application that generates personalized workout and diet plans."
          live="https://ai-fitness-aman.netlify.app"
          github="https://github.com/amandubey923/ai-fitness"
        />

        {/* ===== PROJECT 3 ===== */}
        <ProjectCard
          image="/projects/project9.png"
          title="AI Image Generator"
          desc="A full-stack SaaS platform that lets users upload images and transform them into different artistic styles instantly with a smooth and modern UI."
          live="https://image-generator-studio.netlify.app"
          github="https://github.com/amandubey923/image-generator"
        />

        {/* ===== PROJECT 4 ===== */}
        <ProjectCard
          image="/projects/project3.png"
          title="Library Book Website"
          desc="A responsive library platform that allows users to explore and read world-famous books."
          live="https://library-book1.netlify.app/index.html"
          github="https://github.com/amandubey923/LIBRARY-BOOK"
        />

        {/* ===== PROJECT 5 ===== */}
        <ProjectCard
          image="/projects/project2.png"
          title="Video Calling Interview Platform"
          desc="A real-time video calling platform built for conducting technical interviews. Used by interviewer and candidate."
          live="https://video-calling-interview-plattform.netlify.app"
          github="https://github.com/amandubey923/Interview-video-calling-platform"
        />

        {/* ===== PROJECT 6 ===== */}
        <ProjectCard
          image="/projects/project4.png"
          title="Text Utility Application"
          desc="A productivity-focused text utility web app built with React. People can use for transforming large paragraph."
          live="https://text-workspace.vercel.app"
          github="https://github.com/amandubey923/TextWorkspace"
        />

        {/* ===== PROJECT 7 (CUSTOM CARD) ===== */}
        <div className="group rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden transition hover:border-primary hover:shadow-[0_0_60px_var(--cyber-glow-primary)]">
          
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src="/projects/project5.png"
              alt="Book Suggestion App"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8 space-y-4">
            <h3 className="text-2xl font-semibold">Book Suggestion App</h3>

            <p className="text-muted-foreground leading-relaxed">
              A full-stack book reccomendation app where you can upload image of
              book and give rating with your view.
            </p>

            {/* ACTIONS */}
            <div className="flex items-center justify-between pt-2">

              {/* IMAGE PREVIEW */}
              <Link
                href="/project5/projectimg5.jpg"
                target="_blank"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <Images size={18} />
                Project Images →
              </Link>

              {/* GITHUB */}
              <Link
                href="https://github.com/amandubey923/book-store-app"
                target="_blank"
                className="relative flex items-center gap-2 rounded-full
                bg-primary/20
                px-4 py-2
                text-primary font-semibold
                shadow-[0_0_25px_var(--cyber-glow-primary),0_0_60px_rgba(0,255,255,0.25)]
                ring-1 ring-primary/40
                backdrop-blur-md
                hover:scale-110
                hover:shadow-[0_0_40px_var(--cyber-glow-primary),0_0_90px_rgba(0,255,255,0.45)]
                hover:ring-primary/70
                transition-all duration-300 ease-out"
              >
                <Github size={18} />
                GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* ===== PROJECT 8 ===== */}
        <ProjectCard
          image="/projects/project8.png"
          title="Productify"
          desc="Productify is a full-stack SaaS platform that lets creators securely upload, manage, and showcase digital products with a scalable backend."
          live="https://frontend-productify.vercel.app"
          github="https://github.com/amandubey923/productify"
        />

        {/* ===== PROJECT 9 (FUTURE) ===== */}
        <div className="group rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden opacity-80">
          
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src="/projects/project6.png"
              alt="Future Project"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8 space-y-4">
            <h3 className="text-2xl font-semibold">Future Project</h3>

            <p className="text-muted-foreground leading-relaxed">
              An upcoming idea planned for future implementation.
            </p>

            <span className="text-muted-foreground italic">
              Coming Soon
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ================= REUSABLE CARD ================= */
function ProjectCard({
  image,
  title,
  desc,
  live,
  github,
}: ProjectCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden transition hover:border-primary hover:shadow-[0_0_60px_var(--cyber-glow-primary)]">
      
      <div className="relative h-60 w-full overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-semibold">{title}</h3>

        <p className="text-muted-foreground leading-relaxed">
          {desc}
        </p>

        <div className="flex items-center justify-between">
          
          <Link
            href={live}
            target="_blank"
            className="text-primary font-medium hover:underline"
          >
            View Live Project →
          </Link>

          <Link
            href={github}
            target="_blank"
            className="relative flex items-center gap-2 rounded-full
            bg-primary/20
            px-4 py-2
            text-primary font-semibold
            shadow-[0_0_25px_var(--cyber-glow-primary),0_0_60px_rgba(0,255,255,0.25)]
            ring-1 ring-primary/40
            backdrop-blur-md
            hover:scale-110
            hover:shadow-[0_0_40px_var(--cyber-glow-primary),0_0_90px_rgba(0,255,255,0.45)]
            hover:ring-primary/70
            transition-all duration-300 ease-out"
          >
            <Github size={18} />
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}