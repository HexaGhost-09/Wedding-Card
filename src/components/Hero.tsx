"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with subtle romantic overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={weddingData.couple.heroImage}
          alt={`${weddingData.couple.brideFirstName} and ${weddingData.couple.groomFirstName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.88] contrast-[1.02] transform scale-105 animate-subtle-pulse"
        />
        {/* Ivory tint subtle overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#FAF8F5]/80 via-[#FAF8F5]/40 to-[#FAF8F5]" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        {/* Subtle Crest / Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-[1px] bg-[#C5A059]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A5A] font-sans font-medium">
            We are getting married
          </span>
          <span className="w-8 h-[1px] bg-[#C5A059]" />
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#1A1A1A] mb-6 font-normal"
        >
          {weddingData.couple.brideFirstName}
          <span className="block italic text-3xl md:text-5xl lg:text-6xl text-[#C5A059] my-2 font-serif font-light">
            &amp;
          </span>
          {weddingData.couple.groomFirstName}
        </motion.h1>

        {/* Tagline / Short Invitation Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-xl text-base md:text-lg text-[#4A4A4A] font-sans font-light leading-relaxed mb-8 px-4"
        >
          {weddingData.couple.tagline}
        </motion.p>

        {/* Date and Location Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-3.5 px-7 mb-10 rounded-full border border-[#E8E2D9] bg-[#FAF8F5]/80 backdrop-blur-xs shadow-2xs"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-medium">
            <Calendar size={15} className="text-[#C5A059]" />
            <span>{weddingData.date.displayDate}</span>
          </div>
          <span className="hidden sm:inline-block text-[#C5A059] font-serif">•</span>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-medium">
            <MapPin size={15} className="text-[#C5A059]" />
            <span>{weddingData.venue.cityState}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollToSection("#details")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#C5A059] transition-all duration-300 shadow-sm cursor-pointer"
          >
            View Invitation
          </button>
          <button
            onClick={() => scrollToSection("#rsvp")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-[0.25em] hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300 bg-[#FAF8F5]/60 backdrop-blur-2xs cursor-pointer"
          >
            RSVP Now
          </button>
        </motion.div>

        {/* Down Arrow Scroll Indicator */}
        <motion.button
          onClick={() => scrollToSection("#story")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.4, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          aria-label="Scroll to story"
          className="mt-16 text-[#5A5A5A] hover:text-[#C5A059] transition-colors p-2 cursor-pointer"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.button>
      </div>
    </section>
  );
}
