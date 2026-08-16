"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Shirt } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function WeddingDetails() {
  return (
    <section id="details" className="py-24 md:py-32 bg-[#F3EFEA] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3 font-sans font-medium">
            Essential Details
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] font-normal">
            Wedding Day Information
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </div>

        {/* Details Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Ceremony Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-8 md:p-10 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#E6D5B8]/40 flex items-center justify-center mb-6 text-[#C5A059]">
                <Sparkles size={24} />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium block mb-1">
                The Ceremony
              </span>
              <h3 className="font-serif text-3xl text-[#1A1A1A] mb-4 font-normal">
                Holy Vows &amp; Exchange
              </h3>

              <div className="space-y-3 mb-6 font-sans">
                <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                  <Calendar size={18} className="text-[#C5A059] shrink-0" />
                  <span>{weddingData.date.displayDate} ({weddingData.date.dayOfWeek})</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                  <Clock size={18} className="text-[#C5A059] shrink-0" />
                  <span>{weddingData.date.displayTime}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#4A4A4A]">
                  <MapPin size={18} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1A1A1A] font-medium">{weddingData.venue.name}</strong>
                    <span>{weddingData.venue.address}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#5A5A5A] font-light leading-relaxed border-t border-[#E8E2D9] pt-4">
                The ceremony will be held outdoors on the Villa Cypress Terrace overlooking the Florence skyline. Guest arrival begins at 3:30 PM.
              </p>
            </div>
          </motion.div>

          {/* Reception Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-8 md:p-10 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#E6D5B8]/40 flex items-center justify-center mb-6 text-[#C5A059]">
                <Sparkles size={24} />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium block mb-1">
                The Reception
              </span>
              <h3 className="font-serif text-3xl text-[#1A1A1A] mb-4 font-normal">
                Cocktails &amp; Dinner Gala
              </h3>

              <div className="space-y-3 mb-6 font-sans">
                <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                  <Calendar size={18} className="text-[#C5A059] shrink-0" />
                  <span>{weddingData.date.displayDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                  <Clock size={18} className="text-[#C5A059] shrink-0" />
                  <span>5:15 PM onwards</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#4A4A4A]">
                  <MapPin size={18} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1A1A1A] font-medium">The Grand Orangerie &amp; Lawns</strong>
                    <span>Villa Bella Vista Grounds</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#5A5A5A] font-light leading-relaxed border-t border-[#E8E2D9] pt-4">
                Following the ceremony, join us for aperitifs in the olive groves, followed by dinner, toasts, and dancing in the candlelit Orangerie ballroom.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dress Code Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-[#FFFDF9] border border-[#E8E2D9] rounded-xl p-6 md:p-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[#C5A059] mb-2">
            <Shirt size={20} />
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#1A1A1A]">
              Dress Code: {weddingData.venue.dressCode}
            </span>
          </div>
          <p className="text-sm text-[#5A5A5A] font-sans font-light leading-relaxed">
            {weddingData.venue.dressCodeNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
