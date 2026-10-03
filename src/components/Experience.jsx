import { useEffect, useRef } from "react";
import { gsap } from "../utils/lenis";

export const Experience = ({ darkMode }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const responsibilities = [
    "Developed and maintained frontend screens using Angular and TypeScript.",
    "Worked with REST APIs and .NET backend services.",
    "Built and modified SQL queries and stored procedures.",
    "Worked with SQL Server for application data and reporting.",
    "Implemented data-driven forms, grids and dashboards.",
    "Worked with Excel import/export functionality.",
    "Integrated frontend applications with backend APIs.",
    "Worked with authentication/session-based application flows.",
    "Fixed UI, API, database and integration issues across the application stack.",
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0.3, y: 50, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-24 border-t border-zinc-200/60 dark:border-zinc-800/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            01.5 // Roles
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              darkMode ? "text-zinc-100" : "text-zinc-900"
            }`}
          >
            Experience
          </h2>
        </div>

        <div
          ref={cardRef}
          className={`p-7 sm:p-8 rounded-2xl border transition-all will-change-transform ${
            darkMode
              ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700/80 shadow-lg shadow-black/20"
              : "bg-white border-zinc-200 hover:border-zinc-300 shadow-md shadow-zinc-200/40"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}
            >
              Software Developer
            </h3>
            <span
              className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                darkMode
                  ? "bg-zinc-800/70 border-zinc-700 text-zinc-300"
                  : "bg-zinc-100 border-zinc-200 text-zinc-700"
              }`}
            >
              Web Application Development
            </span>
          </div>

          <p
            className={`text-sm sm:text-base leading-relaxed mb-6 font-medium ${
              darkMode ? "text-zinc-300" : "text-zinc-700"
            }`}
          >
            Worked on web applications using Angular, TypeScript, ASP.NET / ASP.NET Core, C#, SQL Server and stored procedures.
          </p>

          <ul className="space-y-3">
            {responsibilities.map((bullet, index) => (
              <li
                key={index}
                className={`text-sm leading-relaxed flex items-start gap-3 ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                <span className="text-emerald-500 mt-1 select-none font-mono text-xs">
                  ▹
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
