"use client";

import React from "react";

interface ADLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showWordmark?: boolean;
  withGlow?: boolean;
}

export default function ADLogo({
  size = "md",
  className = "",
  showWordmark = false,
  withGlow = true,
}: ADLogoProps) {
  const sizeMap = {
    xs: { icon: 24, text: "text-xs", sub: "text-[9px]" },
    sm: { icon: 34, text: "text-sm", sub: "text-[10px]" },
    md: { icon: 42, text: "text-base", sub: "text-xs" },
    lg: { icon: 52, text: "text-lg", sub: "text-xs" },
    xl: { icon: 68, text: "text-2xl", sub: "text-sm" },
  };

  const { icon: iconSize, text: textSize, sub: subSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Monogram Symbol Mark */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden p-1 transition-all duration-300 group-hover:scale-105 ${
          withGlow
            ? "shadow-[0_0_18px_var(--glow-primary)] border border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_25px_var(--glow-strong)]"
            : "border border-white/10"
        } bg-card/95 backdrop-blur-xl`}
        style={{
          width: iconSize + 6,
          height: iconSize + 6,
        }}
      >
        {/* Subtle Background Surface Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/40 pointer-events-none rounded-xl" />

        {/* SVG Geometric AD Ligature Monogram */}
        <svg
          viewBox="0 0 100 100"
          width={iconSize}
          height={iconSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300"
        >
          <defs>
            {/* Dynamic Linear Gradient adapted to active theme */}
            <linearGradient id="adGradientHighContrast" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary, #00f0ff)" />
              <stop offset="45%" stopColor="var(--secondary, #6366f1)" />
              <stop offset="100%" stopColor="var(--primary, #38bdf8)" />
            </linearGradient>

            <linearGradient id="adAccentHighlight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--primary, #00f0ff)" stopOpacity="0.5" />
            </linearGradient>

            <filter id="adGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Main Continuous AD Monogram Silhouette */}
          <path
            d="M 48 14 C 49.5 14, 51.5 15, 53 17 L 58 24 C 74 24, 86 35, 86 52 C 86 69, 73 80, 56 80 L 44 80 L 38 80 L 16 80 L 28 58 L 38 58 L 46 43 L 48 14 Z"
            fill="url(#adGradientHighContrast)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.2"
            fillRule="evenodd"
          />

          {/* Precision Left Diagonal Highlight */}
          <path
            d="M 26 72 L 44 38 L 48 24 L 41 38 L 23 72 Z"
            fill="url(#adAccentHighlight)"
            opacity="0.9"
          />

          {/* D Negative Space Internal Bowl */}
          <path
            d="M 52 34 C 67 34, 74 42, 74 52 C 74 62, 67 70, 52 70 L 52 34 Z"
            fill="var(--background, #07090f)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.8"
          />

          {/* A Core Internal Negative Triangle */}
          <path
            d="M 44 48 L 52 64 L 36 64 Z"
            fill="var(--background, #07090f)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.8"
          />

          {/* Apex Precision Core Dot */}
          <circle
            cx="48"
            cy="16"
            r="3.2"
            fill="#ffffff"
            filter="url(#adGlowFilter)"
          />

          {/* Cross-Link Laser Line */}
          <line
            x1="36"
            y1="64"
            x2="52"
            y2="64"
            stroke="url(#adGradientHighContrast)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wordmark Display */}
      {showWordmark && (
        <div className="flex flex-col select-none">
          <span
            className={`font-extrabold tracking-tight text-foreground group-hover:text-primary transition leading-none ${textSize}`}
          >
            Aman Dubey
          </span>
          <span
            className={`font-mono text-muted-foreground flex items-center gap-1.5 mt-0.5 ${subSize}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Software Engineer
          </span>
        </div>
      )}
    </div>
  );
}
