import { useEffect, useRef, useState } from "react";
import { gsap } from "../utils/lenis";

/**
 * About Section — Pinned Story Sequence
 *
 * Pins the section while vertical scroll scrub controls a progressive narrative:
 * Beat 1: Identity & Origins (Maharashtra, India)
 * Beat 2: Full Stack Harmony (Frontend, Backend, Database)
 * Beat 3: Production Focus (APIs, SQL Server, Stored Procedures, Real-world systems)
 */
export const About = ({ darkMode }) => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const beat1Ref = useRef(null);
  const beat2Ref = useRef(null);
  const beat3Ref = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    // On mobile or reduced motion, simple static display without pinning
    if (prefersReducedMotion || isMobile) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=180%",
          pin: pinRef.current,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) setActiveStep(0);
            else if (p < 0.66) setActiveStep(1);
            else setActiveStep(2);
          },
        },
      });

      // Initially set beat 2 and 3 invisible and lower
      gsap.set(beat2Ref.current, { autoAlpha: 0, y: 40 });
      gsap.set(beat3Ref.current, { autoAlpha: 0, y: 40 });

      // Timeline sequence: Beat 1 exits -> Beat 2 enters & exits -> Beat 3 enters
      tl
        // Hold Beat 1 slightly
        .to({}, { duration: 0.5 })
        // Transition Beat 1 out
        .to(beat1Ref.current, { autoAlpha: 0, y: -40, duration: 1, ease: "power1.inOut" })
        // Transition Beat 2 in
        .to(beat2Ref.current, { autoAlpha: 1, y: 0, duration: 1, ease: "power1.inOut" }, "-=0.3")
        // Hold Beat 2
        .to({}, { duration: 0.8 })
        // Transition Beat 2 out
        .to(beat2Ref.current, { autoAlpha: 0, y: -40, duration: 1, ease: "power1.inOut" })
        // Transition Beat 3 in
        .to(beat3Ref.current, { autoAlpha: 1, y: 0, duration: 1, ease: "power1.inOut" }, "-=0.3")
        // Hold Beat 3 before unpinning
        .to({}, { duration: 0.8 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative border-t border-zinc-200/60 dark:border-zinc-800/80"
    >
      {/* Pinned Stage */}
      <div
        ref={pinRef}
        className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto px-4 sm:px-6 py-20"
      >
        {/* Section Header with Step Indicators */}
        <div className="flex items-center justify-between gap-4 mb-12 border-b border-zinc-200/60 dark:border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              01 // Story
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <h2
              className={`text-sm font-semibold tracking-wide uppercase ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Who I Am
            </h2>
          </div>

          {/* Desktop scroll beat indicator */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs">
            {["Origins", "Stack", "Focus"].map((step, idx) => (
              <span
                key={step}
                className={`px-2 py-0.5 rounded transition-all duration-300 ${
                  activeStep === idx
                    ? darkMode
                      ? "bg-zinc-800 text-white border border-zinc-700"
                      : "bg-zinc-200 text-zinc-900 border border-zinc-300"
                    : darkMode
                    ? "text-zinc-600"
                    : "text-zinc-400"
                }`}
              >
                0{idx + 1} {step}
              </span>
            ))}
          </div>
        </div>

        {/* Narrative Beats Container */}
        <div className="relative min-h-[300px] flex items-center">
          {/* Beat 1 */}
          <div
            ref={beat1Ref}
            className="md:absolute inset-0 flex flex-col justify-center"
          >
            <span className="text-xs font-mono text-zinc-500 mb-3 block">
              Background & Location
            </span>
            <p
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug mb-5 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}
            >
              I&apos;m a Full Stack Web Developer from Maharashtra, India.
            </p>
            <p
              className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              I work with modern JavaScript ecosystems as well as Angular and .NET,
              creating connected applications where client, server and database operate as one coherent system.
            </p>
          </div>

          {/* Beat 2 */}
          <div
            ref={beat2Ref}
            className="md:absolute inset-0 flex flex-col justify-center mt-12 md:mt-0"
          >
            <span className="text-xs font-mono text-zinc-500 mb-3 block">
              Technical Spectrum
            </span>
            <p
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug mb-5 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}
            >
              Frontend, Backend and Databases working together seamlessly.
            </p>
            <p
              className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Comfortable moving across React and Angular user interfaces, building C# ASP.NET Core & Node.js REST APIs,
              and ensuring clean data schemas across SQL Server and MongoDB.
            </p>
          </div>

          {/* Beat 3 */}
          <div
            ref={beat3Ref}
            className="md:absolute inset-0 flex flex-col justify-center mt-12 md:mt-0"
          >
            <span className="text-xs font-mono text-zinc-500 mb-3 block">
              Production Experience
            </span>
            <p
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug mb-5 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}
            >
              Practical systems, stored procedures & data-driven interfaces.
            </p>
            <p
              className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Most of my recent work involves web applications, APIs, SQL Server stored procedures,
              and data-rich dashboards. Outside of work, I continually build personal projects to sharpen my craft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
