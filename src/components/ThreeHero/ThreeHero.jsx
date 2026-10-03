import { useEffect, useRef } from "react";
import { isWebGLAvailable, createHeroScene } from "./scene";
import { createAnimationController } from "./animation";
import { onLenisScroll } from "../../utils/lenis";

/**
 * ThreeHero Component
 *
 * Renders an abstract, lightweight developer particle field behind the Hero section.
 * - Sits behind text with pointer-events-none (never blocks clicks/selection).
 * - Pauses rendering when scrolled out of view via IntersectionObserver.
 * - Pauses rendering when tab is hidden via visibilitychange.
 * - Adapts particle count for mobile devices.
 * - Respects prefers-reduced-motion.
 * - Gracefully falls back to nothing if WebGL is unavailable.
 */
export const ThreeHero = ({ darkMode }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneManagerRef = useRef(null);
  const animControllerRef = useRef(null);

  useEffect(() => {
    // 1. Graceful fallback if WebGL is not supported
    if (!isWebGLAvailable()) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 2. Initialize Three.js Scene
    const sceneManager = createHeroScene(canvas, isMobile, darkMode);
    sceneManagerRef.current = sceneManager;

    // 3. Initialize Animation & Parallax Controller
    const animController = createAnimationController({
      scene: sceneManager.scene,
      camera: sceneManager.camera,
      renderer: sceneManager.renderer,
      particles: sceneManager.particles,
      lines: sceneManager.lines,
      prefersReducedMotion,
    });
    animControllerRef.current = animController;

    // Render initial frame
    animController.renderFrame();
    animController.start();

    // 4. Mouse movement tracking for subtle parallax
    const handleMouseMove = (e) => {
      animController.onMouseMove(e);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 5. Connect to Lenis smooth scroll for scroll parallax
    const unsubscribeScroll = onLenisScroll(({ scroll }) => {
      animController.onScroll(scroll);
    });

    // 6. Viewport Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      sceneManager.onResize(width, height);
      animController.renderFrame();
    };
    window.addEventListener("resize", handleResize);

    // 7. IntersectionObserver: Stop animation loop when scrolled past Hero
    let observer = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animController.start();
            } else {
              animController.stop();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    // 8. Visibility change: Stop animation when user switches browser tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        animController.stop();
      } else {
        animController.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 9. Cleanup on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      unsubscribeScroll();
      if (observer && container) {
        observer.unobserve(container);
        observer.disconnect();
      }

      animController.stop();
      sceneManager.dispose();
      sceneManagerRef.current = null;
      animControllerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Three.js materials when user toggles dark/light mode
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.updateTheme(darkMode);
      animControllerRef.current?.renderFrame();
    }
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70 dark:opacity-85 transition-opacity duration-700"
      />
    </div>
  );
};
