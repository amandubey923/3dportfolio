"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Maximize2,
  X,
  Sparkles,
} from "lucide-react";
import { CERTIFICATIONS_DATA, CertificationItem } from "@/data/portfolioData";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(
    null
  );

  return (
    <section
      id="certifications"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-3 w-[450px] h-[450px] top-1/4 -right-24 animate-orb-pulse" />
      <div className="ambient-orb ambient-orb-1 w-[400px] h-[400px] bottom-10 -left-20 animate-orb-pulse" style={{ animationDelay: "2s" }} />

      {/* Section Header with Editorial Index */}
      <div className="mb-16 space-y-3 relative z-10">
        <div className="section-index-badge">
          <Award className="w-3.5 h-3.5" />
          <span>05 / Verified Credentials</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Certifications & <span className="text-gradient-primary">Accolades</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
          Accredited credentials, competitive milestones, and cloud certifications
          demonstrating technical capability and continuous learning discipline.
        </p>
      </div>

      {/* Certifications Glass Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {CERTIFICATIONS_DATA.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group relative rounded-3xl glass-card-premium overflow-hidden flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-white/10 hover:border-primary/50 shadow-xl"
            onClick={() => setSelectedCert(cert)}
          >
            {/* Image Preview with Gradient Framing */}
            <div className="relative h-44 w-full overflow-hidden border-b border-white/10 bg-black/40">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

              {/* Inspect overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-xs transition duration-300">
                <div className="p-3 rounded-full btn-primary-gradient shadow-xl scale-90 group-hover:scale-100 transition">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider block">
                  {cert.issuer}
                </span>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition mt-1 line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {cert.skillsGained.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-lg border border-white/10 bg-white/[0.03] text-[10px] font-mono text-foreground/80 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Modal for Full Certificate Inspection */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative w-full max-w-2xl rounded-3xl border border-primary/40 bg-card/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_50px_var(--glow-primary)] overflow-hidden z-10 space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-primary uppercase">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-0.5">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl border border-white/15 hover:bg-white/10 text-muted-foreground hover:text-foreground transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Resolution Certificate Preview */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-inner">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Certificate Description & Competencies */}
              <div className="space-y-3">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {selectedCert.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-mono text-muted-foreground">
                    Competencies:
                  </span>
                  {selectedCert.skillsGained.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
