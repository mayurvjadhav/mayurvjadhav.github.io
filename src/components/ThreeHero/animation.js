/**
 * Three.js Animation & Parallax Controller
 *
 * Concepts explained:
 * 1. Linear Interpolation (Lerp):
 *    current += (target - current) * factor
 *    Creates fluid, natural deceleration when the mouse stops moving or scrolling.
 * 2. Parallax:
 *    Adjusts camera angle and position based on mouse and Lenis scroll progress.
 * 3. Restrained Idle Drift:
 *    A gentle sine wave ensures the scene feels alive even when idle.
 * 4. RequestAnimationFrame (RAF):
 *    Syncs updates to the display refresh rate (typically 60Hz or 120Hz).
 */

export const createAnimationController = ({
  scene,
  camera,
  renderer,
  particles,
  lines,
  prefersReducedMotion,
}) => {
  let animationFrameId = null;
  let isRunning = false;

  // Normalized mouse coordinates [-1, 1]
  const mouse = {
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  };

  // Scroll offset state (smoothed with lerp)
  let targetScroll = 0;
  let currentScroll = 0;
  let clockTime = 0;

  /**
   * Update mouse target from pointer events
   */
  const onMouseMove = (event) => {
    if (prefersReducedMotion) return;
    const { innerWidth, innerHeight } = window;
    mouse.targetX = (event.clientX / innerWidth) * 2 - 1;
    mouse.targetY = -(event.clientY / innerHeight) * 2 + 1;
  };

  /**
   * Update scroll offset from Lenis
   */
  const onScroll = (currentScrollY) => {
    // Normalize scroll progress across the hero exit range (0 to 700px)
    targetScroll = Math.min((currentScrollY || 0) / 600, 2.0);
  };

  /**
   * Render a single frame (useful for initial render or reduced motion)
   */
  const renderFrame = () => {
    renderer.render(scene, camera);
  };

  /**
   * The animation tick loop
   */
  const tick = () => {
    if (!isRunning) return;

    clockTime += 0.01;

    // 1. Smoothly interpolate mouse movement (lerp)
    mouse.currentX += (mouse.targetX - mouse.currentX) * 0.04;
    mouse.currentY += (mouse.targetY - mouse.currentY) * 0.04;

    // 2. Smoothly interpolate scroll progress for silky camera/particle parallax
    currentScroll += (targetScroll - currentScroll) * 0.06;

    // 3. Gentle idle drift (subtle sine oscillation)
    const idleY = Math.sin(clockTime * 0.4) * 0.003;
    const idleX = Math.cos(clockTime * 0.3) * 0.003;

    // 4. Camera orientation: subtle mouse parallax + subtle scroll tilt
    camera.rotation.y = -mouse.currentX * 0.08 + idleX;
    camera.rotation.x = mouse.currentY * 0.05 + idleY - currentScroll * 0.03;

    // 5. Camera position: subtle forward depth push into the particle field as user scrolls
    camera.position.z = 16 - currentScroll * 1.5;
    camera.position.y = -currentScroll * 0.6;

    // 6. Particle field vertical parallax (drifts upward differently than the DOM)
    const scrollOffsetY = currentScroll * 3.2;
    particles.position.y = scrollOffsetY;
    if (lines) {
      lines.position.y = scrollOffsetY;
    }

    // 7. Very slow, elegant particle field spin
    particles.rotation.y = clockTime * 0.02;
    if (lines) {
      lines.rotation.y = clockTime * 0.02;
    }

    // 8. Draw to canvas
    renderer.render(scene, camera);

    animationFrameId = requestAnimationFrame(tick);
  };

  /**
   * Start the RAF loop
   */
  const start = () => {
    if (isRunning) return;
    isRunning = true;
    if (prefersReducedMotion) {
      renderFrame();
      return;
    }
    animationFrameId = requestAnimationFrame(tick);
  };

  /**
   * Pause the RAF loop (e.g. when hero scrolls off-screen or tab is hidden)
   */
  const stop = () => {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  return {
    onMouseMove,
    onScroll,
    start,
    stop,
    renderFrame,
  };
};
