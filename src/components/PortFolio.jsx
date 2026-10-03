import { useState, useEffect } from "react";
import { initLenis, destroyLenis, scrollToTarget } from "../utils/lenis";
import { ScrollProgress } from "./ScrollProgress";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("portfolioTheme");
    if (saved) return saved === "dark";
    return true;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize centralized Lenis Smooth Scroll
  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollToTarget(0);
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col font-sans transition-colors duration-300 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900 ${
        darkMode ? "bg-[#0c0d10] text-zinc-100" : "bg-[#fbfbfb] text-zinc-900"
      }`}
    >
      {/* Subtle, quiet ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {darkMode ? (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(56, 189, 248, 0.08), transparent 70%)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(224, 231, 255, 0.6), transparent 70%)",
            }}
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <ScrollProgress darkMode={darkMode} />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-grow">
          <Hero darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Experience darkMode={darkMode} />
          <Education darkMode={darkMode} />
          <Skills darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </main>

        <Footer darkMode={darkMode} />

        {/* Floating Quick Back-To-Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 p-2.5 rounded-xl border shadow-md backdrop-blur-md transition-all duration-200 transform ${
            showScrollTop
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-90 pointer-events-none"
          } ${
            darkMode
              ? "bg-zinc-900/90 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
              : "bg-white/90 border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
