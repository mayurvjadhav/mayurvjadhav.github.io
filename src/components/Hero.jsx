import { useEffect, useRef } from "react";
import { ThreeHero } from "./ThreeHero/ThreeHero";
import { scrollToTarget, gsap } from "../utils/lenis";

export const Hero = ({ darkMode }) => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Timeline scrubbed directly to scroll position
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8, // Silky smooth two-way scrubbing
          },
        })
        .to(badgeRef.current, { y: -70, opacity: 0, ease: "power1.in" }, 0)
        .to(titleRef.current, { y: -90, scale: 0.96, ease: "none" }, 0)
        .to(subtitleRef.current, { y: -65, ease: "none" }, 0)
        .to(textRef.current, { y: -45, opacity: 0.35, ease: "none" }, 0)
        .to(ctaRef.current, { y: -25, opacity: 0.6, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Subtle Three.js developer particle field behind hero */}
      <ThreeHero darkMode={darkMode} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        {/* Availability Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6 border transition-colors bg-zinc-100/60 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 will-change-transform"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            Open to full-time software development opportunities
          </span>
        </div>

        {/* Hero Title & Subheading */}
        <h1
          ref={titleRef}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 will-change-transform origin-left ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}
        >
          Hi, I&apos;m Mayur.
        </h1>

        <h2
          ref={subtitleRef}
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 will-change-transform ${
            darkMode ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          Full Stack Web Developer
        </h2>

        {/* Supporting Copy */}
        <p
          ref={textRef}
          className={`text-base sm:text-lg md:text-xl leading-relaxed mb-9 max-w-2xl will-change-transform ${
            darkMode ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          I build web applications using React, Angular, Node.js, .NET and SQL.
          I work across frontend, backend and databases, building practical web applications and APIs.
        </p>

        {/* CTAs and Links */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-3.5 will-change-transform"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#projects");
            }}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              darkMode
                ? "bg-zinc-100 text-zinc-900 hover:bg-white"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            View Projects
          </a>

          <a
            href="https://drive.google.com/file/d/12_dvFsV0u2VTQSSbMthTq0TyH-CifUtn/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
              darkMode
                ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            Resume ↗
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href="https://github.com/mayurvjadhav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className={`p-2.5 rounded-lg border transition-colors ${
                darkMode
                  ? "border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  : "border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              <svg className="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/thatguytime"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={`p-2.5 rounded-lg border transition-colors ${
                darkMode
                  ? "border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  : "border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              <svg className="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
