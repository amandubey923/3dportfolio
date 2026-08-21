"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal as TerminalIcon } from "lucide-react";

export default function TerminalSnippet() {
  const [copied, setCopied] = useState(false);

  const command = "npx amandubey --explore-universe";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg rounded-xl border border-white/[0.08] bg-black/50 backdrop-blur-xl shadow-xl overflow-hidden font-mono text-xs">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-white/[0.02] border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/60" />
          <div className="w-2 h-2 rounded-full bg-amber-500/60" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
          <span className="ml-2 text-[10px] text-muted-foreground/80 flex items-center gap-1">
            <TerminalIcon className="w-3 h-3 text-primary/70" />
            aman-terminal
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition"
          title="Copy command"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-3 space-y-1.5 text-foreground/85 leading-relaxed">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">❯</span>
          <span className="text-foreground/90 font-medium">{command}</span>
        </div>

        <div className="text-muted-foreground/85 space-y-0.5 text-[11px]">
          <p>
            <span className="text-primary/90">⚡ Status:</span> Available for Full-Stack & Engineering Roles
          </p>
          <p>
            <span className="text-indigo-400/90">🛠 Stack:</span> Next.js · TypeScript · React · Node.js · AI
          </p>
          <p>
            <span className="text-amber-400/90">🏆 Streak:</span> 100+ Days LeetCode DSA · SIH Finalist
            <span className="text-amber-400/90">🏆 Streak:</span> 250+ Days LeetCode DSA · SIH Finalist
          </p>
        </div>
      </div>
    </div>
  );
}
