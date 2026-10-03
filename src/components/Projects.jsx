import { useEffect, useRef, useState } from "react";
import chattyImg from "../assets/Chatty_Screenshot_69.jpg";
import shrinklyImg from "../assets/shrinkly.jpg";
import weatherImg from "../assets/Weather_Screenshot_69.jpg";
import { gsap } from "../utils/lenis";

export const Projects = ({ darkMode }) => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: "01",
      title: "Chatty — Full-Stack Chat Application",
      description:
        "A real-time messaging platform featuring user authentication, online presence tracking, persistent conversation history, and responsive UI.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
      image: chattyImg,
      demoLink: "https://full-stack-chat-app-chatty-d5w5.onrender.com/",
      githubLink: "https://github.com/mayurvjadhav",
    },
    {
      id: "02",
      title: "Shrinkly — URL Shortener",
      description:
        "A URL shortener web application with custom aliases, rapid redirection, click analytics tracking, and an interactive dashboard.",
      tags: ["React.js", "Supabase", "Tailwind CSS", "Shadcn UI"],
      image: shrinklyImg,
      isNotHosted: true,
      githubLink: "https://github.com/mayurvjadhav",
    },
    {
      id: "03",
      title: "Weather Dashboard",
      description:
        "An intuitive weather forecasting dashboard utilizing the OpenWeather API to provide real-time conditions, location search, and multi-day forecasts.",
      tags: ["React.js", "JavaScript", "OpenWeather API", "Tailwind CSS"],
      image: weatherImg,
      demoLink: "https://mayurvjadhav.github.io/",
      githubLink: "https://github.com/mayurvjadhav",
    },
  ];

  const cardRefs = useRef([]);
  cardRefs.current = [];
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      if (cards.length < 3) return;

      // Initial state: Card 0 is visible, Cards 1 & 2 are hidden
      gsap.set(cards[1], { autoAlpha: 0, scale: 0.94, y: 50 });
      gsap.set(cards[2], { autoAlpha: 0, scale: 0.94, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=260%",
          pin: pinRef.current,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) setActiveProject(0);
            else if (p < 0.66) setActiveProject(1);
            else setActiveProject(2);
          },
        },
      });

      // Sequence: Card 0 exits -> Card 1 enters & exits -> Card 2 enters
      tl
        // Hold Project 1
        .to({}, { duration: 0.6 })
        // Project 1 out
        .to(cards[0], { autoAlpha: 0, scale: 0.94, y: -50, duration: 1, ease: "power1.inOut" })
        // Project 2 in
        .to(cards[1], { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power1.inOut" }, "-=0.3")
        // Hold Project 2
        .to({}, { duration: 0.8 })
        // Project 2 out
        .to(cards[1], { autoAlpha: 0, scale: 0.94, y: -50, duration: 1, ease: "power1.inOut" })
        // Project 3 in
        .to(cards[2], { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power1.inOut" }, "-=0.3")
        // Hold Project 3 before releasing
        .to({}, { duration: 0.8 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative border-t border-zinc-200/60 dark:border-zinc-800/80 overflow-hidden"
    >
      {/* Desktop Pinned Cinematic Showcase */}
      <div
        ref={pinRef}
        className="hidden lg:flex flex-col justify-center min-h-screen max-w-6xl mx-auto px-6 py-12"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              03 // Featured Work
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <h2
              className={`text-sm font-semibold tracking-wide uppercase ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Projects Showcase
            </h2>
          </div>

          {/* Project Step Tracker */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {projects.map((proj, idx) => (
              <span
                key={proj.id}
                className={`px-3 py-1 rounded-lg border transition-all duration-300 ${
                  activeProject === idx
                    ? darkMode
                      ? "bg-zinc-100 text-zinc-900 border-white font-semibold"
                      : "bg-zinc-900 text-white border-zinc-900 font-semibold"
                    : darkMode
                    ? "border-zinc-800 text-zinc-500"
                    : "border-zinc-200 text-zinc-400"
                }`}
              >
                {proj.id} {proj.title.split("—")[0].trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Project Stage */}
        <div className="relative min-h-[520px]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={addToCardRefs}
              className="absolute inset-0 grid grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Metadata */}
              <div className="col-span-5 flex flex-col justify-center">
                <span className="text-xs font-mono font-bold text-emerald-500 mb-2">
                  PROJECT {project.id} / 03
                </span>

                <h3
                  className={`text-3xl font-bold tracking-tight mb-4 ${
                    darkMode ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-base leading-relaxed mb-6 ${
                    darkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                        darkMode
                          ? "bg-zinc-800/70 border-zinc-700/60 text-zinc-300"
                          : "bg-zinc-100 border-zinc-200 text-zinc-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        darkMode
                          ? "bg-zinc-100 text-zinc-900 hover:bg-white"
                          : "bg-zinc-900 text-white hover:bg-zinc-800"
                      }`}
                    >
                      <span>Live Demo</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      darkMode
                        ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                  >
                    <svg className="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Source Code</span>
                  </a>

                  {project.isNotHosted && (
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded border ${
                        darkMode
                          ? "bg-zinc-800/80 text-zinc-400 border-zinc-700"
                          : "bg-zinc-100 text-zinc-600 border-zinc-300"
                      }`}
                    >
                      Not hosted
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Large Screenshot Display */}
              <div className="col-span-7">
                <div
                  className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-all ${
                    darkMode
                      ? "bg-zinc-900 border-zinc-700/80 shadow-black/60"
                      : "bg-white border-zinc-300 shadow-zinc-300/50"
                  }`}
                >
                  {/* Subtle terminal-like browser bar */}
                  <div
                    className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-mono ${
                      darkMode
                        ? "bg-zinc-900 border-zinc-800 text-zinc-500"
                        : "bg-zinc-100 border-zinc-200 text-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                    </div>
                    <span className="truncate max-w-[200px]">
                      {project.title.split("—")[0].toLowerCase().trim()}.app
                    </span>
                    <span className="text-[10px]">0{index + 1}</span>
                  </div>

                  {/* Screenshot Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Fallback */}
      <div className="lg:hidden py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
            03 // Featured Work
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Projects
          </h2>
          <p className="text-sm text-zinc-500">
            Some of the practical web applications I&apos;ve built.
          </p>
        </div>

        <div className="space-y-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`rounded-xl overflow-hidden border ${
                darkMode ? "bg-zinc-900/40 border-zinc-800" : "bg-white border-zinc-200"
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-zinc-800/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <h3
                  className={`text-lg font-bold mb-2 ${
                    darkMode ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        darkMode
                          ? "bg-zinc-800/60 border-zinc-700 text-zinc-300"
                          : "bg-zinc-100 border-zinc-200 text-zinc-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/80">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        darkMode
                          ? "bg-zinc-100 text-zinc-900"
                          : "bg-zinc-900 text-white"
                      }`}
                    >
                      Live Demo ↗
                    </a>
                  )}

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      darkMode
                        ? "border-zinc-700 text-zinc-300"
                        : "border-zinc-300 text-zinc-700"
                    }`}
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
