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
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 7.8);

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
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // --- Cinematic Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(
      currentTheme.threeLight.ambientColor,
      1.4
    );
    scene.add(ambientLight);

    // Key Light (Theme Primary Accent)
    const keyLight = new THREE.PointLight(
      currentTheme.threeLight.primaryLightColor,
      2.6,
      35
    );
    keyLight.position.set(3.5, 4.0, 4.5);
    scene.add(keyLight);

    // Fill Light (Secondary Hue)
    const fillLight = new THREE.PointLight(
      currentTheme.threeLight.secondaryLightColor,
      1.8,
      35
    );
    fillLight.position.set(-4.0, -2.5, 3.0);
    scene.add(fillLight);

    // Rim/Backlight (High-tech Edge Glow)
    const rimLight = new THREE.PointLight(0xffffff, 2.2, 30);
    rimLight.position.set(0, 3.5, -4.5);
    scene.add(rimLight);

    // =========================================================================
    //  FUTURISTIC CYBER-DEVELOPER AVATAR / AI BUST
    // =========================================================================
    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(0, -0.2, 0);
    scene.add(avatarGroup);

    // Shared Materials
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.25,
      metalness: 0.88,
      envMapIntensity: 1.0,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x182030,
      roughness: 0.35,
      metalness: 0.92,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.primaryLightColor,
      emissive: currentTheme.threeLight.primaryLightColor,
      emissiveIntensity: 0.95,
      roughness: 0.1,
      metalness: 0.5,
    });

    const wireMat = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.wireframeColor,
      emissive: currentTheme.threeLight.wireframeColor,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // 1. Head Cranium (Sculpted Polyhedral Cybernetic Helmet)
    const craniumGeo = new THREE.DodecahedronGeometry(1.35, 1);
    const craniumMesh = new THREE.Mesh(craniumGeo, obsidianMat);
    craniumMesh.scale.set(0.95, 1.15, 1.05);
    avatarGroup.add(craniumMesh);

    // Cranium Wireframe Holographic Aura Layer
    const craniumWireGeo = new THREE.DodecahedronGeometry(1.42, 1);
    const craniumWireMesh = new THREE.Mesh(craniumWireGeo, wireMat);
    craniumWireMesh.scale.set(0.95, 1.15, 1.05);
    avatarGroup.add(craniumWireMesh);

    // 2. Visor / Neural Ocular Sensor (Curved High-Tech Bar)
    const visorGeo = new THREE.TorusGeometry(1.28, 0.085, 16, 48, Math.PI * 0.55);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.15, 0.55);
    visorMesh.rotation.set(-Math.PI / 8, Math.PI * 0.725, 0);
    avatarGroup.add(visorMesh);

    // 3. Facet Jawline & Faceplate
    const jawGeo = new THREE.ConeGeometry(0.85, 1.1, 4);
    const jawMesh = new THREE.Mesh(jawGeo, titaniumMat);
    jawMesh.position.set(0, -0.65, 0.35);
    jawMesh.rotation.set(Math.PI, Math.PI / 4, 0);
    avatarGroup.add(jawMesh);

    // 4. Cyber Neck & Collar Collarbone Chassis
    const neckGeo = new THREE.CylinderGeometry(0.52, 0.68, 0.75, 8);
    const neckMesh = new THREE.Mesh(neckGeo, obsidianMat);
    neckMesh.position.set(0, -1.05, 0);
    avatarGroup.add(neckMesh);

    // Collar Chassis Base
    const collarGeo = new THREE.TorusGeometry(1.4, 0.14, 8, 32);
    const collarMesh = new THREE.Mesh(collarGeo, titaniumMat);
    collarMesh.position.set(0, -1.45, 0);
    collarMesh.rotation.x = Math.PI / 2;
    avatarGroup.add(collarMesh);

    // 5. Floating Holographic Quantum Halo Rings
    const haloGroup = new THREE.Group();
    avatarGroup.add(haloGroup);

    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.primaryLightColor,
      emissive: currentTheme.threeLight.primaryLightColor,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.6,
    });
    const haloRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    haloRing1.rotation.x = Math.PI / 3;
    haloRing1.rotation.y = Math.PI / 6;
    haloGroup.add(haloRing1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.018, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.secondaryLightColor,
      emissive: currentTheme.threeLight.secondaryLightColor,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.45,
    });
    const haloRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    haloRing2.rotation.x = -Math.PI / 4;
    haloRing2.rotation.y = -Math.PI / 5;
    haloGroup.add(haloRing2);

    // 6. Orbiting Neural Data Nodes
    const nodesGroup = new THREE.Group();
    avatarGroup.add(nodesGroup);

    const nodeCount = 5;
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const nodeGeo = new THREE.OctahedronGeometry(0.12, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: currentTheme.threeLight.primaryLightColor,
        emissive: currentTheme.threeLight.primaryLightColor,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodes.push(nodeMesh);
      nodesGroup.add(nodeMesh);
    }

    // 7. Ambient Particle Matrix (Atmospheric Space Dust)
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: currentTheme.threeLight.particleColor,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Mouse Parallax & Dynamic Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.45;
      mouse.targetY = y * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse parallax damping
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        // Avatar idle float and natural head turn
        avatarGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.4) * 0.06;
        avatarGroup.rotation.y = mouse.x * 0.8 + Math.sin(elapsedTime * 0.6) * 0.08;
        avatarGroup.rotation.x = -mouse.y * 0.5 + Math.cos(elapsedTime * 0.8) * 0.04;

        // Halo Rings counter-rotation
        haloRing1.rotation.z = elapsedTime * 0.35;
        haloRing2.rotation.z = -elapsedTime * 0.28;

        // Orbiting Neural Nodes
        nodes.forEach((node, idx) => {
          const angle = elapsedTime * 0.8 + (idx * Math.PI * 2) / nodeCount;
          const radius = 2.4 + Math.sin(elapsedTime * 1.5 + idx) * 0.2;
          node.position.x = Math.cos(angle) * radius;
          node.position.y = Math.sin(angle * 0.7) * 1.2;
          node.position.z = Math.sin(angle) * radius;
          node.rotation.x = elapsedTime * 1.2;
          node.rotation.y = elapsedTime * 1.5;
        });

        // Ambient particles slow drift
        particles.rotation.y = elapsedTime * 0.025;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // --- Responsive Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Theme Change Event Handler ---
    const handleThemeChange = (e: CustomEvent) => {
      const theme = e.detail;
      if (!theme || !theme.threeLight) return;

      ambientLight.color.set(theme.threeLight.ambientColor);
      keyLight.color.set(theme.threeLight.primaryLightColor);
      fillLight.color.set(theme.threeLight.secondaryLightColor);

      visorMat.color.set(theme.threeLight.primaryLightColor);
      visorMat.emissive.set(theme.threeLight.primaryLightColor);

      wireMat.color.set(theme.threeLight.wireframeColor);
      wireMat.emissive.set(theme.threeLight.wireframeColor);

      ringMat1.color.set(theme.threeLight.primaryLightColor);
      ringMat1.emissive.set(theme.threeLight.primaryLightColor);

      ringMat2.color.set(theme.threeLight.secondaryLightColor);
      ringMat2.emissive.set(theme.threeLight.secondaryLightColor);

      nodes.forEach((node) => {
        (node.material as THREE.MeshStandardMaterial).color.set(
          theme.threeLight.primaryLightColor
        );
        (node.material as THREE.MeshStandardMaterial).emissive.set(
          theme.threeLight.primaryLightColor
        );
      });

      particleMaterial.color.set(theme.threeLight.particleColor);
    };

    window.addEventListener(
      "portfolio-theme-change" as any,
      handleThemeChange as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener(
        "portfolio-theme-change" as any,
        handleThemeChange as EventListener
      );
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(animationFrameId);

      if (renderer && renderer.domElement && container) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }

      // Geometries & Materials disposal
      craniumGeo.dispose();
      craniumWireGeo.dispose();
      visorGeo.dispose();
      jawGeo.dispose();
      neckGeo.dispose();
      collarGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeometry.dispose();

      obsidianMat.dispose();
      titaniumMat.dispose();
      visorMat.dispose();
      wireMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleMaterial.dispose();
    };
  }, [currentTheme, prefersReducedMotion]);

  if (!webglSupported) {
    return <Fallback3D />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Cyber Developer Avatar"
    />
  );
}
