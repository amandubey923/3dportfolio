"use client";

import React from "react";
import { Code2, Monitor, Sparkles, Terminal, Cpu } from "lucide-react";

export default function Fallback3D() {
  return (
    <div className="relative w-full h-full min-h-[440px] flex items-center justify-center pointer-events-none select-none p-6">
      {/* Ambient Backlight Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-3xl animate-pulse" />

      {/* Futuristic Developer Workspace Graphic */}
      <div className="relative w-full max-w-md p-6 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl shadow-2xl space-y-4">
        {/* Top Status Header */}
        <div className="flex items-center justify-between pb-3 border-b border-foreground/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-foreground">
              DEV_ENVIRONMENT // ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-primary text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>60 FPS</span>
          </div>
        </div>

        {/* Dual Monitor Visualization */}
        <div className="grid grid-cols-12 gap-3 items-center">
          {/* Portrait Terminal Monitor */}
          <div className="col-span-4 h-36 rounded-xl border border-foreground/15 bg-background p-2 flex flex-col justify-between font-mono text-[9px] text-foreground/75">
            <div className="flex items-center gap-1 text-primary">
              <Terminal className="w-3 h-3" />
              <span>AI.log</span>
            </div>
            <div className="space-y-1 opacity-80">
              <p className="text-emerald-400">&gt; build 200 OK</p>
              <p>&gt; latency 8ms</p>
              <p className="text-primary">&gt; next 16.1.1</p>
            </div>
            <div className="w-2 h-3 bg-primary animate-pulse" />
          </div>

          {/* Main IDE Monitor */}
          <div className="col-span-8 h-36 rounded-xl border border-primary/40 bg-background p-2.5 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between text-[10px] text-foreground/80 font-mono pb-1 border-b border-foreground/10">
              <span className="flex items-center gap-1">
                <Code2 className="w-3 h-3 text-primary" />
                <span>Architecture.tsx</span>
              </span>
              <span className="text-emerald-400 text-[9px]">TypeScript</span>
            </div>
            <div className="space-y-1 font-mono text-[9px] text-foreground/80">
              <p><span className="text-primary">const</span> App = () =&gt; &#123;</p>
              <p className="pl-2 text-secondary">return &lt;FullStack /&gt;;</p>
              <p>&#125;;</p>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-transparent rounded-full opacity-60" />
          </div>
        </div>

        {/* Bottom Desk Surface & Keyboard Strip */}
        <div className="p-3 rounded-2xl bg-foreground/[0.03] border border-foreground/10 flex items-center justify-between text-xs font-mono text-foreground/70">
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 rounded bg-primary/20 border border-primary/30" />
            <span className="text-[10px]">Mechanical RGB</span>
          </div>
          <span className="text-[10px] text-primary flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3" />
            Full-Stack Coding
          </span>
        </div>
      </div>
    </div>
  );
}
