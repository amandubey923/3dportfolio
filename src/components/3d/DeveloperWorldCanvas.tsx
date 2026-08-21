"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";
import Fallback3D from "./Fallback3D";

export default function DeveloperWorldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();
  const [webglSupported, setWebglSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Test WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8.5;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // --- Soft Atmospheric Lighting ---
    const ambientLight = new THREE.AmbientLight(
      currentTheme.threeLight.ambientColor,
      1.2
    );
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(
      currentTheme.threeLight.primaryLightColor,
      1.8,
      40
    );
    primaryLight.position.set(4, 4, 4);
    scene.add(primaryLight);

    const secondaryLight = new THREE.PointLight(
      currentTheme.threeLight.secondaryLightColor,
      1.4,
      40
    );
    secondaryLight.position.set(-4, -3, -2);
    scene.add(secondaryLight);

    // --- Core Holographic Group ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing core - soft translucent
    const innerGeometry = new THREE.IcosahedronGeometry(1.5, 2);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.coreColor,
      emissive: currentTheme.threeLight.coreColor,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      metalness: 0.6,
      wireframe: false,
      transparent: true,
      opacity: 0.75,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    coreGroup.add(innerCore);

    // Outer wireframe cage - restrained
    const outerGeometry = new THREE.IcosahedronGeometry(2.0, 1);
    const outerMaterial = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.wireframeColor,
      emissive: currentTheme.threeLight.wireframeColor,
      emissiveIntensity: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerCage = new THREE.Mesh(outerGeometry, outerMaterial);
    coreGroup.add(outerCage);

    // Middle Torus Rings
    const torusGeometry = new THREE.TorusGeometry(2.5, 0.025, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.wireframeColor,
      emissive: currentTheme.threeLight.wireframeColor,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.45,
    });
    const torusRing1 = new THREE.Mesh(torusGeometry, torusMaterial);
    torusRing1.rotation.x = Math.PI / 3;
    coreGroup.add(torusRing1);

    const torusRing2 = new THREE.Mesh(torusGeometry, torusMaterial);
    torusRing2.rotation.y = Math.PI / 4;
    torusRing2.rotation.x = -Math.PI / 6;
    coreGroup.add(torusRing2);

    // --- Orbiting Satellites ---
    const satellitesGroup = new THREE.Group();
    scene.add(satellitesGroup);

    const satelliteCount = 4;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.OctahedronGeometry(0.2, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: currentTheme.threeLight.primaryLightColor,
        emissive: currentTheme.threeLight.primaryLightColor,
        emissiveIntensity: 0.3,
        roughness: 0.5,
        metalness: 0.5,
        transparent: true,
        opacity: 0.8,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellites.push(satMesh);
      satellitesGroup.add(satMesh);
    }

    // --- Ambient Particle Dust ---
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 18;
      particlePositions[i + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: currentTheme.threeLight.particleColor,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Mouse Parallax (Controlled & Smooth) ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.4;
      mouse.targetY = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Theme Color Sync Event ---
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const theme = customEvent.detail;
      if (!theme || !theme.threeLight) return;

      ambientLight.color.setHex(theme.threeLight.ambientColor);
      primaryLight.color.setHex(theme.threeLight.primaryLightColor);
      secondaryLight.color.setHex(theme.threeLight.secondaryLightColor);
      innerMaterial.color.setHex(theme.threeLight.coreColor);
      innerMaterial.emissive.setHex(theme.threeLight.coreColor);
      outerMaterial.color.setHex(theme.threeLight.wireframeColor);
      outerMaterial.emissive.setHex(theme.threeLight.wireframeColor);
      torusMaterial.color.setHex(theme.threeLight.wireframeColor);
      torusMaterial.emissive.setHex(theme.threeLight.wireframeColor);
      particleMaterial.color.setHex(theme.threeLight.particleColor);

      satellites.forEach((sat) => {
        (sat.material as THREE.MeshStandardMaterial).color.setHex(
          theme.threeLight.primaryLightColor
        );
        (sat.material as THREE.MeshStandardMaterial).emissive.setHex(
          theme.threeLight.primaryLightColor
        );
      });
    };

    window.addEventListener("portfolio-theme-change", handleThemeChange);

    // --- Visibility & Render Loop ---
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const speedMultiplier = motionQuery.matches ? 0.15 : 0.7;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Rotate core calmly
      coreGroup.rotation.y = elapsedTime * 0.18 * speedMultiplier + mouse.x * 0.3;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.1 * speedMultiplier) * 0.15 + mouse.y * 0.25;

      outerCage.rotation.y = -elapsedTime * 0.22 * speedMultiplier;
      outerCage.rotation.z = elapsedTime * 0.14 * speedMultiplier;

      torusRing1.rotation.z = elapsedTime * 0.25 * speedMultiplier;
      torusRing2.rotation.z = -elapsedTime * 0.2 * speedMultiplier;

      // Subtle pulse
      const pulse = 1 + Math.sin(elapsedTime * 1.5 * speedMultiplier) * 0.025;
      innerCore.scale.set(pulse, pulse, pulse);

      // Orbit satellites
      satellites.forEach((sat, idx) => {
        const angle =
          elapsedTime * 0.35 * speedMultiplier + (idx * Math.PI * 2) / satelliteCount;
        const radius = 3.0 + Math.sin(elapsedTime * 0.8 + idx) * 0.2;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.z = Math.sin(angle) * radius;
        sat.position.y = Math.sin(angle * 1.5 + idx) * 0.6;
        sat.rotation.x += 0.01;
        sat.rotation.y += 0.015;
      });

      // Ambient particle rotation
      particles.rotation.y = elapsedTime * 0.02 * speedMultiplier;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("portfolio-theme-change", handleThemeChange);
      window.removeEventListener("resize", handleResize);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      innerGeometry.dispose();
      innerMaterial.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      satellites.forEach((sat) => {
        sat.geometry.dispose();
        (sat.material as THREE.Material).dispose();
      });

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [currentTheme]);

  if (!webglSupported) {
    return <Fallback3D />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] lg:min-h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Developer World Core"
    />
  );
}
