import * as THREE from "three";

/**
 * Three.js Scene Setup for Developer Particle Field
 *
 * Concepts explained:
 * 1. Scene: The root container holding all 3D objects, lights, and meshes.
 * 2. Camera: PerspectiveCamera with a 60-degree field of view to create natural depth.
 * 3. Renderer: WebGLRenderer that draws the 3D scene onto the HTML5 <canvas>.
 * 4. BufferGeometry: GPU-optimized array of vertex positions (x, y, z).
 * 5. PointsMaterial / LineBasicMaterial: Controls the color, size, and transparency.
 */

// Helper to safely detect WebGL support before initializing
export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

/**
 * Theme color palettes
 * Dark: subtle zinc/slate with faint cyan-emerald developer tone
 * Light: clean graphite/zinc with subtle contrast
 */
export const getThemeColors = (darkMode) => {
  return {
    particleColor: darkMode ? 0x94a3b8 : 0x64748b, // slate-400 / slate-500
    accentColor: darkMode ? 0x38bdf8 : 0x0284c7,   // sky-400 / sky-600
    lineColor: darkMode ? 0x334155 : 0xcbd5e1,     // slate-700 / slate-300
    lineOpacity: darkMode ? 0.35 : 0.45,
    particleOpacity: darkMode ? 0.75 : 0.65,
  };
};

/**
 * Initializes the Three.js scene, camera, renderer, particles, and node lines
 */
export const createHeroScene = (canvas, isMobile, darkMode) => {
  // 1. Scene
  const scene = new THREE.Scene();

  // 2. Camera (field of view, aspect ratio, near clipping, far clipping)
  const camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.z = 16;

  // 3. Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,              // Transparent canvas background
    antialias: !isMobile,     // Antialias on desktop for smooth dots
    powerPreference: "low-power",
  });
  
  // Cap device pixel ratio to 2 to prevent mobile/4K GPU strain
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const colors = getThemeColors(darkMode);

  // 4. Create particle field (BufferGeometry + Points)
  // Fewer particles on mobile for high performance
  const count = isMobile ? 180 : 420;
  const positions = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);

  const primaryCol = new THREE.Color(colors.particleColor);
  const accentCol = new THREE.Color(colors.accentColor);

  // Distribute particles across a wide 3D space
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 28;     // X spread
    positions[i3 + 1] = (Math.random() - 0.5) * 18; // Y spread
    positions[i3 + 2] = (Math.random() - 0.5) * 12; // Z depth

    // Give ~20% of particles a subtle accent color
    const col = Math.random() > 0.8 ? accentCol : primaryCol;
    colorArray[i3] = col.r;
    colorArray[i3 + 1] = col.g;
    colorArray[i3 + 2] = col.b;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colorArray, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.08 : 0.11,
    vertexColors: true,
    transparent: true,
    opacity: colors.particleOpacity,
    sizeAttenuation: true, // Particles further away appear smaller
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // 5. Connecting lines between nearby node clusters (desktop only for performance)
  let lines = null;
  let lineGeometry = null;
  let lineMaterial = null;

  if (!isMobile) {
    const linePositions = [];
    const maxDistance = 3.6;

    // Connect particles that are close to each other
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x1 = positions[i3];
      const y1 = positions[i3 + 1];
      const z1 = positions[i3 + 2];

      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const x2 = positions[j3];
        const y2 = positions[j3 + 1];
        const z2 = positions[j3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }

    if (linePositions.length > 0) {
      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      lineMaterial = new THREE.LineBasicMaterial({
        color: colors.lineColor,
        transparent: true,
        opacity: colors.lineOpacity,
      });

      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);
    }
  }

  // 6. Handle viewport resizing
  const onResize = (width, height) => {
    if (!renderer || !camera) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  // 7. Update theme colors when user toggles dark/light mode
  const updateTheme = (isDark) => {
    const nextColors = getThemeColors(isDark);
    if (particleMaterial) {
      particleMaterial.opacity = nextColors.particleOpacity;
      const prim = new THREE.Color(nextColors.particleColor);
      const acc = new THREE.Color(nextColors.accentColor);
      const colorsAttr = particleGeometry.getAttribute("color");
      if (colorsAttr) {
        for (let i = 0; i < count; i++) {
          const col = Math.random() > 0.8 ? acc : prim;
          colorsAttr.setXYZ(i, col.r, col.g, col.b);
        }
        colorsAttr.needsUpdate = true;
      }
    }
    if (lineMaterial) {
      lineMaterial.color.setHex(nextColors.lineColor);
      lineMaterial.opacity = nextColors.lineOpacity;
    }
  };

  // 8. Disposal / Cleanup: Frees GPU memory to prevent memory leaks
  const dispose = () => {
    particleGeometry.dispose();
    particleMaterial.dispose();
    if (lineGeometry) lineGeometry.dispose();
    if (lineMaterial) lineMaterial.dispose();
    renderer.dispose();
  };

  return {
    scene,
    camera,
    renderer,
    particles,
    lines,
    onResize,
    updateTheme,
    dispose,
  };
};
