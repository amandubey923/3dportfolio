"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type HoverState = "default" | "button" | "card" | "text";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<HoverState>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Check touch and reduced-motion capabilities
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-2), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".btn-primary-gradient") ||
        target.closest(".btn-secondary-glass")
      ) {
        setHoverState("button");
      } else if (
        target.closest(".group") ||
        target.closest("[class*='card']") ||
        target.closest(".glass-card-premium")
      ) {
        setHoverState("card");
      } else if (
        target.closest("h1") ||
        target.closest("h2") ||
        target.closest("p")
      ) {
        setHoverState("text");
      } else {
        setHoverState("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  // Geometry configurations for outer crosshair/diamond
  const getOuterConfig = () => {
    switch (hoverState) {
      case "button":
        return {
          size: 32,
          rotate: 45,
          scale: isClicking ? 0.85 : 1.15,
          opacity: 0.9,
          borderWidth: "1.5px",
          bgColor: "rgba(var(--primary-rgb), 0.12)",
          shadow: "0 0 16px var(--glow-strong)",
        };
      case "card":
        return {
          size: 38,
          rotate: 0,
          scale: isClicking ? 0.9 : 1.05,
          opacity: 0.75,
          borderWidth: "1px",
          bgColor: "rgba(var(--primary-rgb), 0.04)",
          shadow: "0 0 14px var(--glow-primary)",
        };
      case "text":
        return {
          size: 20,
          rotate: 45,
          scale: isClicking ? 0.8 : 0.9,
          opacity: 0.6,
          borderWidth: "1px",
          bgColor: "transparent",
          shadow: "0 0 8px var(--glow-primary)",
        };
      case "default":
      default:
        return {
          size: 22,
          rotate: 45,
          scale: isClicking ? 0.8 : 1,
          opacity: 0.7,
          borderWidth: "1px",
          bgColor: "transparent",
          shadow: "0 0 10px var(--glow-primary)",
        };
    }
  };

  const outer = getOuterConfig();

  return (
    <>
      {/* Click Micro-Ripple Wave */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-primary"
            initial={{
              x: ripple.x - 10,
              y: ripple.y - 10,
              width: 20,
              height: 20,
              opacity: 0.8,
              scale: 0.5,
            }}
            animate={{
              width: 44,
              height: 44,
              x: ripple.x - 22,
              y: ripple.y - 22,
              opacity: 0,
              scale: 1.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing Crosshair / Diamond Reticle */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center"
        animate={{
          x: mousePosition.x - outer.size / 2,
          y: mousePosition.y - outer.size / 2,
          width: outer.size,
          height: outer.size,
          rotate: outer.rotate,
          scale: outer.scale,
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 26,
          mass: 0.45,
        }}
      >
        <div
          className="w-full h-full rounded-md border transition-colors duration-200"
          style={{
            borderColor: "var(--primary)",
            borderWidth: outer.borderWidth,
            backgroundColor: outer.bgColor,
            boxShadow: outer.shadow,
            opacity: outer.opacity,
          }}
        />

        {/* Minimal Corner Crosshair Ticks for High-Tech Reticle */}
        {hoverState === "default" && (
          <>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-primary/70 rounded-full" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-primary/70 rounded-full" />
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-primary/70 rounded-full" />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-primary/70 rounded-full" />
          </>
        )}
      </motion.div>

      {/* Precise Center Core Point with Soft Ambient Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicking ? 0.6 : hoverState === "button" ? 1.4 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 38,
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: "var(--primary)",
            boxShadow: "0 0 6px var(--primary), 0 0 12px var(--glow-strong)",
          }}
        />
      </motion.div>
    </>
  );
}
