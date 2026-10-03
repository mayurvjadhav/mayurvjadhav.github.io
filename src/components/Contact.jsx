import { useEffect, useRef, useState } from "react";
import { gsap } from "../utils/lenis";

export const Contact = ({ darkMode }) => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const email = "jadhavmayur26062001@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.8,
          },
        })
        .fromTo(
          headingRef.current,
          { autoAlpha: 0, y: 35, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, ease: "power1.out" }
        )
        .fromTo(
          card1Ref.current,
          { autoAlpha: 0, y: 40, x: -20 },
          { autoAlpha: 1, y: 0, x: 0, ease: "power1.out" },
          "-=0.2"
        )
        .fromTo(
          card2Ref.current,
          { autoAlpha: 0, y: 40, x: 20 },
          { autoAlpha: 1, y: 0, x: 0, ease: "power1.out" },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 border-t border-zinc-200/60 dark:border-zinc-800/80 overflow-hidden"
    >
      {/* Concluding atmospheric glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(56, 189, 248, 0.15), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div ref={headingRef} className="mb-12 text-center will-change-transform">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-3">
            04 // Conclusion
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Get in Touch
          </h2>
          <p
            className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Have an open role, software project, or technical question? Let&apos;s connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <div
            ref={card1Ref}
            className={`p-7 rounded-2xl border flex flex-col justify-between h-full transition-all will-change-transform ${
              darkMode
                ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700/80 hover:shadow-xl hover:shadow-black/40"
                : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500">{"//"} Direct Email</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <h3
                className={`text-lg font-bold mb-2 ${
                  darkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                Start a Conversation
              </h3>
              <p
                className={`text-sm mb-5 font-mono break-all ${
                  darkMode ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {email}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/80">
              <button
                onClick={handleCopyEmail}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : darkMode
                    ? "bg-zinc-100 text-zinc-900 hover:bg-white"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                {copied ? "Copied to Clipboard!" : "Copy Email"}
              </button>

              <a
                href={`mailto:${email}`}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  darkMode
                    ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                Default Mail App
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  darkMode
                    ? "border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    : "border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                Gmail ↗
              </a>
            </div>
          </div>

          {/* Social & Location Card */}
          <div
            ref={card2Ref}
            className={`p-7 rounded-2xl border flex flex-col justify-between gap-6 h-full transition-all will-change-transform ${
              darkMode
                ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700/80 hover:shadow-xl hover:shadow-black/40"
                : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50"
            }`}
          >
            {/* Social Links */}
            <div>
              <span className="text-xs font-mono text-zinc-500 mb-3 block">
                {"//"} Developer Network
              </span>
              <h3
                className={`text-lg font-bold mb-3 ${
                  darkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                Professional Profiles
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/mayurvjadhav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    darkMode
                      ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/thatguytime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    darkMode
                      ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Location Notice per Section 18 */}
            <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/80">
              <span
                className={`text-xs block font-semibold ${
                  darkMode ? "text-zinc-300" : "text-zinc-800"
                }`}
              >
                Based in Maharashtra, India
              </span>
              <span
                className={`text-xs block ${
                  darkMode ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Open to Pune, Mumbai and remote opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
