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
    // Cinematic 3/4 front-side perspective with perfect framing
    camera.position.set(0, 1.25, 5.2);

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
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // --- Studio Lighting Rig ---
    const ambientLight = new THREE.AmbientLight(
      currentTheme.threeLight.ambientColor,
      isDark ? 1.8 : 2.4
    );
    scene.add(ambientLight);

    // Primary Key Light (Theme Primary Accent)
    const keyLight = new THREE.PointLight(
      currentTheme.threeLight.primaryLightColor,
      isDark ? 3.0 : 2.0,
      25
    );
    keyLight.position.set(3.5, 3.8, 3.5);
    scene.add(keyLight);

    // Secondary Fill Light (Theme Secondary Accent)
    const fillLight = new THREE.PointLight(
      currentTheme.threeLight.secondaryLightColor,
      isDark ? 2.2 : 1.6,
      25
    );
    fillLight.position.set(-3.8, 2.2, 2.8);
    scene.add(fillLight);

    // Monitor Front Luminescence (Direct screen cast on hands & keyboard)
    const screenGlowLight = new THREE.PointLight(
      currentTheme.threeLight.primaryLightColor,
      2.6,
      5.5
    );
    screenGlowLight.position.set(0, 0.9, 0.45);
    scene.add(screenGlowLight);

    // Top Overhead Lightbar
    const overheadLight = new THREE.PointLight(
      isDark ? 0x93c5fd : 0xffffff,
      1.5,
      12
    );
    overheadLight.position.set(0, 3.2, 0.8);
    scene.add(overheadLight);

    // Rim/Backlight for Edge Contour Definition
    const rimLight = new THREE.PointLight(
      isDark ? 0x38bdf8 : 0xffffff,
      isDark ? 2.4 : 1.4,
      18
    );
    rimLight.position.set(0, 2.2, -3.2);
    scene.add(rimLight);

    // =========================================================================
    //  ROOT WORKSPACE SCENE COMPOSITION (Scaled and Vertically Centered)
    // =========================================================================
    const workspaceGroup = new THREE.Group();
    workspaceGroup.position.set(0, -0.08, 0);
    // Scaled up by 1.35x to fill 75-85% of right hero area
    workspaceGroup.scale.set(1.32, 1.32, 1.32);
    scene.add(workspaceGroup);

    // --- Dynamic Code Canvas Texture Generator ---
    const createCodeTexture = (themeColor: string, isVertical = false) => {
      const cvs = document.createElement("canvas");
      cvs.width = isVertical ? 320 : 640;
      cvs.height = isVertical ? 512 : 360;
      const ctx = cvs.getContext("2d");
      if (ctx) {
        // Deep obsidian editor background
        ctx.fillStyle = isDark ? "#080c14" : "#0d131f";
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        // Editor tab bar
        ctx.fillStyle = isDark ? "#101622" : "#161e2e";
        ctx.fillRect(0, 0, cvs.width, 28);
        ctx.fillStyle = "#ff5f56";
        ctx.beginPath();
        ctx.arc(16, 14, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffbd2e";
        ctx.beginPath();
        ctx.arc(28, 14, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#27c93f";
        ctx.beginPath();
        ctx.arc(40, 14, 4, 0, Math.PI * 2);
        ctx.fill();

        // Filename in tab
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px monospace";
        ctx.fillText(
          isVertical ? "terminal.log" : "AmanDubey.portfolio.tsx",
          60,
          18
        );

        // Syntax highlighted code lines
        const codeLines = isVertical
          ? [
              { color: "#38bdf8", text: "> next dev --turbo" },
              { color: "#34d399", text: "✓ Ready in 640ms" },
              { color: "#e2e8f0", text: "• GET /api/ai 200 OK" },
              { color: "#818cf8", text: "• Latency: 8.2ms" },
              { color: "#fb923c", text: "• Memory: 42MB" },
              { color: "#38bdf8", text: "• Full-Stack Cloud active" },
              { color: "#34d399", text: "• LeetCode 250+ streak" },
              { color: "#a855f7", text: "• All tests passing (16/16)" },
            ]
          : [
              { color: "#60a5fa", text: "import { FullStackEngineer } from '@/core';" },
              { color: "#c084fc", text: "export const AmanDubey = () => {" },
              { color: "#34d399", text: "  const skills = ['Next.js', 'React', 'TypeScript', 'Node'];" },
              { color: "#38bdf8", text: "  const architecture = useScalableSystems();" },
              { color: "#fb923c", text: "  return <CloudPlatform status='Available for Work' />;" },
              { color: "#c084fc", text: "};" },
              { color: "#60a5fa", text: "export default AmanDubey;" },
            ];

        ctx.font = isVertical ? "12px monospace" : "13px monospace";
        let y = 54;
        codeLines.forEach((line, i) => {
          // Line numbers
          ctx.fillStyle = "#334155";
          ctx.fillText(`${i + 1}`, 12, y);

          // Code text
          ctx.fillStyle = line.color;
          ctx.fillText(line.text, 36, y);
          y += 24;
        });

        // Glowing active blinking cursor
        ctx.fillStyle = themeColor;
        ctx.fillRect(36, y + 2, 8, 14);
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

    // --- Master Materials ---
    const deskMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0c101a : 0x1e2634,
      roughness: 0.35,
      metalness: 0.7,
    });

    const deskPadMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x07090e : 0x121722,
      roughness: 0.65,
      metalness: 0.2,
    });

    const metalFrameMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x182030 : 0x3b4556,
      roughness: 0.2,
      metalness: 0.92,
    });

    const bodyMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x141a26 : 0x2b3546,
      roughness: 0.55,
      metalness: 0.25,
    });

    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xdfa583,
      roughness: 0.6,
      metalness: 0.05,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x161210,
      roughness: 0.85,
      metalness: 0.05,
    });

    const headphoneMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e17,
      roughness: 0.25,
      metalness: 0.85,
    });

    const pcCaseMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d14,
      roughness: 0.15,
      metalness: 0.9,
    });

    const pcGlassMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.95,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.primaryLightColor,
      emissive: currentTheme.threeLight.primaryLightColor,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });

    const secondaryAccentMat = new THREE.MeshStandardMaterial({
      color: currentTheme.threeLight.secondaryLightColor,
      emissive: currentTheme.threeLight.secondaryLightColor,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });

    const speakerConeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.3,
      metalness: 0.6,
    });

    const screenMat = new THREE.MeshStandardMaterial({
      map: mainCodeTexture,
      roughness: 0.18,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: mainCodeTexture,
      emissiveIntensity: 0.85,
    });

    const sideScreenMat = new THREE.MeshStandardMaterial({
      map: sideCodeTexture,
      roughness: 0.18,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: sideCodeTexture,
      emissiveIntensity: 0.75,
    });

    // =========================================================================
    //  1. EXECUTIVE WORKSPACE DESK & MOTORS
    // =========================================================================
    const deskGroup = new THREE.Group();
    workspaceGroup.add(deskGroup);

    // Main Desktop Slab (Wide & Deep)
    const topGeo = new THREE.BoxGeometry(3.9, 0.09, 2.0);
    const topMesh = new THREE.Mesh(topGeo, deskMat);
    topMesh.position.set(0, 0, 0);
    deskGroup.add(topMesh);

    // Front Chamfered LED Light Strip
    const frontGlowGeo = new THREE.BoxGeometry(3.88, 0.015, 0.015);
    const frontGlowMesh = new THREE.Mesh(frontGlowGeo, accentMat);
    frontGlowMesh.position.set(0, -0.045, 1.0);
    deskGroup.add(frontGlowMesh);

    // Back Underglow LED Strip
    const backGlowGeo = new THREE.BoxGeometry(3.88, 0.015, 0.015);
    const backGlowMesh = new THREE.Mesh(backGlowGeo, secondaryAccentMat);
    backGlowMesh.position.set(0, -0.045, -0.99);
    deskGroup.add(backGlowMesh);

    // Motorized Dual Trestle Legs & Floor Feet
    const legGeo = new THREE.BoxGeometry(0.09, 1.35, 0.09);
    const footGeo = new THREE.BoxGeometry(0.12, 0.06, 1.5);

    const leftLeg = new THREE.Mesh(legGeo, metalFrameMat);
    leftLeg.position.set(-1.72, -0.72, 0);
    deskGroup.add(leftLeg);
    const leftFoot = new THREE.Mesh(footGeo, metalFrameMat);
    leftFoot.position.set(-1.72, -1.38, 0);
    deskGroup.add(leftFoot);

    const rightLeg = new THREE.Mesh(legGeo, metalFrameMat);
    rightLeg.position.set(1.72, -0.72, 0);
    deskGroup.add(rightLeg);
    const rightFoot = new THREE.Mesh(footGeo, metalFrameMat);
    rightFoot.position.set(1.72, -1.38, 0);
    deskGroup.add(rightFoot);

    // Large Extended Seamless Desk Pad
    const padGeo = new THREE.BoxGeometry(3.0, 0.012, 1.25);
    const padMesh = new THREE.Mesh(padGeo, deskPadMat);
    padMesh.position.set(-0.15, 0.048, 0.2);
    deskGroup.add(padMesh);

    // =========================================================================
    //  2. DUAL MONITORS, LAPTOP & STUDIO MONITORS
    // =========================================================================
    // --- Primary Ultrawide 34" Monitor ---
    const mainScreenGroup = new THREE.Group();
    mainScreenGroup.position.set(-0.05, 0.72, -0.32);
    deskGroup.add(mainScreenGroup);

    // Bezel Frame
    const screenFrameGeo = new THREE.BoxGeometry(2.05, 1.22, 0.06);
    const screenFrameMesh = new THREE.Mesh(screenFrameGeo, metalFrameMat);
    mainScreenGroup.add(screenFrameMesh);

    // Display Surface
    const screenGeo = new THREE.PlaneGeometry(1.95, 1.12);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, 0.032);
    mainScreenGroup.add(screenMesh);

    // Screen Lightbar (Overhead monitor lamp)
    const lightBarGeo = new THREE.BoxGeometry(1.4, 0.03, 0.06);
    const lightBarMesh = new THREE.Mesh(lightBarGeo, accentMat);
    lightBarMesh.position.set(0, 0.63, 0.05);
    mainScreenGroup.add(lightBarMesh);

    // Monitor Arm Heavy-Duty Stand
    const standStemGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.75, 16);
    const standStem = new THREE.Mesh(standStemGeo, metalFrameMat);
    standStem.position.set(0, -0.38, -0.16);
    mainScreenGroup.add(standStem);

    const standBaseGeo = new THREE.BoxGeometry(0.5, 0.025, 0.38);
    const standBase = new THREE.Mesh(standBaseGeo, metalFrameMat);
    standBase.position.set(0, -0.71, -0.1);
    mainScreenGroup.add(standBase);

    // --- Secondary Vertical 27" Pivot Monitor (Angled on Left) ---
    const sideScreenGroup = new THREE.Group();
    sideScreenGroup.position.set(-1.42, 0.76, -0.15);
    sideScreenGroup.rotation.y = Math.PI / 6.5;
    deskGroup.add(sideScreenGroup);

    const sideFrameGeo = new THREE.BoxGeometry(0.82, 1.34, 0.05);
    const sideFrameMesh = new THREE.Mesh(sideFrameGeo, metalFrameMat);
    sideScreenGroup.add(sideFrameMesh);

    const sideScreenGeo = new THREE.PlaneGeometry(0.74, 1.24);
    const sideScreenMesh = new THREE.Mesh(sideScreenGeo, sideScreenMat);
    sideScreenMesh.position.set(0, 0, 0.027);
    sideScreenGroup.add(sideScreenMesh);

    const sideStemGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.75, 16);
    const sideStem = new THREE.Mesh(sideStemGeo, metalFrameMat);
    sideStem.position.set(0, -0.42, -0.12);
    sideScreenGroup.add(sideStem);

    // --- Studio Speakers (Left & Right of Main Display) ---
    const createSpeaker = (x: number, angle: number) => {
      const spkGroup = new THREE.Group();
      spkGroup.position.set(x, 0.28, -0.22);
      spkGroup.rotation.y = angle;

      const spkBodyGeo = new THREE.BoxGeometry(0.28, 0.44, 0.26);
      const spkBody = new THREE.Mesh(spkBodyGeo, pcCaseMat);
      spkGroup.add(spkBody);

      // Woofer Cone
      const wooferGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.02, 16);
      wooferGeo.rotateX(Math.PI / 2);
      const woofer = new THREE.Mesh(wooferGeo, speakerConeMat);
      woofer.position.set(0, -0.06, 0.135);
      spkGroup.add(woofer);

      // Tweeter
      const tweeterGeo = new THREE.SphereGeometry(0.03, 12, 12);
      const tweeter = new THREE.Mesh(tweeterGeo, metalFrameMat);
      tweeter.position.set(0, 0.12, 0.135);
      spkGroup.add(tweeter);

      return spkGroup;
    };

    deskGroup.add(createSpeaker(-0.95, Math.PI / 8));
    deskGroup.add(createSpeaker(0.85, -Math.PI / 8));

    // =========================================================================
    //  3. HIGH-PERFORMANCE WORKSTATION PC TOWER (Right Side)
    // =========================================================================
    const pcGroup = new THREE.Group();
    pcGroup.position.set(1.48, 0.48, 0.05);
    pcGroup.rotation.y = -Math.PI / 12;
    deskGroup.add(pcGroup);

    // Main Chassis
    const pcGeo = new THREE.BoxGeometry(0.42, 0.85, 0.72);
    const pcMesh = new THREE.Mesh(pcGeo, pcCaseMat);
    pcGroup.add(pcMesh);

    // Tempered Glass Window
    const glassGeo = new THREE.PlaneGeometry(0.68, 0.8);
    const glassMesh = new THREE.Mesh(glassGeo, pcGlassMat);
    glassMesh.position.set(-0.212, 0, 0);
    glassMesh.rotation.y = -Math.PI / 2;
    pcGroup.add(glassMesh);

    // Internal RGB GPU & Liquid Cooling Fan Ring
    const gpuGeo = new THREE.BoxGeometry(0.12, 0.14, 0.45);
    const gpuMesh = new THREE.Mesh(gpuGeo, accentMat);
    gpuMesh.position.set(-0.05, 0, 0.02);
    pcGroup.add(gpuMesh);

    const fanRingGeo = new THREE.TorusGeometry(0.09, 0.015, 12, 24);
    const fanRing1 = new THREE.Mesh(fanRingGeo, accentMat);
    fanRing1.position.set(-0.08, 0.22, -0.12);
    fanRing1.rotation.y = -Math.PI / 2;
    pcGroup.add(fanRing1);

    const fanRing2 = new THREE.Mesh(fanRingGeo, secondaryAccentMat);
    fanRing2.position.set(-0.08, 0.22, 0.12);
    fanRing2.rotation.y = -Math.PI / 2;
    pcGroup.add(fanRing2);

    // =========================================================================
    //  4. KEYBOARD, MOUSE, MIC ARM & ACCESSORIES
    // =========================================================================
    // Mechanical Keyboard (75% compact layout)
    const kbGeo = new THREE.BoxGeometry(0.96, 0.038, 0.36);
    const kbMesh = new THREE.Mesh(kbGeo, metalFrameMat);
    kbMesh.position.set(-0.1, 0.065, 0.32);
    deskGroup.add(kbMesh);

    // Keycaps with Theme Glow
    const keyGeo = new THREE.BoxGeometry(0.9, 0.02, 0.3);
    const keyMesh = new THREE.Mesh(keyGeo, accentMat);
    keyMesh.position.set(-0.1, 0.085, 0.32);
    deskGroup.add(keyMesh);

    // Precision Ergonomic Wireless Mouse
    const mouseGeo = new THREE.SphereGeometry(0.06, 16, 12);
    mouseGeo.scale(0.85, 0.45, 1.25);
    const mouseMesh = new THREE.Mesh(mouseGeo, metalFrameMat);
    mouseMesh.position.set(0.62, 0.075, 0.36);
    deskGroup.add(mouseMesh);

    // Ceramic Developer Mug / Thermos
    const mugGeo = new THREE.CylinderGeometry(0.07, 0.065, 0.16, 16);
    const mugMesh = new THREE.Mesh(mugGeo, bodyMat);
    mugMesh.position.set(0.98, 0.13, 0.12);
    deskGroup.add(mugMesh);

    // =========================================================================
    //  5. ERGONOMIC HIGH-BACK CHAIR & SEATED DEVELOPER
    // =========================================================================
    const charGroup = new THREE.Group();
    charGroup.position.set(-0.1, 0, 0.92);
    workspaceGroup.add(charGroup);

    // --- Chair Base & Frame ---
    // Contoured Seat Base
    const seatGeo = new THREE.BoxGeometry(1.05, 0.11, 0.95);
    const seatMesh = new THREE.Mesh(seatGeo, bodyMat);
    seatMesh.position.set(0, 0.12, 0);
    charGroup.add(seatMesh);

    // High Mesh Lumbar Backrest
    const backGeo = new THREE.BoxGeometry(0.92, 1.2, 0.1);
    const backMesh = new THREE.Mesh(backGeo, bodyMat);
    backMesh.position.set(0, 0.76, 0.45);
    backMesh.rotation.x = -Math.PI / 22;
    charGroup.add(backMesh);

    // Adjustable Headrest
    const headrestGeo = new THREE.BoxGeometry(0.55, 0.24, 0.085);
    const headrestMesh = new THREE.Mesh(headrestGeo, bodyMat);
    headrestMesh.position.set(0, 1.42, 0.5);
    charGroup.add(headrestMesh);

    // Chair Gas Lift Cylinder & Castor Base
    const chairStemGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 16);
    const chairStem = new THREE.Mesh(chairStemGeo, metalFrameMat);
    chairStem.position.set(0, -0.22, 0);
    charGroup.add(chairStem);

    const baseWheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.045, 5);
    const baseWheel = new THREE.Mesh(baseWheelGeo, metalFrameMat);
    baseWheel.position.set(0, -0.52, 0);
    charGroup.add(baseWheel);

    // 3D Armrests
    const armrestGeo = new THREE.BoxGeometry(0.09, 0.045, 0.48);
    const leftArmrest = new THREE.Mesh(armrestGeo, metalFrameMat);
    leftArmrest.position.set(-0.52, 0.38, 0.06);
    charGroup.add(leftArmrest);

    const rightArmrest = new THREE.Mesh(armrestGeo, metalFrameMat);
    rightArmrest.position.set(0.52, 0.38, 0.06);
    charGroup.add(rightArmrest);

    // --- Developer Character Figure ---
    // Torso (Modern Developer Crewneck/Hoodie)
    const torsoGeo = new THREE.BoxGeometry(0.78, 0.9, 0.45);
    const torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    torsoMesh.position.set(0, 0.62, 0.18);
    torsoMesh.rotation.x = Math.PI / 30; // Natural engaged typing posture
    charGroup.add(torsoMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.16, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, 1.12, 0.16);
    charGroup.add(neckMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.26, 20, 20);
    headGeo.scale(1, 1.15, 1.05);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(0, 1.34, 0.16);
    charGroup.add(headMesh);

    // Modern Stylized Haircut
    const hairGeo = new THREE.SphereGeometry(0.28, 16, 16);
    hairGeo.scale(1.02, 0.78, 1.1);
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(0, 1.48, 0.14);
    charGroup.add(hairMesh);

    // Studio Wireless Headphones (Band + Glowing Earcups)
    const bandGeo = new THREE.TorusGeometry(0.28, 0.028, 12, 24, Math.PI);
    const bandMesh = new THREE.Mesh(bandGeo, headphoneMat);
    bandMesh.position.set(0, 1.36, 0.16);
    bandMesh.rotation.set(0, Math.PI / 2, 0);
    charGroup.add(bandMesh);

    const earcupGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.065, 16);
    const leftEarcup = new THREE.Mesh(earcupGeo, accentMat);
    leftEarcup.position.set(-0.27, 1.34, 0.16);
    leftEarcup.rotation.z = Math.PI / 2;
    charGroup.add(leftEarcup);

    const rightEarcup = new THREE.Mesh(earcupGeo, accentMat);
    rightEarcup.position.set(0.27, 1.34, 0.16);
    rightEarcup.rotation.z = Math.PI / 2;
    charGroup.add(rightEarcup);

    // Left Arm & Forearm extending to Keyboard
    const leftArmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.58, 12);
    const leftArm = new THREE.Mesh(leftArmGeo, bodyMat);
    leftArm.position.set(-0.41, 0.62, -0.06);
    leftArm.rotation.set(Math.PI / 3.8, 0, Math.PI / 16);
    charGroup.add(leftArm);

    const leftForearmGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.52, 12);
    const leftForearm = new THREE.Mesh(leftForearmGeo, skinMat);
    leftForearm.position.set(-0.28, 0.34, -0.34);
    leftForearm.rotation.set(Math.PI / 2.2, 0, -Math.PI / 7.5);
    charGroup.add(leftForearm);

    // Right Arm & Hand resting on Mouse / Right Keypad
    const rightArmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.58, 12);
    const rightArm = new THREE.Mesh(rightArmGeo, bodyMat);
    rightArm.position.set(0.41, 0.62, -0.06);
    rightArm.rotation.set(Math.PI / 3.8, 0, -Math.PI / 16);
    charGroup.add(rightArm);

    const rightForearmGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.52, 12);
    const rightForearm = new THREE.Mesh(rightForearmGeo, skinMat);
    rightForearm.position.set(0.35, 0.34, -0.34);
    rightForearm.rotation.set(Math.PI / 2.2, 0, Math.PI / 7.5);
    charGroup.add(rightForearm);

    // =========================================================================
    //  6. FLOATING HOLOGRAPHIC TECH PILLS & CLOUD NODES
    // =========================================================================
    const holoGroup = new THREE.Group();
    workspaceGroup.add(holoGroup);

    // Floating Polyhedral Holographic Nodes
    const holoGeo1 = new THREE.OctahedronGeometry(0.16);
    const holoMesh1 = new THREE.Mesh(holoGeo1, accentMat);
    holoMesh1.position.set(1.65, 1.55, -0.15);
    holoGroup.add(holoMesh1);

    const holoGeo2 = new THREE.TetrahedronGeometry(0.14);
    const holoMesh2 = new THREE.Mesh(holoGeo2, secondaryAccentMat);
    holoMesh2.position.set(-1.75, 1.45, 0.35);
    holoGroup.add(holoMesh2);

    const holoGeo3 = new THREE.IcosahedronGeometry(0.12);
    const holoMesh3 = new THREE.Mesh(holoGeo3, accentMat);
    holoMesh3.position.set(0.95, 1.95, -0.45);
    holoGroup.add(holoMesh3);

    // Ambient Floating Data Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 5.0;
      posArray[i + 1] = Math.random() * 3.6 - 0.6;
      posArray[i + 2] = (Math.random() - 0.5) * 4.0;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      color: currentTheme.threeLight.particleColor,
      transparent: true,
      opacity: isDark ? 0.7 : 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    workspaceGroup.add(particles);

    // =========================================================================
    //  INTERACTION & ANIMATION LOOP (Camera Parallax + Living Motion)
    // =========================================================================
    let targetRotX = 0.04;
    let targetRotY = -0.25; // Balanced 3/4 cinematic angle
    let currentRotX = targetRotX;
    let currentRotY = targetRotY;
    let clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = -0.25 + x * 0.42;
      targetRotX = 0.04 - y * 0.22;
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
        torsoMesh.position.y = 0.62 + Math.sin(elapsedTime * 1.8) * 0.008;
        headMesh.position.y = 1.34 + Math.sin(elapsedTime * 1.8) * 0.01;
        hairMesh.position.y = 1.48 + Math.sin(elapsedTime * 1.8) * 0.01;
        bandMesh.position.y = 1.36 + Math.sin(elapsedTime * 1.8) * 0.01;
        leftEarcup.position.y = 1.34 + Math.sin(elapsedTime * 1.8) * 0.01;
        rightEarcup.position.y = 1.34 + Math.sin(elapsedTime * 1.8) * 0.01;

        // Subtle Keyboard Underglow Pulse
        keyMesh.position.y = 0.085 + Math.sin(elapsedTime * 4) * 0.003;

        // Floating Tech Holograms Motion
        holoMesh1.rotation.y += 0.016;
        holoMesh1.position.y = 1.55 + Math.sin(elapsedTime * 2 + 1) * 0.04;
        holoMesh2.rotation.x += 0.018;
        holoMesh2.position.y = 1.45 + Math.cos(elapsedTime * 1.6 + 2) * 0.04;
        holoMesh3.rotation.z += 0.022;
        holoMesh3.position.y = 1.95 + Math.sin(elapsedTime * 1.4 + 3) * 0.04;

        // Floating Ambient Dust Rise
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
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[650px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    />
  );
}
