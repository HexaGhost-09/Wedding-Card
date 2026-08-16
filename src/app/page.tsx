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
  const [showCountdown, setShowCountdown] = useState(false);
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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity:0.06; }
          50%      { transform: translate(-50%,-50%) scale(1.06); opacity:0.12; }
        }
        @keyframes pulse-ring2 {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity:0.04; }
          50%      { transform: translate(-50%,-50%) scale(1.04); opacity:0.09; }
        }
        @keyframes todayGlow {
          0%,100% { text-shadow: 0 0 20px rgba(251,191,36,0.6), 0 0 40px rgba(251,191,36,0.3); }
          50%      { text-shadow: 0 0 35px rgba(251,191,36,0.9), 0 0 70px rgba(251,191,36,0.5); }
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
        .glass-dark {
          background: rgba(10,12,20,0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(212,175,95,0.12);
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
          animation: pulse-ring 11s ease-in-out infinite reverse;
        }
        .fade-slide-up { animation: fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) both; }
        .scale-in { animation: scaleIn 0.5s cubic-bezier(.22,1,.36,1) both; }
        .today-glow { animation: todayGlow 2.5s ease-in-out infinite; }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,95,0.5), transparent);
        }
        .count-tile {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 14px 10px 10px;
          border-radius: 14px;
          background: rgba(10,12,22,0.7);
          border: 1px solid rgba(212,175,95,0.14);
          min-width: 62px;
          flex: 1;
        }
        .count-num {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 5vw, 2.4rem);
          font-weight: 400;
          line-height: 1;
          background: linear-gradient(135deg, #e8d08a, #fdf0c0, #c8a84b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        .count-label {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.35);
          margin-top: 6px;
          font-weight: 500;
        }
      `}</style>

      <main
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 10%, #0e1528 0%, #080c17 60%, #060810 100%)",
          fontFamily: "var(--font-sans)",
        }}
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

        {/* Rings */}
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

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-sm mx-auto px-5 py-12 flex flex-col items-center gap-0"
        >

          {/* Top eyebrow label */}
          <div className="fade-slide-up" style={{ animationDelay: "0.1s" }}>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "rgba(212,175,95,0.7)",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: "28px",
              }}
            >
              Together With Their Families
            </p>
          </div>

          {/* Main card */}
          <div
            className="glass w-full rounded-3xl px-7 py-10 flex flex-col items-center gap-6 fade-slide-up"
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
                  fontSize: "clamp(3.2rem, 14vw, 5.5rem)",
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
                    fontSize: "1.5rem",
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
                  fontSize: "clamp(3.2rem, 14vw, 5.5rem)",
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
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                textAlign: "center",
                marginTop: -8,
              }}
            >
              Invite You To Celebrate Their Wedding
            </p>
          </div>

          {/* Date / Time / Venue block */}
          <div
            className="glass w-full rounded-2xl px-6 py-6 flex flex-col items-center gap-4 fade-slide-up"
            style={{ animationDelay: "0.35s", marginTop: 12 }}
          >
            {/* Date row */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
                  fontWeight: 300,
                  color: "#e8d08a",
                  letterSpacing: "0.04em",
                }}
              >
                September 6, 2026
              </p>
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                  marginTop: 5,
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

            {/* Venue chip */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,95,0.75)" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span
                style={{
                  fontSize: "0.78rem",
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
                padding: "10px 24px",
                borderRadius: 100,
                background: "linear-gradient(135deg, #c8a84b, #e8d08a)",
                color: "#0a0c14",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 24px rgba(200,168,75,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(200,168,75,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(200,168,75,0.25)";
              }}
            >
              View on Map
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Countdown toggle */}
          <div
            className="w-full fade-slide-up"
            style={{ animationDelay: "0.5s", marginTop: 12 }}
          >
            <button
              onClick={() => setShowCountdown(!showCountdown)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,95,0.14)",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,95,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(212,175,95,0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {showCountdown ? "Hide Countdown" : "Show Countdown"}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: showCountdown ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Countdown panel */}
            {showCountdown && (
              <div
                className="glass scale-in w-full rounded-2xl px-5 py-6 flex flex-col items-center gap-5"
                style={{ marginTop: 8 }}
              >
                {timeLeft.isToday ? (
                  <div style={{ textAlign: "center", paddingBlock: 8 }}>
                    <p
                      className="today-glow"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.5rem, 7vw, 2.2rem)",
                        color: "#fbbf24",
                        fontWeight: 300,
                        letterSpacing: "0.03em",
                      }}
                    >
                      💍 Today Marriage 💍
                    </p>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        marginTop: 10,
                      }}
                    >
                      Welcome to our special day
                    </p>
                  </div>
                ) : timeLeft.isPassed ? (
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.5rem",
                        color: "#e8d08a",
                        fontWeight: 300,
                      }}
                    >
                      Marriage Celebrated ❤️
                    </p>
                  </div>
                ) : (
                  <>
                    <p
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.28)",
                        textAlign: "center",
                      }}
                    >
                      Counting Down
                    </p>
                    <div style={{ display: "flex", gap: 8, width: "100%" }}>
                      {[
                        { value: timeLeft.days, label: "Days" },
                        { value: timeLeft.hours, label: "Hours" },
                        { value: timeLeft.minutes, label: "Mins" },
                        { value: timeLeft.seconds, label: "Secs" },
                      ].map((item) => (
                        <div key={item.label} className="count-tile">
                          <span className="count-num">
                            {String(item.value).padStart(2, "0")}
                          </span>
                          <span className="count-label">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer line */}
          <p
            className="fade-slide-up"
            style={{
              animationDelay: "0.65s",
              marginTop: 28,
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
              textAlign: "center",
            }}
          >
            We look forward to celebrating with you
          </p>
        </div>
      </main>
    </>
  );
}
