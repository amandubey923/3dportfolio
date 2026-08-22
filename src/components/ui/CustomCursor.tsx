"use client";

import React, { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 5;

interface Point {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "clickable" | "card" | "text">("default");
  const [isDown, setIsDown] = useState(false);

  // Direct DOM Refs for 60fps zero-lag performance
  const diamondRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Physics coordinates
  const mousePos = useRef<Point>({ x: -100, y: -100 });
  const diamondPos = useRef<Point>({ x: -100, y: -100 });
  const trailPos = useRef<Point[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop / fine-pointer devices
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches)
    ) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseDown = () => setIsDown(true);
    const onMouseUp = () => setIsDown(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[role='button']") ||
        target.closest(".btn-primary-gradient") ||
        target.closest(".btn-secondary-glass") ||
        target.closest(".cursor-pointer")
      ) {
        setHoverType("clickable");
      } else if (
        target.closest("[class*='card']") ||
        target.closest(".glass-card-premium") ||
        target.closest(".group")
      ) {
        setHoverType("card");
      } else if (
        target.closest("h1") ||
        target.closest("h2") ||
        target.closest("h3") ||
        target.closest("p")
      ) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // Continuous 60fps Lerp animation loop without React state lag
    const loop = () => {
      const target = mousePos.current;

      // 1. Center dot tracks mouse instantly with slight spring
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }

      // 2. Diamond follows with smooth high-response interpolation
      const easeDiamond = 0.45;
      diamondPos.current.x += (target.x - diamondPos.current.x) * easeDiamond;
      diamondPos.current.y += (target.y - diamondPos.current.y) * easeDiamond;

      if (diamondRef.current) {
        diamondRef.current.style.transform = `translate3d(${diamondPos.current.x}px, ${diamondPos.current.y}px, 0)`;
      }

      // 3. Trailing nodes follow behind
      trailPos.current[0].x += (target.x - trailPos.current[0].x) * 0.35;
      trailPos.current[0].y += (target.y - trailPos.current[0].y) * 0.35;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const ease = 0.32 - i * 0.03;
        trailPos.current[i].x +=
          (trailPos.current[i - 1].x - trailPos.current[i].x) * ease;
        trailPos.current[i].y +=
          (trailPos.current[i - 1].y - trailPos.current[i].y) * ease;
      }

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${trailPos.current[i].x}px, ${trailPos.current[i].y}px, 0)`;
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouch) return null;

  // Diamond size & styling variations based on hover and click states
  let diamondSize = 22;
  let diamondScale = isDown ? 0.82 : 1;
  let diamondRotate = 45;
  let borderWidth = "1.5px";
  let bgFill = "transparent";
  let diamondGlow = "0 0 10px var(--glow-primary)";

  if (hoverType === "clickable") {
    diamondSize = 28;
    diamondScale = isDown ? 0.9 : 1.2;
    borderWidth = "2px";
    bgFill = "rgba(var(--primary-rgb), 0.12)";
    diamondGlow = "0 0 18px var(--glow-strong), 0 0 30px var(--glow-primary)";
  } else if (hoverType === "card") {
    diamondSize = 26;
    diamondScale = isDown ? 0.88 : 1.1;
    borderWidth = "1.5px";
    bgFill = "rgba(var(--primary-rgb), 0.05)";
    diamondGlow = "0 0 14px var(--glow-primary)";
  } else if (hoverType === "text") {
    diamondSize = 18;
    diamondScale = isDown ? 0.75 : 0.85;
    borderWidth = "1px";
    diamondGlow = "0 0 8px var(--glow-primary)";
  }

  // Trailing energy nodes configs
  const trailConfigs = [
    { size: 4.5, opacity: 0.65, color: "var(--primary)", glow: "0 0 6px var(--primary)" },
    { size: 3.8, opacity: 0.50, color: "var(--primary)", glow: "0 0 5px var(--primary)" },
    { size: 3.0, opacity: 0.38, color: "var(--secondary)", glow: "0 0 4px var(--secondary)" },
    { size: 2.2, opacity: 0.25, color: "var(--secondary)", glow: "0 0 3px var(--secondary)" },
    { size: 1.5, opacity: 0.15, color: "#8b5cf6", glow: "0 0 2px #8b5cf6" },
  ];

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Subtle Digital Snake Trail (Micro Glowing Energy Nodes) */}
      {trailConfigs.map((cfg, index) => {
        const offset = cfg.size / 2;
        return (
          <div
            key={index}
            ref={(el) => {
              trailRefs.current[index] = el;
            }}
            className="pointer-events-none absolute top-0 left-0 rounded-full will-change-transform"
            style={{
              width: `${cfg.size}px`,
              height: `${cfg.size}px`,
              marginLeft: `-${offset}px`,
              marginTop: `-${offset}px`,
              backgroundColor: cfg.color,
              opacity: cfg.opacity,
              boxShadow: cfg.glow,
            }}
          />
        );
      })}

      {/* 2. Geometric Diamond Cursor Reticle (◇) */}
      <div
        ref={diamondRef}
        className="pointer-events-none absolute top-0 left-0 flex items-center justify-center will-change-transform"
        style={{
          width: `${diamondSize}px`,
          height: `${diamondSize}px`,
          marginLeft: `-${diamondSize / 2}px`,
          marginTop: `-${diamondSize / 2}px`,
          transition: "width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), margin 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="w-full h-full rounded-sm transition-all duration-200"
          style={{
            transform: `rotate(${diamondRotate}deg) scale(${diamondScale})`,
            borderColor: "var(--primary)",
            borderWidth: borderWidth,
            borderStyle: "solid",
            backgroundColor: bgFill,
            boxShadow: diamondGlow,
          }}
        />
      </div>

      {/* 3. Center Glowing Target Dot (•) */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 flex items-center justify-center will-change-transform"
        style={{
          width: "6px",
          height: "6px",
          marginLeft: "-3px",
          marginTop: "-3px",
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full transition-transform duration-150"
          style={{
            backgroundColor: "var(--primary)",
            transform: isDown ? "scale(0.6)" : hoverType === "clickable" ? "scale(1.4)" : "scale(1)",
            boxShadow: "0 0 6px var(--primary), 0 0 12px var(--glow-strong)",
          }}
        />
      </div>
    </div>
  );
}
