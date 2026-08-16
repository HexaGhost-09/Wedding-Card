"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";

export default function CoupleStory() {
  return (
    <section id="story" className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative thin background line */}
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3 font-sans font-medium">
            Our Love Story
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] font-normal">
            How We Met &amp; Fell in Love
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </div>

        {/* Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Bride Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-6 rounded-2xl overflow-hidden shadow-md border border-[#E8E2D9]">
              <Image
                src={weddingData.couple.bridePhoto}
                alt={weddingData.couple.brideFirstName}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-3xl text-[#1A1A1A] mb-1 font-medium">
              {weddingData.couple.brideFirstName} {weddingData.couple.brideLastName}
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans">
              The Bride
            </span>
          </motion.div>

          {/* Groom Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-6 rounded-2xl overflow-hidden shadow-md border border-[#E8E2D9]">
              <Image
                src={weddingData.couple.groomPhoto}
                alt={weddingData.couple.groomFirstName}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-3xl text-[#1A1A1A] mb-1 font-medium">
              {weddingData.couple.groomFirstName} {weddingData.couple.groomLastName}
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans">
              The Groom
            </span>
          </motion.div>
        </div>

        {/* Story Narrative Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-[#FFFDF9] border border-[#E8E2D9] rounded-2xl p-8 md:p-12 text-center shadow-xs mb-24"
        >
          <span className="font-serif italic text-4xl text-[#C5A059] block mb-4">
            &ldquo;Every love story is beautiful, but ours is my favorite.&rdquo;
          </span>
          <div className="space-y-4 text-base md:text-lg text-[#5A5A5A] leading-relaxed font-sans font-light">
            {weddingData.couple.storyContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Milestone Timeline */}
        <div className="mt-16">
          <div className="text-center mb-14">
            <h3 className="font-serif text-3xl text-[#1A1A1A] font-normal">
              Our Journey Timeline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {weddingData.timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-xl p-5 flex flex-col items-center text-center shadow-2xs hover:border-[#C5A059]/60 transition-colors"
              >
                {item.image && (
                  <div className="relative w-full h-44 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-1">
                  {item.year}
                </span>
                <h4 className="font-serif text-xl text-[#1A1A1A] mb-2 font-medium">
                  {item.title}
                </h4>
                <p className="text-xs text-[#5A5A5A] leading-relaxed font-sans font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
