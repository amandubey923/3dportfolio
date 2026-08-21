"use client";

import React from "react";

export default function Fallback3D() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none select-none">
      {/* Animated Core Ring Fallback */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse" />

        {/* Outer Ring */}
        <div
          className="absolute inset-4 rounded-full border border-dashed border-primary/40 animate-spin"
          style={{ animationDuration: "25s" }}
        />

        {/* Middle Hexagon / Ring */}
        <div
          className="absolute inset-12 rounded-full border border-primary/60 animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        />

        {/* Inner Core */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-primary/30 via-primary/60 to-primary/90 shadow-[0_0_50px_var(--glow-primary)] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-background border border-primary/80 flex items-center justify-center">
            <span className="text-primary font-mono font-bold text-xs tracking-wider animate-pulse">
              CORE.V2
            </span>
          </div>
        </div>

        {/* Satellite nodes */}
        <div className="absolute top-0 right-10 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_var(--glow-primary)]" />
        <div className="absolute bottom-6 left-12 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_var(--glow-primary)]" />
      </div>
    </div>
  );
}

