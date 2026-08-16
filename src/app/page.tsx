"use client";

import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPassed: boolean;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<0 | 1>(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPassed: false,
  });

  const touchStartY = useRef<number | null>(null);
  const isScrolling = useRef(false);

  // Generate particles on client only
  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.35 + 0.08,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 6,
    }));
    setParticles(generated);
    setMounted(true);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const target = new Date("2026-09-06T12:00:00").getTime();

    const tick = () => {
      const now = new Date();
      const isToday =
        now.getFullYear() === 2026 &&
        now.getMonth() === 8 &&
        now.getDate() === 6;

      if (isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPassed: false });
        return;
      }

      const diff = target - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        isToday: false,
        isPassed: false,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Handle wheel / scroll between pages
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 25) return;

      if (e.deltaY > 0 && activeSection === 0) {
        isScrolling.current = true;
        setActiveSection(1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      } else if (e.deltaY < 0 && activeSection === 1) {
        isScrolling.current = true;
        setActiveSection(0);
        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        setActiveSection(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        setActiveSection(0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;

    if (diff > 45 && activeSection === 0) {
      // Swiped up -> go to page 2 (Countdown)
      setActiveSection(1);
    } else if (diff < -45 && activeSection === 1) {
      // Swiped down -> go to page 1 (Invitation)
      setActiveSection(0);
    }
    touchStartY.current = null;
  };

  return (
    <>
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0px) scale(1);   opacity: var(--op); }
          50%  { transform: translateY(-18px) scale(1.15); opacity: calc(var(--op) * 0.6); }
          100% { transform: translateY(0px) scale(1);   opacity: var(--op); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity:0.06; }
          50%      { transform: translate(-50%,-50%) scale(1.06); opacity:0.12; }
        }
        @keyframes pulse-ring2 {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity:0.04; }
          50%      { transform: translate(-50%,-50%) scale(1.04); opacity:0.09; }
        }
        @keyframes pulse-ring3 {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity:0.03; }
          50%      { transform: translate(-50%,-50%) scale(1.03); opacity:0.07; }
        }
        @keyframes todayGlow {
          0%,100% { text-shadow: 0 0 20px rgba(251,191,36,0.6), 0 0 40px rgba(251,191,36,0.3); }
          50%      { text-shadow: 0 0 35px rgba(251,191,36,0.9), 0 0 70px rgba(251,191,36,0.5); }
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(8px); }
          60% { transform: translateY(4px); }
        }
        @keyframes bounceUp {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,95,0.9), rgba(212,175,95,0) 70%);
          animation: float-up var(--dur) var(--delay) ease-in-out infinite;
          pointer-events: none;
        }
        .name-shimmer {
          background: linear-gradient(
            105deg,
            #c8a84b 0%, #e8d08a 30%, #fdf0c0 50%, #e8d08a 70%, #c8a84b 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,95,0.15);
        }
        .ring1 {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(212,175,95,0.1);
          width: 520px; height: 520px;
          left: 50%; top: 50%;
          animation: pulse-ring 7s ease-in-out infinite;
        }
        .ring2 {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(212,175,95,0.07);
          width: 340px; height: 340px;
          left: 50%; top: 50%;
          animation: pulse-ring2 9s ease-in-out infinite;
        }
        .ring3 {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(212,175,95,0.04);
          width: 700px; height: 700px;
          left: 50%; top: 50%;
          animation: pulse-ring3 11s ease-in-out infinite reverse;
        }
        .fade-slide-up { animation: fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) both; }
        .today-glow { animation: todayGlow 2.5s ease-in-out infinite; }
        .bounce-down { animation: bounceDown 2s infinite; }
        .bounce-up { animation: bounceUp 2s infinite; }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,95,0.5), transparent);
        }
        .count-tile-large {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 24px 14px 18px;
          border-radius: 20px;
          background: rgba(10,12,22,0.75);
          border: 1px solid rgba(212,175,95,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          flex: 1;
        }
        .count-num-large {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 8vw, 3.8rem);
          font-weight: 400;
          line-height: 1;
          background: linear-gradient(135deg, #e8d08a, #fdf0c0, #c8a84b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        .count-label-large {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.4);
          margin-top: 10px;
          font-weight: 600;
        }
      `}</style>

      <div
        className="fixed inset-0 w-full h-full overflow-hidden select-none"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 10%, #0e1528 0%, #080c17 60%, #060810 100%)",
          fontFamily: "var(--font-sans)",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
            opacity: 0.55,
          }}
        />

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: "absolute", top: "-10%", left: "20%",
              width: 600, height: 500,
              background: "radial-gradient(ellipse, rgba(180,130,40,0.07) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: "-5%", right: "10%",
              width: 500, height: 400,
              background: "radial-gradient(ellipse, rgba(100,90,180,0.06) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>

        {/* Floating concentric rings */}
        <div className="absolute inset-0 pointer-events-none" style={{ overflow: "hidden" }}>
          <div className="ring1" />
          <div className="ring2" />
          <div className="ring3" />
        </div>

        {/* Floating particles */}
        {mounted && particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              "--op": p.opacity,
              "--dur": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Vertical Pagination Indicator / Navigation Dots */}
        <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
          <button
            onClick={() => setActiveSection(0)}
            aria-label="Invitation Page"
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeSection === 0 ? "8px" : "6px",
              height: activeSection === 0 ? "24px" : "6px",
              background: activeSection === 0 ? "#c8a84b" : "rgba(255,255,255,0.25)",
              boxShadow: activeSection === 0 ? "0 0 10px rgba(200,168,75,0.5)" : "none",
            }}
          />
          <button
            onClick={() => setActiveSection(1)}
            aria-label="Countdown Page"
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeSection === 1 ? "8px" : "6px",
              height: activeSection === 1 ? "24px" : "6px",
              background: activeSection === 1 ? "#c8a84b" : "rgba(255,255,255,0.25)",
              boxShadow: activeSection === 1 ? "0 0 10px rgba(200,168,75,0.5)" : "none",
            }}
          />
        </div>

        {/* Sliding 2-Page Container */}
        <div
          className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translateY(-${activeSection * 100}%)`,
          }}
        >
          {/* ================= PAGE 1: INVITATION CARD ================= */}
          <section className="w-full h-full flex flex-col items-center justify-between px-5 py-8 sm:py-12 overflow-hidden relative">
            {/* Top Eyebrow */}
            <div className="z-10 pt-2 text-center fade-slide-up" style={{ animationDelay: "0.1s" }}>
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,95,0.7)",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Together With Their Families
              </p>
            </div>

            {/* Main Invitation Card */}
            <div className="z-10 my-auto w-full max-w-sm flex flex-col items-center gap-3">
              {/* Couple Card */}
              <div
                className="glass w-full rounded-3xl px-7 py-9 flex flex-col items-center gap-5 fade-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Small decorative ornament */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
                  <div className="divider-line" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.5 9H21L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9H10.5L12 2Z" fill="rgba(212,175,95,0.6)" />
                  </svg>
                  <div className="divider-line" />
                </div>

                {/* Couple names */}
                <div style={{ textAlign: "center", lineHeight: 1 }}>
                  <h1
                    className="name-shimmer"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(3rem, 13vw, 5rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                      display: "block",
                    }}
                  >
                    Thasni
                  </h1>

                  <div
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "center", gap: 14,
                      margin: "8px 0",
                    }}
                  >
                    <div className="divider-line" />
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.4rem",
                        fontStyle: "italic",
                        color: "rgba(212,175,95,0.8)",
                        lineHeight: 1,
                      }}
                    >
                      &amp;
                    </span>
                    <div className="divider-line" />
                  </div>

                  <h1
                    className="name-shimmer"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(3rem, 13vw, 5rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                      display: "block",
                    }}
                  >
                    Midlaj
                  </h1>
                </div>

                {/* Bottom ornament */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
                  <div className="divider-line" />
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="2" fill="rgba(212,175,95,0.5)" />
                  </svg>
                  <div className="divider-line" />
                </div>

                {/* Invite line */}
                <p
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    textAlign: "center",
                    marginTop: -6,
                  }}
                >
                  Invite You To Celebrate Their Wedding
                </p>
              </div>

              {/* Date / Time / Venue Card */}
              <div
                className="glass w-full rounded-2xl px-6 py-5 flex flex-col items-center gap-3.5 fade-slide-up"
                style={{ animationDelay: "0.35s" }}
              >
                {/* Date row */}
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.2rem, 5vw, 1.5rem)",
                      fontWeight: 300,
                      color: "#e8d08a",
                      letterSpacing: "0.04em",
                    }}
                  >
                    September 6, 2026
                  </p>
                  <p
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.32)",
                      marginTop: 4,
                    }}
                  >
                    12 : 00 &nbsp;&bull;&nbsp; Afternoon
                  </p>
                </div>

                {/* Hairline */}
                <div
                  style={{
                    width: "100%", height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(212,175,95,0.2), transparent)",
                  }}
                />

                {/* Venue */}
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,95,0.75)" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.65)",
                      letterSpacing: "0.08em",
                      fontWeight: 400,
                    }}
                  >
                    Parkon Auditorium
                  </span>
                </div>

                {/* Map button */}
                <a
                  href="https://g.shrinkrl.com/XerRPs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 22px",
                    borderRadius: 100,
                    background: "linear-gradient(135deg, #c8a84b, #e8d08a)",
                    color: "#0a0c14",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 20px rgba(200,168,75,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(200,168,75,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,168,75,0.25)";
                  }}
                >
                  View on Map
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom Swipe Down Indicator */}
            <button
              onClick={() => setActiveSection(1)}
              className="z-10 pb-2 flex flex-col items-center gap-1.5 cursor-pointer group transition-opacity hover:opacity-100 opacity-80"
              style={{ background: "transparent", border: "none" }}
            >
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,95,0.8)",
                  fontWeight: 600,
                }}
              >
                Swipe Down For Countdown
              </span>
              <div className="bounce-down">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(212,175,95,0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </div>
            </button>
          </section>

          {/* ================= PAGE 2: SWIPE DOWN COUNTDOWN PAGE ================= */}
          <section className="w-full h-full flex flex-col items-center justify-between px-5 py-8 sm:py-12 overflow-hidden relative">
            {/* Top Swipe Up Back Indicator */}
            <button
              onClick={() => setActiveSection(0)}
              className="z-10 pt-2 flex flex-col items-center gap-1.5 cursor-pointer group transition-opacity hover:opacity-100 opacity-80"
              style={{ background: "transparent", border: "none" }}
            >
              <div className="bounce-up">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(212,175,95,0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,95,0.8)",
                  fontWeight: 600,
                }}
              >
                Swipe Up For Invitation
              </span>
            </button>

            {/* Countdown Page Content */}
            <div className="z-10 my-auto w-full max-w-md flex flex-col items-center gap-6 text-center">
              {/* Couple Monogram / Heading */}
              <div className="space-y-1">
                <p
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "rgba(212,175,95,0.7)",
                    fontWeight: 600,
                  }}
                >
                  Thasni &amp; Midlaj
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
                    fontWeight: 300,
                    color: "#fdf0c0",
                    letterSpacing: "0.02em",
                  }}
                >
                  The Big Day
                </h2>
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  September 6, 2026 &bull; 12:00 PM
                </p>
              </div>

              {/* Main Countdown or Today Notification */}
              {timeLeft.isToday ? (
                <div
                  className="glass w-full rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-3 border-amber-400/30"
                  style={{ boxShadow: "0 0 50px rgba(251,191,36,0.15)" }}
                >
                  <span className="text-4xl sm:text-5xl animate-bounce">💍</span>
                  <h3
                    className="today-glow"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2rem, 8vw, 3.2rem)",
                      color: "#fbbf24",
                      fontWeight: 400,
                      letterSpacing: "0.03em",
                      lineHeight: 1.1,
                    }}
                  >
                    Today Marriage
                  </h3>
                  <div className="divider-line w-24 my-2" />
                  <p
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Welcome To Our Wedding Day!
                  </p>
                  <p
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "rgba(212,175,95,0.8)",
                    }}
                  >
                    Parkon Auditorium &bull; 12:00 PM
                  </p>
                </div>
              ) : timeLeft.isPassed ? (
                <div className="glass w-full rounded-3xl p-8 flex flex-col items-center justify-center gap-2">
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.8rem",
                      color: "#e8d08a",
                      fontWeight: 300,
                    }}
                  >
                    Marriage Celebrated ❤️
                  </h3>
                  <p className="text-xs text-slate-400 tracking-wider">
                    Thank you for being part of our special journey!
                  </p>
                </div>
              ) : (
                <div className="w-full space-y-5">
                  {/* Grid of countdown units */}
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full">
                    {[
                      { value: timeLeft.days, label: "Days" },
                      { value: timeLeft.hours, label: "Hours" },
                      { value: timeLeft.minutes, label: "Mins" },
                      { value: timeLeft.seconds, label: "Secs" },
                    ].map((item) => (
                      <div key={item.label} className="count-tile-large">
                        <span className="count-num-large">
                          {String(item.value).padStart(2, "0")}
                        </span>
                        <span className="count-label-large">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Message under countdown */}
                  <div className="glass rounded-2xl p-4 flex items-center justify-center gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,95,0.8)" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      Counting every moment until we say &ldquo;I do&rdquo;
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer text */}
            <div className="z-10 pb-2 text-center">
              <p
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                We look forward to celebrating with you
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
