import { useEffect, useRef } from "react";
import { gsap } from "../utils/lenis";

export const Education = ({ darkMode }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  const educationList = [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Yashwantrao Chavan Maharashtra Open University (YCMOU), Nashik",
      duration: "2022 – 2025",
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "Tilak Maharashtra Vidyapeeth (Tilak University), Pune",
      duration: "2019 – 2022",
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0.3, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-18 border-t border-zinc-200/60 dark:border-zinc-800/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2
          className={`text-xl sm:text-2xl font-bold tracking-tight mb-6 ${
            darkMode ? "text-zinc-100" : "text-zinc-900"
          }`}
        >
          Education
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {educationList.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border transition-all will-change-transform ${
                darkMode
                  ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700/80 hover:shadow-lg hover:shadow-black/20"
                  : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/40"
              }`}
            >
              <h3
                className={`font-semibold text-base mb-1 ${
                  darkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {item.degree}
              </h3>
              <p
                className={`text-sm mb-3 ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {item.institution}
              </p>
              <span
                className={`text-xs font-mono font-medium px-2 py-0.5 rounded border ${
                  darkMode
                    ? "bg-zinc-800/80 border-zinc-700 text-zinc-400"
                    : "bg-zinc-100 border-zinc-200 text-zinc-600"
                }`}
              >
                {item.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
