"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";
import Fallback3D from "./Fallback3D";

export default function DeveloperWorldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentTheme, isDark } = useTheme();
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
    camera.position.set(0, 1.4, 6.6);

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
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // --- Cinematic Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(
      currentTheme.threeLight.ambientColor,
      isDark ? 1.6 : 2.2
    );
    scene.add(ambientLight);

    // Primary Key Light (Theme Accent Color)
    const keyLight = new THREE.PointLight(
      currentTheme.threeLight.primaryLightColor,
      isDark ? 2.8 : 1.8,
      25
    );
    keyLight.position.set(3.2, 3.5, 3.8);
    scene.add(keyLight);

    // Secondary Fill Light (Theme Secondary Color)
    const fillLight = new THREE.PointLight(
      currentTheme.threeLight.secondaryLightColor,
      isDark ? 1.9 : 1.4,
      25
    );
    fillLight.position.set(-3.5, 2.0, 3.0);
    scene.add(fillLight);

    // Top Monitor Light Bar / Screen Glow
    const screenGlowLight = new THREE.PointLight(
      currentTheme.threeLight.primaryLightColor,
      2.2,
      6
    );
    screenGlowLight.position.set(0, 0.9, 0.4);
    scene.add(screenGlowLight);

    // Rim/Backlight for Edge Definition
    const rimLight = new THREE.PointLight(
      isDark ? 0x88bbff : 0xffffff,
      isDark ? 2.0 : 1.2,
      20
    );
    rimLight.position.set(0, 2.5, -3.5);
    scene.add(rimLight);

    // =========================================================================
    //  ROOT WORKSPACE SCENE GROUP
    // =========================================================================
    const workspaceGroup = new THREE.Group();
    workspaceGroup.position.set(0, 0.12, 0);
    scene.add(workspaceGroup);

    // --- Dynamic Code Canvas Texture Generator ---
    const createCodeTexture = (themeColor: string, isSecondary = false) => {
      const cvs = document.createElement("canvas");
      cvs.width = 512;
      cvs.height = 320;
      const ctx = cvs.getContext("2d");
      if (ctx) {
        // Dark code editor background
        ctx.fillStyle = isDark ? "#0a0e17" : "#0d131f";
        ctx.fillRect(0, 0, 512, 320);

        // Top editor tab bar
        ctx.fillStyle = isDark ? "#121826" : "#182030";
        ctx.fillRect(0, 0, 512, 30);
        ctx.fillStyle = "#ff5f56";
        ctx.beginPath();
        ctx.arc(18, 15, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffbd2e";
        ctx.beginPath();
        ctx.arc(32, 15, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#27c93f";
        ctx.beginPath();
        ctx.arc(46, 15, 4, 0, Math.PI * 2);
        ctx.fill();

        // Syntax highlighted code lines
        const codeLines = isSecondary
          ? [
              { color: "#38bdf8", text: "import { NeuralAgent } from 'ai';" },
              { color: "#818cf8", text: "export async function queryModel() {" },
              { color: "#a855f7", text: "  const stream = await ai.generate({" },
              { color: "#34d399", text: "    model: 'gemini-2.5-flash'," },
              { color: "#fb923c", text: "    temperature: 0.2," },
              { color: "#e2e8f0", text: "  });" },
              { color: "#38bdf8", text: "  return stream.toTextStream();" },
              { color: "#818cf8", text: "}" },
            ]
          : [
              { color: "#60a5fa", text: "const Developer = () => {" },
              { color: "#c084fc", text: "  const [system, setSystem] = useState({" },
              { color: "#34d399", text: "    arch: 'Full-Stack Next.js 16'," },
              { color: "#38bdf8", text: "    status: 'High Performance 60FPS'," },
              { color: "#fb923c", text: "    latency: '8.4ms'," },
              { color: "#c084fc", text: "  });" },
              { color: "#60a5fa", text: "  return <CloudWorkspace data={system} />;" },
              { color: "#60a5fa", text: "};" },
            ];

        ctx.font = "14px monospace";
        let y = 60;
        codeLines.forEach((line, i) => {
          // Line numbers
          ctx.fillStyle = "#475569";
          ctx.fillText(`${i + 1}`, 15, y);

          // Code text
          ctx.fillStyle = line.color;
          ctx.fillText(line.text, 45, y);
          y += 26;
        });

        // Glowing active cursor line
        ctx.fillStyle = themeColor;
        ctx.fillRect(45, y + 2, 8, 14);
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    };

    const mainCodeTexture = createCodeTexture(
      currentTheme.previewColor,
      false
    );
    const sideCodeTexture = createCodeTexture(
      currentTheme.secondaryPreview,
      true
    );

    // --- High-Grade Shared Materials ---
    const deskMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f1522 : 0x222a38,
      roughness: 0.35,
      metalness: 0.7,
    });

    const deskPadMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x080b12 : 0x161d2b,
      roughness: 0.6,
      metalness: 0.2,
    });

    const steelMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1f2937 : 0x475569,
      roughness: 0.25,
      metalness: 0.9,
    });

    const bodyMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x161c28 : 0x2d3748,
      roughness: 0.5,
      metalness: 0.3,
    });

    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xe0a885,
      roughness: 0.65,
      metalness: 0.05,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x1a1512,
      roughness: 0.8,
      metalness: 0.1,
    });

    const headphoneMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.3,
      metalness: 0.8,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.primaryLightColor,
      emissive: currentTheme.threeLight.primaryLightColor,
      emissiveIntensity: 0.85,
      roughness: 0.1,
    });

    const screenMat = new THREE.MeshStandardMaterial({
      map: mainCodeTexture,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: mainCodeTexture,
      emissiveIntensity: 0.75,
    });

    const sideScreenMat = new THREE.MeshStandardMaterial({
      map: sideCodeTexture,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: sideCodeTexture,
      emissiveIntensity: 0.65,
    });

    // =========================================================================
    //  1. WORKSTATION DESK & SETUP
    // =========================================================================
    const deskGroup = new THREE.Group();
    workspaceGroup.add(deskGroup);

    // Desktop Surface
    const topGeo = new THREE.BoxGeometry(3.6, 0.08, 1.8);
    const topMesh = new THREE.Mesh(topGeo, deskMat);
    topMesh.position.set(0, 0, 0);
    deskGroup.add(topMesh);

    // Front Desk Edge Accent Light Strip
    const edgeGeo = new THREE.BoxGeometry(3.6, 0.02, 0.02);
    const edgeMesh = new THREE.Mesh(edgeGeo, accentMat);
    edgeMesh.position.set(0, -0.04, 0.9);
    deskGroup.add(edgeMesh);

    // Desk Legs (Trestle Steel Legs)
    const legGeo = new THREE.BoxGeometry(0.08, 1.4, 1.5);
    const leftLeg = new THREE.Mesh(legGeo, steelMat);
    leftLeg.position.set(-1.6, -0.74, 0);
    deskGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, steelMat);
    rightLeg.position.set(1.6, -0.74, 0);
    deskGroup.add(rightLeg);

    // Large Extended Desk Pad
    const padGeo = new THREE.BoxGeometry(2.6, 0.015, 1.1);
    const padMesh = new THREE.Mesh(padGeo, deskPadMat);
    padMesh.position.set(0, 0.045, 0.15);
    deskGroup.add(padMesh);

    // =========================================================================
    //  2. DUAL MONITOR WORKSTATION
    // =========================================================================
    // Main Curved / Wide Center Screen
    const mainScreenGroup = new THREE.Group();
    mainScreenGroup.position.set(0, 0.65, -0.35);
    deskGroup.add(mainScreenGroup);

    // Screen Bezel
    const screenFrameGeo = new THREE.BoxGeometry(1.85, 1.15, 0.06);
    const screenFrameMesh = new THREE.Mesh(screenFrameGeo, steelMat);
    mainScreenGroup.add(screenFrameMesh);

    // Screen Display Surface
    const screenGeo = new THREE.PlaneGeometry(1.75, 1.05);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, 0.032);
    mainScreenGroup.add(screenMesh);

    // Top Monitor Lightbar
    const lightBarGeo = new THREE.BoxGeometry(1.2, 0.03, 0.05);
    const lightBarMesh = new THREE.Mesh(lightBarGeo, accentMat);
    lightBarMesh.position.set(0, 0.6, 0.04);
    mainScreenGroup.add(lightBarMesh);

    // Main Monitor Stand Stem
    const standStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 16);
    const standStem = new THREE.Mesh(standStemGeo, steelMat);
    standStem.position.set(0, -0.35, -0.15);
    mainScreenGroup.add(standStem);

    // Main Monitor Base
    const standBaseGeo = new THREE.BoxGeometry(0.45, 0.02, 0.35);
    const standBase = new THREE.Mesh(standBaseGeo, steelMat);
    standBase.position.set(0, -0.63, -0.1);
    mainScreenGroup.add(standBase);

    // Secondary Portrait Monitor (Angled on the left)
    const sideScreenGroup = new THREE.Group();
    sideScreenGroup.position.set(-1.25, 0.7, -0.2);
    sideScreenGroup.rotation.y = Math.PI / 7;
    deskGroup.add(sideScreenGroup);

    const sideFrameGeo = new THREE.BoxGeometry(0.75, 1.25, 0.05);
    const sideFrameMesh = new THREE.Mesh(sideFrameGeo, steelMat);
    sideScreenGroup.add(sideFrameMesh);

    const sideScreenGeo = new THREE.PlaneGeometry(0.68, 1.15);
    const sideScreenMesh = new THREE.Mesh(sideScreenGeo, sideScreenMat);
    sideScreenMesh.position.set(0, 0, 0.027);
    sideScreenGroup.add(sideScreenMesh);

    const sideStemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.7, 16);
    const sideStem = new THREE.Mesh(sideStemGeo, steelMat);
    sideStem.position.set(0, -0.4, -0.1);
    sideScreenGroup.add(sideStem);

    // =========================================================================
    //  3. KEYBOARD, MOUSE & DESK ACCESSORIES
    // =========================================================================
    // Mechanical Keyboard
    const kbGeo = new THREE.BoxGeometry(0.85, 0.035, 0.32);
    const kbMesh = new THREE.Mesh(kbGeo, steelMat);
    kbMesh.position.set(0, 0.06, 0.25);
    deskGroup.add(kbMesh);

    // Glowing Keyboard Key Rows
    const keyGeo = new THREE.BoxGeometry(0.8, 0.02, 0.28);
    const keyMesh = new THREE.Mesh(keyGeo, accentMat);
    keyMesh.position.set(0, 0.08, 0.25);
    deskGroup.add(keyMesh);

    // Ergonomic Mouse
    const mouseGeo = new THREE.SphereGeometry(0.055, 16, 12);
    mouseGeo.scale(0.8, 0.45, 1.2);
    const mouseMesh = new THREE.Mesh(mouseGeo, steelMat);
    mouseMesh.position.set(0.65, 0.07, 0.3);
    deskGroup.add(mouseMesh);

    // Developer Ceramic Mug / Thermos
    const mugGeo = new THREE.CylinderGeometry(0.065, 0.06, 0.14, 16);
    const mugMesh = new THREE.Mesh(mugGeo, bodyMat);
    mugMesh.position.set(1.05, 0.12, 0.1);
    deskGroup.add(mugMesh);

    // =========================================================================
    //  4. ERGONOMIC CHAIR & SEATED DEVELOPER FIGURE
    // =========================================================================
    const charGroup = new THREE.Group();
    charGroup.position.set(0, 0, 0.85);
    workspaceGroup.add(charGroup);

    // --- Chair Structure ---
    // Chair Seat Base
    const seatGeo = new THREE.BoxGeometry(0.95, 0.1, 0.9);
    const seatMesh = new THREE.Mesh(seatGeo, bodyMat);
    seatMesh.position.set(0, 0.1, 0);
    charGroup.add(seatMesh);

    // Ergonomic Curved Backrest
    const backGeo = new THREE.BoxGeometry(0.85, 1.1, 0.09);
    const backMesh = new THREE.Mesh(backGeo, bodyMat);
    backMesh.position.set(0, 0.7, 0.42);
    backMesh.rotation.x = -Math.PI / 24;
    charGroup.add(backMesh);

    // Chair Headrest
    const headrestGeo = new THREE.BoxGeometry(0.5, 0.22, 0.08);
    const headrestMesh = new THREE.Mesh(headrestGeo, bodyMat);
    headrestMesh.position.set(0, 1.3, 0.46);
    charGroup.add(headrestMesh);

    // Chair Stem Cylinder & 5-Star Wheel Base
    const chairStemGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.55, 16);
    const chairStem = new THREE.Mesh(chairStemGeo, steelMat);
    chairStem.position.set(0, -0.22, 0);
    charGroup.add(chairStem);

    const baseWheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.04, 5);
    const baseWheel = new THREE.Mesh(baseWheelGeo, steelMat);
    baseWheel.position.set(0, -0.5, 0);
    charGroup.add(baseWheel);

    // Armrests
    const armrestGeo = new THREE.BoxGeometry(0.08, 0.04, 0.45);
    const leftArmrest = new THREE.Mesh(armrestGeo, steelMat);
    leftArmrest.position.set(-0.48, 0.35, 0.05);
    charGroup.add(leftArmrest);

    const rightArmrest = new THREE.Mesh(armrestGeo, steelMat);
    rightArmrest.position.set(0.48, 0.35, 0.05);
    charGroup.add(rightArmrest);

    // --- Seated Developer Figure ---
    // Torso (Modern Developer Hoodie)
    const torsoGeo = new THREE.BoxGeometry(0.72, 0.85, 0.42);
    const torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    torsoMesh.position.set(0, 0.58, 0.18);
    torsoMesh.rotation.x = Math.PI / 32; // Slight forward focus posture
    charGroup.add(torsoMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.1, 0.11, 0.15, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, 1.05, 0.15);
    charGroup.add(neckMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.24, 20, 20);
    headGeo.scale(1, 1.15, 1.05);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(0, 1.25, 0.15);
    charGroup.add(headMesh);

    // Modern Haircut
    const hairGeo = new THREE.SphereGeometry(0.26, 16, 16);
    hairGeo.scale(1.02, 0.75, 1.08);
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(0, 1.38, 0.13);
    charGroup.add(hairMesh);

    // Studio Over-Ear Headphones (Band + Earcups)
    const bandGeo = new THREE.TorusGeometry(0.26, 0.025, 12, 24, Math.PI);
    const bandMesh = new THREE.Mesh(bandGeo, headphoneMat);
    bandMesh.position.set(0, 1.28, 0.15);
    bandMesh.rotation.set(0, Math.PI / 2, 0);
    charGroup.add(bandMesh);

    const earcupGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.06, 16);
    const leftEarcup = new THREE.Mesh(earcupGeo, accentMat);
    leftEarcup.position.set(-0.25, 1.25, 0.15);
    leftEarcup.rotation.z = Math.PI / 2;
    charGroup.add(leftEarcup);

    const rightEarcup = new THREE.Mesh(earcupGeo, accentMat);
    rightEarcup.position.set(0.25, 1.25, 0.15);
    rightEarcup.rotation.z = Math.PI / 2;
    charGroup.add(rightEarcup);

    // Left Arm & Forearm reaching to Keyboard
    const leftArmGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.55, 12);
    const leftArm = new THREE.Mesh(leftArmGeo, bodyMat);
    leftArm.position.set(-0.38, 0.58, -0.05);
    leftArm.rotation.set(Math.PI / 4, 0, Math.PI / 16);
    charGroup.add(leftArm);

    const leftForearmGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.5, 12);
    const leftForearm = new THREE.Mesh(leftForearmGeo, skinMat);
    leftForearm.position.set(-0.26, 0.32, -0.32);
    leftForearm.rotation.set(Math.PI / 2.3, 0, -Math.PI / 8);
    charGroup.add(leftForearm);

    // Right Arm & Hand on Mouse / Keyboard
    const rightArmGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.55, 12);
    const rightArm = new THREE.Mesh(rightArmGeo, bodyMat);
    rightArm.position.set(0.38, 0.58, -0.05);
    rightArm.rotation.set(Math.PI / 4, 0, -Math.PI / 16);
    charGroup.add(rightArm);

    const rightForearmGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.5, 12);
    const rightForearm = new THREE.Mesh(rightForearmGeo, skinMat);
    rightForearm.position.set(0.32, 0.32, -0.32);
    rightForearm.rotation.set(Math.PI / 2.3, 0, Math.PI / 8);
    charGroup.add(rightForearm);

    // =========================================================================
    //  5. FLOATING HOLOGRAPHIC TECH PILLS & PARTICLES
    // =========================================================================
    const holoGroup = new THREE.Group();
    workspaceGroup.add(holoGroup);

    // Holographic Floating Code Icons (Clean glowing polyhedrals)
    const holoGeo1 = new THREE.OctahedronGeometry(0.14);
    const holoMesh1 = new THREE.Mesh(holoGeo1, accentMat);
    holoMesh1.position.set(1.45, 1.4, -0.1);
    holoGroup.add(holoMesh1);

    const holoGeo2 = new THREE.TetrahedronGeometry(0.12);
    const holoMesh2 = new THREE.Mesh(holoGeo2, accentMat);
    holoMesh2.position.set(-1.55, 1.35, 0.3);
    holoGroup.add(holoMesh2);

    const holoGeo3 = new THREE.IcosahedronGeometry(0.1);
    const holoMesh3 = new THREE.Mesh(holoGeo3, accentMat);
    holoMesh3.position.set(0.85, 1.8, -0.4);
    holoGroup.add(holoMesh3);

    // Ambient Floating Data Particles
    const particleCount = 35;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 4.5;
      posArray[i + 1] = Math.random() * 3.2 - 0.5;
      posArray[i + 2] = (Math.random() - 0.5) * 3.5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: currentTheme.threeLight.particleColor,
      transparent: true,
      opacity: isDark ? 0.65 : 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    workspaceGroup.add(particles);

    // =========================================================================
    //  INTERACTION & ANIMATION LOOP
    // =========================================================================
    let targetRotX = 0.05;
    let targetRotY = -0.22; // Natural 3/4 perspective angle
    let currentRotX = targetRotX;
    let currentRotY = targetRotY;
    let clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = -0.22 + x * 0.45;
      targetRotX = 0.05 - y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera / Workspace Parallax
      if (!prefersReducedMotion) {
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;
        workspaceGroup.rotation.y = currentRotY;
        workspaceGroup.rotation.x = currentRotX;

        // Subtle Developer Breathing & Typing Micro-Motion
        torsoMesh.position.y = 0.58 + Math.sin(elapsedTime * 1.8) * 0.008;
        headMesh.position.y = 1.25 + Math.sin(elapsedTime * 1.8) * 0.01;
        hairMesh.position.y = 1.38 + Math.sin(elapsedTime * 1.8) * 0.01;
        bandMesh.position.y = 1.28 + Math.sin(elapsedTime * 1.8) * 0.01;
        leftEarcup.position.y = 1.25 + Math.sin(elapsedTime * 1.8) * 0.01;
        rightEarcup.position.y = 1.25 + Math.sin(elapsedTime * 1.8) * 0.01;

        // Floating Tech Badges Motion
        holoMesh1.rotation.y += 0.015;
        holoMesh1.position.y = 1.4 + Math.sin(elapsedTime * 2 + 1) * 0.04;
        holoMesh2.rotation.x += 0.018;
        holoMesh2.position.y = 1.35 + Math.cos(elapsedTime * 1.6 + 2) * 0.04;
        holoMesh3.rotation.z += 0.02;
        holoMesh3.position.y = 1.8 + Math.sin(elapsedTime * 1.4 + 3) * 0.04;

        // Floating ambient dust rise
        particles.rotation.y = elapsedTime * 0.02;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(animId);
      if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [currentTheme, isDark, prefersReducedMotion]);

  if (!webglSupported) {
    return <Fallback3D />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    />
  );
}
