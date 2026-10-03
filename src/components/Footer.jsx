import { scrollToTarget } from "../utils/lenis";

export const Footer = ({ darkMode }) => {
  const scrollToTop = () => {
    scrollToTarget(0);
  };

  return (
    <footer
      className={`py-12 border-t relative z-10 transition-colors ${
        darkMode
          ? "bg-zinc-950 border-zinc-800/80 text-zinc-400"
          : "bg-white border-zinc-200 text-zinc-600"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
              darkMode ? "bg-zinc-800 text-zinc-200" : "bg-zinc-900 text-white"
            }`}
          >
            MJ
          </div>
          <p className="text-xs">
            © 2026 <span className="font-semibold text-zinc-800 dark:text-zinc-200">Mayur Jadhav</span>. Built with React &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium">
          <a
            href="https://github.com/mayurvjadhav"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/thatguytime"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              darkMode
                ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:text-zinc-100"
                : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
