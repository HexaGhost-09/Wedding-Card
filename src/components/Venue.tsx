"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation, Car, Compass } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function Venue() {
  return (
    <section id="venue" className="py-24 md:py-32 bg-[#F3EFEA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3 font-sans font-medium">
            The Location
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] font-normal">
            {weddingData.venue.name}
          </h2>
          <p className="text-sm text-[#5A5A5A] font-sans font-light mt-2">
            {weddingData.venue.subtitle} · {weddingData.venue.cityState}
          </p>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </div>

        {/* Venue Image & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          {/* Venue Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative min-h-[350px] lg:min-h-[480px] rounded-2xl overflow-hidden shadow-md border border-[#E8E2D9]"
          >
            <Image
              src={weddingData.venue.image}
              alt={weddingData.venue.name}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-[#E6D5B8] block mb-1">
                Bellosguardo Hills
              </span>
              <h3 className="font-serif text-2xl font-normal">
                Panoramic Views Over Florence
              </h3>
            </div>
          </motion.div>

          {/* Location Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-8 md:p-10 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-3">
                <Compass size={16} />
                <span>Venue Overview</span>
              </div>
              <h3 className="font-serif text-3xl text-[#1A1A1A] mb-4 font-normal">
                Historical Heritage
              </h3>
              <p className="text-sm text-[#5A5A5A] font-sans font-light leading-relaxed mb-6">
                {weddingData.venue.description}
              </p>

              {/* Address Highlight */}
              <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#1A1A1A] font-medium">Full Address</strong>
                    <span className="text-xs text-[#5A5A5A] leading-relaxed block">
                      {weddingData.venue.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Parking Info */}
              <div className="flex items-start gap-3 text-xs text-[#5A5A5A] mb-8">
                <Car size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                <span>{weddingData.venue.parkingInfo}</span>
              </div>
            </div>

            {/* Direct Google Maps Action Button */}
            <a
              href={weddingData.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#C5A059] transition-all duration-300 shadow-sm"
            >
              <Navigation size={15} />
              <span>Get Directions</span>
            </a>
          </motion.div>
        </div>

        {/* Minimal Interactive Map Representation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-2xs bg-[#FAF8F5] flex items-center justify-center text-center p-6"
        >
          {/* Styled Map Background simulation */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 grayscale contrast-125"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')`,
            }}
          />
          <div className="absolute inset-0 bg-[#FAF8F5]/70 backdrop-blur-2xs" />

          <div className="relative z-10 max-w-md">
            <div className="w-12 h-12 rounded-full bg-[#C5A059] text-white flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce">
              <MapPin size={24} />
            </div>
            <h4 className="font-serif text-2xl text-[#1A1A1A] mb-1 font-medium">
              {weddingData.venue.name}
            </h4>
            <p className="text-xs text-[#5A5A5A] uppercase tracking-[0.15em] mb-4">
              {weddingData.venue.cityState}
            </p>
            <a
              href={weddingData.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs uppercase tracking-[0.2em] text-[#C5A059] hover:text-[#1A1A1A] underline underline-offset-4 font-medium transition-colors"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
