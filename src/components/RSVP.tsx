"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, Send, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingData } from "@/data/weddingData";

export default function RSVP() {
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isAttending, setIsAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [mealPreference, setMealPreference] = useState(
    weddingData.rsvpOptions.mealPreferences[0]
  );
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!contactInfo.trim()) {
      errs.contactInfo = "Email or phone number is required";
    } else if (
      contactInfo.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo)
    ) {
      errs.contactInfo = "Please enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C5A059", "#E6D5B8", "#FAF8F5", "#1A1A1A"],
      });
    }, 800);
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3 font-sans font-medium">
            Response Requested
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] font-normal">
            RSVP For Our Celebration
          </h2>
          <p className="text-sm text-[#5A5A5A] font-sans font-light mt-3">
            Kindly respond by August 1, 2026. We look forward to celebrating with you!
          </p>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#FFFDF9] border border-[#E8E2D9] rounded-2xl p-8 md:p-12 shadow-sm"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#E6D5B8]/40 text-[#C5A059] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-serif text-3xl text-[#1A1A1A] mb-3">
                Thank You, {fullName}!
              </h3>
              <p className="text-base text-[#5A5A5A] font-sans font-light max-w-md mx-auto leading-relaxed mb-6">
                {isAttending === "yes"
                  ? "Your response has been received. We are so excited to celebrate our special day with you in Florence!"
                  : "Thank you for letting us know. You will be missed, but we hold your warm wishes close in our hearts."}
              </p>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                <Heart size={14} className="fill-[#C5A059]" />
                <span>{weddingData.couple.brideFirstName} &amp; {weddingData.couple.groomFirstName}</span>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#1A1A1A] font-medium mb-2">
                  Full Name <span className="text-[#C5A059]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Lady Catherine de Bourgh"
                  className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#1A1A1A] focus:outline-hidden transition-colors ${
                    errors.fullName
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#E8E2D9] focus:border-[#C5A059]"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email / Phone */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#1A1A1A] font-medium mb-2">
                  Email or Phone Number <span className="text-[#C5A059]">*</span>
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. eleanor@example.com or +1 (555) 019-2834"
                  className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#1A1A1A] focus:outline-hidden transition-colors ${
                    errors.contactInfo
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#E8E2D9] focus:border-[#C5A059]"
                  }`}
                />
                {errors.contactInfo && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    <span>{errors.contactInfo}</span>
                  </p>
                )}
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#1A1A1A] font-medium mb-3">
                  Will You Be Attending?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setIsAttending("yes")}
                    className={`py-3.5 px-4 rounded-xl border text-xs uppercase tracking-[0.15em] font-medium transition-all cursor-pointer ${
                      isAttending === "yes"
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xs"
                        : "bg-[#FAF8F5] text-[#5A5A5A] border-[#E8E2D9] hover:border-[#C5A059]"
                    }`}
                  >
                    Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAttending("no")}
                    className={`py-3.5 px-4 rounded-xl border text-xs uppercase tracking-[0.15em] font-medium transition-all cursor-pointer ${
                      isAttending === "no"
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xs"
                        : "bg-[#FAF8F5] text-[#5A5A5A] border-[#E8E2D9] hover:border-[#C5A059]"
                    }`}
                  >
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {isAttending === "yes" && (
                <>
                  {/* Number of Guests */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#1A1A1A] font-medium mb-2">
                      Number of Guests Attending
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-sm text-[#1A1A1A] focus:outline-hidden focus:border-[#C5A059] transition-colors"
                    >
                      {Array.from(
                        { length: weddingData.rsvpOptions.maxGuestsAllowed },
                        (_, i) => i + 1
                      ).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Meal Preference */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#1A1A1A] font-medium mb-2">
                      Entrée Preference
                    </label>
                    <select
                      value={mealPreference}
                      onChange={(e) => setMealPreference(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-sm text-[#1A1A1A] focus:outline-hidden focus:border-[#C5A059] transition-colors"
                    >
                      {weddingData.rsvpOptions.mealPreferences.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Message / Dietary Restrictions */}
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#1A1A1A] font-medium mb-2">
                  Special Dietary Needs or Note for the Couple
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a wish or inform us of allergies..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-sm text-[#1A1A1A] focus:outline-hidden focus:border-[#C5A059] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#C5A059] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Response...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit RSVP</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
