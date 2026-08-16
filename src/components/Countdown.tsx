"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date(weddingData.date.targetIsoDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="py-20 bg-[#F3EFEA] border-y border-[#E8E2D9] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3 font-sans font-medium">
            Counting Down The Days
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-8 font-normal">
            Until We Say &ldquo;I Do&rdquo;
          </h2>

          {/* Clean Editorial Style Countdown */}
          {isMounted ? (
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-6 px-8 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] shadow-2xs">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-medium">
                  {timeLeft.days}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8A8A8A] font-sans">
                  Days
                </span>
              </div>

              <span className="text-[#C5A059] font-serif text-2xl font-light">·</span>

              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-medium">
                  {formatTwoDigits(timeLeft.hours)}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8A8A8A] font-sans">
                  Hours
                </span>
              </div>

              <span className="text-[#C5A059] font-serif text-2xl font-light">·</span>

              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-medium">
                  {formatTwoDigits(timeLeft.minutes)}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8A8A8A] font-sans">
                  Minutes
                </span>
              </div>

              <span className="text-[#C5A059] font-serif text-2xl font-light">·</span>

              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-medium">
                  {formatTwoDigits(timeLeft.seconds)}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8A8A8A] font-sans">
                  Seconds
                </span>
              </div>
            </div>
          ) : (
            <div className="py-6 text-sm text-[#8A8A8A]">Calculating countdown...</div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
