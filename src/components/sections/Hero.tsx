import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative z-10 min-h-[calc(100vh-80px)] flex items-center">
      {/* Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-125 h-125 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* MAIN GRID */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full px-6 md:px-12 lg:px-20">
        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-8 relative">
          {/* Accent line */}
          <div className="absolute -left-6 top-2 h-16 w-0.5 bg-primary/40 hidden lg:block" />

          <span className="text-sm tracking-widest text-primary uppercase">
            Hello, I’m
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Aman{" "}
            <span className="text-primary relative">
              Dubey
              <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary/60" />
            </span>
          </h1>

          <p className="max-w-xl text-muted-foreground text-lg leading-relaxed">
            A passionate Full-Stack Developer focused on building clean,
            scalable, and high-performance web applications with modern
            technologies.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-6 pt-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/resume/Resume2.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              Download Resume
            </Link>
          </div>
          <Link
            href="/contact-form"
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
          >
            <MessageSquare className="h-4 w-4 transition group-hover:scale-110" />
            Message Me
          </Link>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative flex justify-center">
          {/* Image Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-[140px]" />

          {/* Image Frame */}
          <div className="relative w-95 h-120 rounded-2xl overflow-hidden border border-border bg-card/30 backdrop-blur-md shadow-[0_0_120px_var(--cyber-glow-primary)]">
            <Image
              src="/hero/hero2.png"
              alt="Aman Dubey"
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-border">
  
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
  </span>

  <span className="text-sm text-white font-medium">
    Available for work
  </span>

</div>
          </div>

          {/* Decorative Corner Lines */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-primary/60" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-primary/60" />
        </div>
      </div>
    </section>
  );
}
