"use client";

import { motion } from "framer-motion";
import { GlassWater, Utensils, Music, Heart, Clock } from "lucide-react";
import { weddingData, EventDetail } from "@/data/weddingData";

export default function EventTimeline() {
  const getIcon = (iconName: EventDetail["iconName"]) => {
    switch (iconName) {
      case "ring":
        return <Heart size={20} className="text-[#C5A059]" />;
      case "glass":
        return <GlassWater size={20} className="text-[#C5A059]" />;
      case "utensils":
        return <Utensils size={20} className="text-[#C5A059]" />;
      case "music":
        return <Music size={20} className="text-[#C5A059]" />;
      default:
        return <Heart size={20} className="text-[#C5A059]" />;
    }
  };

  return (
    <section id="timeline" className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3 font-sans font-medium">
            Schedule of Events
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] font-normal">
            The Wedding Day Order
          </h2>
          <p className="text-sm text-[#5A5A5A] font-sans font-light mt-3 max-w-lg mx-auto">
            A guided schedule for our guests to enjoy each milestone of the evening seamlessly.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#E8E2D9] -translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {weddingData.events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Badge */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#FFFDF9] border border-[#C5A059] flex items-center justify-center shadow-xs">
                    {getIcon(event.iconName)}
                  </div>

                  {/* Event Content Box */}
                  <div className="ml-16 md:ml-0 md:w-1/2 md:px-8 w-full">
                    <div className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-xl p-6 shadow-2xs hover:border-[#C5A059]/60 transition-colors">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-2">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#1A1A1A] mb-1 font-medium">
                        {event.title}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.15em] text-[#8A8A8A] block mb-3 font-sans">
                        {event.location} · {event.address}
                      </span>
                      <p className="text-sm text-[#5A5A5A] font-sans font-light leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty space for opposite column in desktop layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
