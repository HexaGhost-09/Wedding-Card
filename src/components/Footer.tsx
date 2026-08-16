"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function Footer() {
  return (
    <footer className="relative bg-[#1A1A1A] text-white pt-24 pb-12 overflow-hidden">
      {/* Closing Photo Banner */}
      <div className="relative max-w-5xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        >
          <Image
            src={weddingData.couple.closingImage}
            alt={`${weddingData.couple.brideFirstName} & ${weddingData.couple.groomFirstName}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover object-center brightness-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <span className="font-serif italic text-3xl md:text-5xl text-[#E6D5B8] block mb-2 font-light">
              We Can&apos;t Wait To Celebrate With You
            </span>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80 font-sans">
              {weddingData.date.displayDate} · {weddingData.venue.cityState}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h2 className="font-serif text-4xl md:text-5xl text-[#E6D5B8] mb-4 font-normal">
            {weddingData.couple.brideFirstName} &amp; {weddingData.couple.groomFirstName}
          </h2>
          <p className="text-sm text-[#A8A8A8] font-sans font-light max-w-md mx-auto leading-relaxed">
            {weddingData.couple.welcomeMessage}
          </p>
        </div>

        <div className="w-16 h-[1px] bg-[#C5A059]/40 mx-auto mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A8A] font-sans border-t border-white/10 pt-8">
          <span>
            © {new Date().getFullYear()} {weddingData.couple.brideFirstName} &amp; {weddingData.couple.groomFirstName} Wedding
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#C5A059]">
            <span>Designed with love</span>
            <Heart size={12} className="fill-[#C5A059]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
