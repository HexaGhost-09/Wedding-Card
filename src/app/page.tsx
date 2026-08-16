export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#0F172A] text-slate-100 flex flex-col items-center justify-between p-6 sm:p-12 font-sans relative selection:bg-amber-400/20 selection:text-amber-300">
      {/* Background Decorative Subtle Rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber-500/10 blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-400/10"></div>
      </div>

      {/* Header Tagline */}
      <div className="z-10 pt-6 text-center space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-400/90 font-medium">
          Together With Their Families
        </p>
        <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">
          Invite You To Celebrate The Wedding Of
        </p>
      </div>

      {/* Main Couple Names */}
      <div className="z-10 my-auto text-center py-12 space-y-6">
        <div className="space-y-3">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-slate-50 font-normal">
            Thasni
          </h1>
          <div className="flex items-center justify-center gap-4 text-amber-400/80">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/40"></span>
            <span className="font-serif italic text-2xl sm:text-3xl text-amber-400">&amp;</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/40"></span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-slate-50 font-normal">
            Midlaj
          </h1>
        </div>

        {/* Minimal Divider */}
        <div className="w-16 h-[1px] bg-amber-400/30 mx-auto my-8"></div>

        {/* Event Details */}
        <div className="space-y-4 max-w-sm mx-auto">
          {/* Date & Time */}
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-serif text-amber-200 tracking-wide">
              September 6, 2026
            </p>
            <p className="text-sm text-slate-400 font-light tracking-widest uppercase">
              12:00 PM Afternoon
            </p>
          </div>

          {/* Venue & Location Link */}
          <div className="pt-4 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-lg backdrop-blur-md">
              <svg
                className="w-4 h-4 text-amber-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm font-medium text-slate-200">
                Parkon Auditorium
              </span>
            </div>

            <div>
              <a
                href="https://g.shrinkrl.com/XerRPs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest text-slate-900 bg-amber-400 hover:bg-amber-300 font-semibold rounded-full transition-all duration-300 shadow-md shadow-amber-400/10 hover:shadow-amber-400/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                View Location Map
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Minimal Text */}
      <div className="z-10 pb-4 text-center">
        <p className="text-[11px] tracking-widest text-slate-500 uppercase">
          We look forward to celebrating with you
        </p>
      </div>
    </main>
  );
}
