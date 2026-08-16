"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { weddingData, GalleryImage } from "@/data/weddingData";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = ["All", "Couple", "Moments", "Venue", "Celebration"];

  const filteredImages =
    selectedCategory === "All"
      ? weddingData.gallery
      : weddingData.gallery.filter((img) => img.category === selectedCategory);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : (prev as number) - 1
    );
  }, [activeImageIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : (prev as number) + 1
    );
  }, [activeImageIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3 font-sans font-medium">
            Captured Moments
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] font-normal">
            Photo Gallery
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveImageIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#1A1A1A] text-white shadow-xs"
                  : "bg-[#FFFDF9] text-[#5A5A5A] border border-[#E8E2D9] hover:border-[#C5A059]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry-style Photo Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => setActiveImageIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#FFFDF9] shadow-2xs break-inside-avoid"
              >
                <div
                  className={`relative w-full ${
                    image.aspectRatio === "tall"
                      ? "h-96"
                      : image.aspectRatio === "wide"
                      ? "h-60"
                      : "h-80"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="text-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 size={24} className="mx-auto mb-2 text-[#E6D5B8]" />
                      <h4 className="font-serif text-xl font-medium mb-1">
                        {image.title}
                      </h4>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#E6D5B8]">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && filteredImages[activeImageIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
              onClick={() => setActiveImageIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                aria-label="Close Lightbox"
                className="absolute top-6 right-6 z-50 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={28} />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous Image"
                className="absolute left-4 md:left-8 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronLeft size={30} />
              </button>

              {/* Image Container */}
              <div
                className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[70vh] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={filteredImages[activeImageIndex].url}
                    alt={filteredImages[activeImageIndex].title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
                <div className="text-center mt-4 text-white">
                  <h3 className="font-serif text-2xl font-normal">
                    {filteredImages[activeImageIndex].title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] mt-1">
                    {activeImageIndex + 1} of {filteredImages.length} · {filteredImages[activeImageIndex].category}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next Image"
                className="absolute right-4 md:right-8 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronRight size={30} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
