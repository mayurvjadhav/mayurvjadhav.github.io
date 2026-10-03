import { useState, useEffect } from "react";
import { scrollToTarget, onLenisScroll } from "../utils/lenis";

export const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onLenisScroll(({ scroll }) => {
      setScrolled((scroll || 0) > 40);

      // Scroll Spy detection
      const sections = ["about", "experience", "skills", "projects", "contact"];
      const scrollPosition = (scroll || 0) + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("portfolioTheme", nextMode ? "dark" : "light");
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToTarget(`#${id}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none ${
        scrolled ? "py-2" : "py-3.5"
      }`}
    >
      <nav
        className={`pointer-events-auto w-full rounded-2xl transition-all duration-300 flex items-center justify-between border ${
          scrolled ? "max-w-4xl py-2 px-4 sm:px-5" : "max-w-5xl py-2.5 px-4 sm:px-6"
        } ${
          scrolled
            ? darkMode
              ? "bg-zinc-900/90 backdrop-blur-md border-zinc-800 shadow-lg shadow-black/25"
              : "bg-white/90 backdrop-blur-md border-zinc-200 shadow-md shadow-zinc-200/50"
            : darkMode
            ? "bg-zinc-900/70 backdrop-blur-sm border-zinc-800/60"
            : "bg-white/80 backdrop-blur-sm border-zinc-200/70"
        }`}
      >
        {/* Brand */}
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
              darkMode
                ? "bg-zinc-800 text-zinc-100 border border-zinc-700"
                : "bg-zinc-900 text-white"
            }`}
          >
            MJ
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm font-semibold tracking-tight transition-colors ${
                darkMode ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Mayur Jadhav
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? darkMode
                      ? "text-white bg-zinc-800 border border-zinc-700/70"
                      : "text-zinc-900 bg-zinc-100 border border-zinc-200"
                    : darkMode
                    ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Theme switch */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors focus:outline-none ${
              darkMode
                ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
                : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-900"
            }`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* Contact quick button (optional desktop) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className={`hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              darkMode
                ? "bg-zinc-100 border-zinc-100 text-zinc-900 hover:bg-white"
                : "bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              darkMode
                ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                : "bg-zinc-100 border-zinc-200 text-zinc-700"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto absolute top-16 left-4 right-4 rounded-xl border p-3 shadow-xl backdrop-blur-lg md:hidden ${
            darkMode
              ? "bg-zinc-900/95 border-zinc-800 text-zinc-200"
              : "bg-white/95 border-zinc-200 text-zinc-800"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.id);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? darkMode
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-100 text-zinc-900"
                    : darkMode
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
