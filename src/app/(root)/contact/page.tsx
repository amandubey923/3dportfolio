"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactPage() {

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <section className="relative z-10 max-w-7xl mx-auto py-32 px-6 overflow-hidden">

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 backdrop-blur-xl px-6 py-4 shadow-[0_0_40px_var(--cyber-glow-primary)] animate-fadeIn">

            <CheckCircle className="text-green-400 w-6 h-6" />

            <span className="text-sm font-medium text-foreground">
              Message sent successfully!
            </span>

          </div>
        </div>
      )}

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-primary/10 blur-[140px] rounded-full animate-slow-spin" />
        <div className="absolute -bottom-40 -right-40 w-125 h-125 bg-primary/10 blur-[140px] rounded-full animate-slow-spin" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      {/* ================= HEADING ================= */}
      <div className="relative mb-24 text-center animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight relative inline-block">
          Let’s <span className="text-primary">Connect</span>
          <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-24 h-0.5 bg-primary/60 animate-pulse" />
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          Whether you have an opportunity, collaboration idea, or just want to
          say hello — my inbox is always open.
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* CONTACT CARD */}
        <div className="group relative h-90 rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-10 transition-all duration-500 hover:border-primary hover:shadow-[0_0_80px_var(--cyber-glow-primary)]">
          
          <h3 className="text-2xl font-semibold mb-10">Contact Details</h3>

          <div className="space-y-6 text-muted-foreground">
            <p>
              <span className="block text-sm mb-1">Email</span>
              <span className="text-lg text-foreground">
                kumaraman19137@gmail.com
              </span>
            </p>

            <p>
              <span className="block text-sm mb-1">Phone</span>
              <span className="text-lg text-foreground">
                +91 8969230625
              </span>
            </p>

            <p>
              <span className="block text-sm mb-1">Location</span>
              <span className="text-lg text-foreground">
                India
              </span>
            </p>
          </div>
        </div>

        {/* SOCIAL CARD */}
        <div className="group relative h-90 rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-10 transition-all duration-500 hover:border-primary hover:shadow-[0_0_80px_var(--cyber-glow-primary)]">

          <h3 className="text-2xl font-semibold mb-10">Online Presence</h3>

          <div className="space-y-6">
            <Link href="https://github.com/amandubey923" target="_blank"
              className="block text-lg text-muted-foreground hover:text-primary transition">
              GitHub →
            </Link>

            <Link href="https://www.linkedin.com/in/aman-kr-dubey" target="_blank"
              className="block text-lg text-muted-foreground hover:text-primary transition">
              LinkedIn →
            </Link>

            <Link href="https://leetcode.com/u/aman_dubey923" target="_blank"
              className="block text-lg text-muted-foreground hover:text-primary transition">
              LeetCode →
            </Link>

            <Link href="https://www.geeksforgeeks.org/profile/kumaramag0dt" target="_blank"
              className="block text-lg text-muted-foreground hover:text-primary transition">
              GeeksforGeeks →
            </Link>
          </div>
        </div>

        {/* WORK CARD */}
        <div className="group relative h-90 rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-10 transition-all duration-500 hover:border-primary hover:shadow-[0_0_80px_var(--cyber-glow-primary)]">

          <h3 className="text-2xl font-semibold mb-8">Work With Me</h3>

          <p className="text-muted-foreground mb-10 leading-relaxed">
            I’m open to internships, freelance work, collaborations, and
            full-time roles. Let’s build something impactful together.
          </p>

          <Link
            href="/resume/Resume2.pdf"
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.03] shadow-lg shadow-primary/30"
          >
            View Resume
          </Link>
        </div>
      </div>

      {/* ================= CONTACT FORM SECTION ================= */}
      <div className="relative mt-28 max-w-3xl mx-auto">

        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-10 transition-all hover:border-primary hover:shadow-[0_0_80px_var(--cyber-glow-primary)]">

          <h3 className="text-2xl font-semibold mb-10 text-center">
            Send Me a Message
          </h3>

          <form
     onSubmit={async (e) => {
  e.preventDefault();

  const form = e.currentTarget; // save reference
  const formData = new FormData(form);

  await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }),
  });

  setShowSuccess(true);

  form.reset(); // safe now

  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
}}
            className="space-y-6"
          >

            <input
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-lg border border-border bg-background/40 backdrop-blur-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition"
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full rounded-lg border border-border bg-background/40 backdrop-blur-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition"
            />

            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="w-full rounded-lg border border-border bg-background/40 backdrop-blur-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition resize-none"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:scale-[1.03] hover:opacity-90 shadow-lg shadow-primary/30"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>

    </section>
  );
}