import { useEffect, useRef, useState } from "react";
import { gsap } from "../utils/lenis";

export const Skills = ({ darkMode }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      id: "frontend",
      num: "01",
      title: "Frontend",
      description: "Building responsive, maintainable user interfaces with modern frameworks and CSS.",
      skills: [
        "React.js",
        "Angular",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
        "Redux / Redux Toolkit",
        "Axios",
        "Responsive Design",
      ],
    },
    {
      id: "backend",
      num: "02",
      title: "Backend",
      description: "Engineering secure RESTful APIs, business logic and server-side services.",
      skills: [
        "Node.js",
        "Express.js",
        "C#",
        "ASP.NET",
        "ASP.NET Core",
        "REST APIs",
        "JWT / Authentication",
        "Middleware",
        "CORS",
        "Socket.io",
      ],
    },
    {
      id: "databases",
      num: "03",
      title: "Databases",
      description: "Designing relational schemas, stored procedures, data querying and NoSQL stores.",
      skills: [
        "MongoDB",
        "Mongoose",
        "MySQL",
        "SQL Server",
        "Supabase",
      ],
    },
    {
      id: "tools",
      num: "04",
      title: "Tools & Workflow",
      description: "Version control, build tools, API testing and reporting utilities.",
      skills: [
        "Git",
        "GitHub",
        "Vite",
        "Postman",
        "DevExpress",
        "ExcelJS",
        "npm",
      ],
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * skillCategories.length),
              skillCategories.length - 1
            );
            setActiveCategory(index);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [skillCategories.length]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative border-t border-zinc-200/60 dark:border-zinc-800/80 overflow-hidden"
    >
      {/* Desktop Horizontal Pinned Stage */}
      <div className="hidden md:flex flex-col justify-center min-h-screen py-16">
        {/* Fixed Header Bar in Pinned View */}
        <div className="max-w-6xl mx-auto px-6 w-full mb-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                02 // Skills
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs font-mono text-zinc-500">
                Horizontal Scroll Gallery
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}
            >
              Technical Expertise
            </h2>
          </div>

          {/* Category tracker */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {skillCategories.map((cat, idx) => (
              <span
                key={cat.id}
                className={`px-3 py-1 rounded-lg border transition-all duration-300 ${
                  activeCategory === idx
                    ? darkMode
                      ? "bg-zinc-100 text-zinc-900 border-white font-semibold"
                      : "bg-zinc-900 text-white border-zinc-900 font-semibold"
                    : darkMode
                    ? "border-zinc-800 text-zinc-500"
                    : "border-zinc-200 text-zinc-400"
                }`}
              >
                {cat.num} {cat.title}
              </span>
            ))}
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 pl-12 sm:pl-20 pr-32 will-change-transform"
            style={{ width: "max-content" }}
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className={`w-[440px] flex-shrink-0 p-8 rounded-2xl border flex flex-col justify-between transition-colors shadow-sm ${
                  darkMode
                    ? "bg-zinc-900/50 border-zinc-800/90"
                    : "bg-white border-zinc-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-emerald-500 font-semibold">
                      {"//"} {category.num}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {category.skills.length} Technologies
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      darkMode ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {category.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/60">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                        darkMode
                          ? "bg-zinc-800/70 border-zinc-700/60 text-zinc-200"
                          : "bg-zinc-100 border-zinc-200 text-zinc-800"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Fallback */}
      <div className="md:hidden py-16 px-4">
        <div className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
            02 // Skills
          </span>
          <h2
            className={`text-2xl font-bold tracking-tight mb-2 ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Technical Expertise
          </h2>
          <p className="text-sm text-zinc-500">
            Technologies I work with across frontend, backend and databases.
          </p>
        </div>

        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-xl border ${
                darkMode ? "bg-zinc-900/40 border-zinc-800" : "bg-white border-zinc-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-500 font-semibold">
                  {"//"} {category.num}
                </span>
                <h3
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {category.title}
                </h3>
              </div>
              <p
                className={`text-xs mb-4 ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {category.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`text-[11px] font-mono px-2 py-1 rounded border ${
                      darkMode
                        ? "bg-zinc-800/60 border-zinc-700 text-zinc-300"
                        : "bg-zinc-100 border-zinc-200 text-zinc-700"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
