import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Centralized Lenis & GSAP ScrollTrigger Integration
 *
 * Architecture:
 * Lenis (Smooth Scroll Engine)
 *   ↓
 * GSAP Ticker (drives Lenis RAF at 60/120fps with zero competing loops)
 *   ↓
 * ScrollTrigger.update (scrubs timelines in real time, bi-directionally)
 *   ↓
 * UI Components & Three.js (scrubbed animations that reverse on scroll up)
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance = null;
let tickerFunction = null;
const scrollCallbacks = new Set();

export const initLenis = () => {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  lenisInstance = new Lenis({
    duration: prefersReducedMotion ? 0 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
  });

  window.__lenis = lenisInstance;

  // 1. When Lenis scrolls, notify ScrollTrigger and all registered callbacks
  lenisInstance.on("scroll", (e) => {
    ScrollTrigger.update();
    scrollCallbacks.forEach((cb) => {
      try {
        cb(e);
      } catch (err) {
        console.error("Scroll callback error:", err);
      }
    });
  });

  // 2. Drive Lenis via GSAP's master ticker (eliminates duplicate requestAnimationFrame loops)
  tickerFunction = (time) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFunction);
  gsap.ticker.lagSmoothing(0);

  // 3. Initial hash navigation
  if (window.location.hash) {
    const hash = window.location.hash;
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el && lenisInstance) {
        lenisInstance.scrollTo(el, { offset: -70 });
      }
    }, 200);
  }

  // Refresh ScrollTrigger after DOM has mounted
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

/**
 * Subscribe to scroll updates
 */
export const onLenisScroll = (callback) => {
  scrollCallbacks.add(callback);

  const scroll = lenisInstance?.scroll ?? window.scrollY ?? 0;
  const limit =
    lenisInstance?.limit ??
    (document.documentElement.scrollHeight - window.innerHeight);
  const progress = limit > 0 ? scroll / limit : 0;
  callback({ scroll, limit, progress, velocity: 0 });

  return () => {
    scrollCallbacks.delete(callback);
  };
};

/**
 * Smoothly scroll to an anchor selector or DOM element
 */
export const scrollToTarget = (target, offset = -70) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.15 });
  } else {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }
};

export const destroyLenis = () => {
  if (tickerFunction) {
    gsap.ticker.remove(tickerFunction);
    tickerFunction = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
    delete window.__lenis;
  }
};

export { gsap, ScrollTrigger };
