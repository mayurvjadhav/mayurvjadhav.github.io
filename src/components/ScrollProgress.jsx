import { useEffect, useState } from "react";
import { onLenisScroll } from "../utils/lenis";

/**
 * ScrollProgress Component
 *
 * Renders a razor-thin, subtle progress bar at the very top of the viewport.
 * Uses hardware-accelerated scaleX driven by Lenis scroll progress.
 */
export const ScrollProgress = ({ darkMode }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = onLenisScroll(({ progress }) => {
      setProgress(progress || 0);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[70] pointer-events-none"
    >
      <div
        className={`h-full w-full origin-left transition-transform duration-75 ease-out ${
          darkMode
            ? "bg-gradient-to-r from-zinc-500 via-sky-400 to-emerald-400"
            : "bg-gradient-to-r from-zinc-400 via-sky-500 to-emerald-500"
        }`}
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
};
