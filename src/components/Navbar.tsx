"use client";

import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/data/weddingData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Our Story", href: "#story" },
    { name: "Wedding", href: "#details" },
    { name: "Schedule", href: "#timeline" },
    { name: "Venue", href: "#venue" },
    { name: "Gallery", href: "#gallery" },
    { name: "RSVP", href: "#rsvp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] py-3.5 shadow-xs"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-2 text-[#1A1A1A] transition-opacity hover:opacity-80"
          >
            <span className="font-serif text-2xl tracking-widest text-[#C5A059] font-medium">
              {weddingData.couple.initials}
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-[0.25em] text-[#5A5A5A] font-sans border-l border-[#E8E2D9] pl-3 py-0.5">
              {weddingData.date.displayDate}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] text-[#2D2D2D] hover:text-[#C5A059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, "#rsvp")}
              className="ml-2 px-5 py-2 rounded-full border border-[#C5A059] text-xs uppercase tracking-[0.2em] text-[#1A1A1A] hover:bg-[#C5A059] hover:text-white transition-all duration-300 shadow-2xs"
            >
              RSVP
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#1A1A1A] focus:outline-hidden hover:text-[#C5A059] transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-[#FAF8F5] flex flex-col justify-center items-center px-6 md:hidden"
          >
            <div className="mb-8 text-center">
              <span className="font-serif text-4xl text-[#C5A059] block mb-2 font-medium">
                {weddingData.couple.brideFirstName} & {weddingData.couple.groomFirstName}
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-[#5A5A5A]">
                {weddingData.date.displayDate} · {weddingData.venue.cityState}
              </p>
            </div>

            <nav className="flex flex-col items-center gap-6 mb-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-serif text-2xl text-[#1A1A1A] hover:text-[#C5A059] transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, "#rsvp")}
              className="px-8 py-3 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#C5A059] transition-colors shadow-sm"
            >
              Respond to Invitation
            </a>

            <div className="absolute bottom-8 text-center text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A] flex items-center gap-1.5">
              <span>Made with love</span>
              <Heart size={10} className="text-[#C5A059] fill-[#C5A059]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
