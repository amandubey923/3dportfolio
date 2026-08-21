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
    <div className="w-full max-w-lg rounded-xl border border-foreground/[0.08] bg-card backdrop-blur-xl shadow-xl overflow-hidden font-mono text-xs">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-foreground/[0.02] border-b border-foreground/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/70" />
          <div className="w-2 h-2 rounded-full bg-amber-500/70" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-[10px] text-foreground/70 flex items-center gap-1">
            <TerminalIcon className="w-3 h-3 text-primary" />
            aman-terminal
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-foreground/70 hover:text-primary transition cursor-pointer"
          title="Copy command"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied</span>
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
      <div className="p-3 space-y-1.5 text-foreground leading-relaxed">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">❯</span>
          <span className="text-foreground font-semibold">{command}</span>
        </div>

        <div className="text-foreground/75 space-y-0.5 text-[11px]">
          <p>
            <span className="text-primary font-bold">⚡ Status:</span> Available for Full-Stack & Engineering Roles
          </p>
          <p>
            <span className="text-secondary font-bold">🛠 Stack:</span> Next.js · TypeScript · React · Node.js · AI
          </p>
          <p>
            <span className="text-amber-500 font-bold">🏆 Streak:</span> 250+ Days LeetCode DSA · Full-Stack Builder
          </p>
        </div>
      </div>
    </div>
  );
}
