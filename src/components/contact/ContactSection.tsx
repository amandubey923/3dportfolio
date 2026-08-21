"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Github,
  Linkedin,
  Code,
  CheckCircle2,
  Terminal,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import ToastContainer, { ToastMessage } from "@/components/ui/Toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    addToast("success", "Email address copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    addToast("success", "Phone number copied to clipboard!");
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast("error", "Please fill in all required fields.");
      return;
    }

    if (isSubmitting) return; // Prevent duplicate submission

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
        addToast("success", "Message delivered successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Celebration confetti
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      } else {
        const errorText = "Something went wrong while sending your message. Please try again or use email directly.";
        setErrorMessage(errorText);
        addToast("error", errorText);
      }
    } catch {
      const errorText = "Something went wrong while sending your message. Please try again or use email directly.";
      setErrorMessage(errorText);
      addToast("error", errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-1 w-[450px] h-[450px] top-1/4 -right-20 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-2 w-[400px] h-[400px] bottom-0 -left-20 animate-orb-pulse" style={{ animationDelay: "3s" }} />

      {/* Section Header with Editorial Index */}
      <div className="mb-20 space-y-3 relative z-10 text-center sm:text-left">
        <div className="section-index-badge">
          <Terminal className="w-3.5 h-3.5" />
          <span>05 / Direct Communications</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Open a <span className="text-gradient-primary">Secure Channel</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
          Whether you have an engineering role, collaborative project, or architectural inquiry — let’s build something impactful.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Left: Direct Channel Badges & Social Vectors */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Quick Copy Contact Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card-premium space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-primary" />
              Direct Endpoints
            </h3>

            {/* Email Box */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-3 group hover:border-primary/40 transition">
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Primary Email
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-primary text-muted-foreground hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition shrink-0"
                title="Copy Email Address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Box */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-3 group hover:border-primary/40 transition">
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Direct Telephone
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">
                  {PERSONAL_INFO.phone}
                </span>
              </div>
              <button
                onClick={handleCopyPhone}
                className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-primary text-muted-foreground hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition shrink-0"
                title="Copy Phone Number"
              >
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location Box */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Location & Timezone
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  {PERSONAL_INFO.location} · UTC+5:30 (IST)
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-6 rounded-3xl glass-card-premium space-y-3.5">
            <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Developer Ecosystems
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl border border-white/10 bg-white/[0.02] text-xs font-bold text-foreground hover:border-primary hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition group hover:scale-[1.02]"
              >
                <Github className="w-4 h-4 text-primary" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl border border-white/10 bg-white/[0.02] text-xs font-bold text-foreground hover:border-primary hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition group hover:scale-[1.02]"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl border border-white/10 bg-white/[0.02] text-xs font-bold text-foreground hover:border-primary hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition group hover:scale-[1.02]"
              >
                <Code className="w-4 h-4 text-primary" />
                <span>LeetCode</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.geeksforgeeks}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl border border-white/10 bg-white/[0.02] text-xs font-bold text-foreground hover:border-primary hover:text-primary hover:shadow-[0_0_15px_var(--glow-primary)] transition group hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span>GeeksforGeeks</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Working Interactive Dispatch Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-10 rounded-3xl glass-card-premium shadow-2xl space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Dispatch Message
              </h3>
              <p className="text-xs sm:text-sm text-foreground/60 mt-0.5">
                Send a direct message or inquiry to Aman.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-foreground">
                  ✓ Message Delivered
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  Thanks — your message has been sent successfully. I will respond to your inquiry promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-primary hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-foreground/75 uppercase tracking-wider">
                      Your Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Taylor"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-foreground/15 bg-card text-sm text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-primary focus:shadow-[0_0_20px_var(--glow-primary)] transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-foreground/75 uppercase tracking-wider">
                      Your Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-foreground/15 bg-card text-sm text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-primary focus:shadow-[0_0_20px_var(--glow-primary)] transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-foreground/75 uppercase tracking-wider">
                    Subject / Topic <span className="text-foreground/50 text-[10px] lowercase font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering Role / Full-Stack Project Inquiry"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/15 bg-card text-sm text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-primary focus:shadow-[0_0_20px_var(--glow-primary)] transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-foreground/75 uppercase tracking-wider">
                    Message / Opportunity Scope <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project, team requirements, or collaboration idea..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/15 bg-card text-sm text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-primary focus:shadow-[0_0_20px_var(--glow-primary)] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-gradient w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
