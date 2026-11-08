import React, { useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { NavigationButton } from "../components/NavigationButton";

interface Section4HamperProps {
  onNext: () => void;
  onBack: () => void;
}

export const Section4Hamper: React.FC<Section4HamperProps> = ({
  onNext,
  onBack,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkleBurst, setSparkleBurst] = useState(false);

  const handleOpenHamper = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    setSparkleBurst(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 700);

    setTimeout(() => {
      setSparkleBurst(false);
    }, 1800);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 z-20">
      {/* Subtle ambient lighting behind the gift box */}
      <div
        className={`absolute w-96 sm:w-[580px] h-96 sm:h-[580px] rounded-full bg-gradient-to-tr from-[#D6AD55]/20 via-[#FFB347]/15 to-transparent blur-3xl pointer-events-none transition-all duration-1000 ${
          isOpen ? "opacity-100 scale-110" : "opacity-30 scale-95"
        }`}
      />

      <div className="relative w-full max-w-3xl text-center flex flex-col items-center">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6AD55]/30 bg-[#101B35]/70 backdrop-blur-md mb-4">
          <Gift className="w-3.5 h-3.5 text-[#D6AD55]" />
          <span className="text-xs sm:text-sm font-medium text-[#F5DDA0]">
            Festive Gift Hamper
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif-diwali font-bold tracking-tight text-gold-gradient mb-3">
          {siteConfig.text.hamperTitle}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#FFF5DF]/80 leading-relaxed max-w-xl mb-8 font-body">
          {siteConfig.text.hamperSubtitle}
        </p>

        {/* ================= Realistic Luxury Gift Hamper ================= */}
        <div className="relative w-full max-w-lg my-2 flex flex-col items-center">
          {/* Subtle golden sparkle particles on unwrap */}
          {sparkleBurst && (
            <div className="absolute -inset-10 flex items-center justify-center pointer-events-none z-40">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => (
                <span
                  key={idx}
                  className="absolute w-2 h-2 rounded-full bg-[#FFF5DF] shadow-[0_0_12px_#FFB347] animate-ping"
                  style={{
                    transform: `rotate(${deg}deg) translateY(-110px)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Realistic Gift Box Unit */}
          <div
            onClick={!isOpen ? handleOpenHamper : undefined}
            role="button"
            tabIndex={0}
            aria-label={isOpen ? "Diwali gift hamper is open" : "Click to unwrap Diwali gift hamper"}
            className={`relative w-full max-w-[420px] aspect-[4/3.8] rounded-2xl shadow-2xl transition-all duration-700 select-none ${
              !isOpen ? "cursor-pointer group hover:scale-[1.015] active:scale-[0.99]" : ""
            }`}
          >
            {/* Realistic Closed Box Outer Container with 3D Depth */}
            <div
              className={`absolute inset-0 z-30 rounded-2xl bg-gradient-to-br from-[#121E38] via-[#0E172C] to-[#080D1C] border border-[#D6AD55]/70 shadow-2xl overflow-hidden transition-all duration-700 ease-out origin-top-left ${
                isOpen
                  ? "-translate-y-24 -translate-x-12 -rotate-12 opacity-0 pointer-events-none scale-90"
                  : "translate-y-0 translate-x-0 rotate-0 opacity-100"
              }`}
            >
              {/* Subtle Gold Foil Geometric Pattern on Lid */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg width="100%" height="100%">
                  <pattern id="hamper-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="none" stroke="#D6AD55" strokeWidth="0.8" />
                    <circle cx="20" cy="20" r="3" fill="#D6AD55" opacity="0.6" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#hamper-pattern)" />
                </svg>
              </div>

              {/* Realistic Gold Satin Vertical & Horizontal Ribbons */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 bg-gradient-to-r from-[#B8860B] via-[#F5DDA0] to-[#B8860B] shadow-[0_0_15px_rgba(0,0,0,0.5)] border-x border-[#F5DDA0]/60 flex items-center justify-center">
                <div className="w-[1px] h-full bg-[#FFF5DF]/40" />
              </div>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 sm:h-12 bg-gradient-to-b from-[#B8860B] via-[#F5DDA0] to-[#B8860B] shadow-[0_0_15px_rgba(0,0,0,0.5)] border-y border-[#F5DDA0]/60 flex items-center justify-center">
                <div className="w-full h-[1px] bg-[#FFF5DF]/40" />
              </div>

              {/* Central Tied Satin Ribbon Rosette Bow with Gold Shagun Emblem */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Left ribbon loop */}
                  <div className="absolute left-1 w-9 h-11 rounded-full border-2 border-[#F5DDA0] bg-gradient-to-br from-[#F5DDA0] via-[#D6AD55] to-[#8B6508] rotate-[-35deg] shadow-lg" />
                  {/* Right ribbon loop */}
                  <div className="absolute right-1 w-9 h-11 rounded-full border-2 border-[#F5DDA0] bg-gradient-to-bl from-[#F5DDA0] via-[#D6AD55] to-[#8B6508] rotate-[35deg] shadow-lg" />
                  {/* Top-left loop */}
                  <div className="absolute -top-1 w-8 h-9 rounded-full border border-[#FFF5DF] bg-[#D6AD55] rotate-[-15deg] shadow-md" />
                  {/* Top-right loop */}
                  <div className="absolute -top-1 w-8 h-9 rounded-full border border-[#FFF5DF] bg-[#D6AD55] rotate-[15deg] shadow-md" />
                  {/* Center sparkling jewel / medallion */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B6508] via-[#F5DDA0] to-[#FFF5DF] border-2 border-[#FFF5DF] shadow-xl flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#080D1C]" />
                  </div>
                </div>

                {/* Shubh Deepavali Gold Embossed Badge */}
                <div className="mt-1 px-4 py-1 rounded-full bg-[#080D1C]/90 border border-[#D6AD55] shadow-lg text-[11px] font-serif-diwali tracking-widest text-[#F5DDA0] uppercase">
                  Royal Festive Hamper
                </div>
              </div>

              {/* Bottom Subtle Prompt */}
              <div className="absolute bottom-3 inset-x-0 text-center">
                <span className="text-[11px] text-[#F5DDA0]/80 tracking-wider font-medium">
                  Tap to unwrap the festive box
                </span>
              </div>
            </div>

            {/* Realistic Open Hamper Tray with Authentic Sweets & Delights */}
            <div
              className={`relative z-10 w-full h-full rounded-2xl bg-gradient-to-b from-[#101B35] via-[#0B1326] to-[#070B18] border-2 border-[#D6AD55] p-3 sm:p-4 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-700 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Compartments Inner Velvet Gold Frame */}
              <div className="relative w-full h-full rounded-xl bg-[#090E1E] border border-[#D6AD55]/40 p-2 sm:p-3 flex flex-col justify-between">
                {/* Photorealistic Hamper Sweets Presentation */}
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#D6AD55]/30 shadow-inner">
                  <img
                    src="/assets/images/hamper_realistic.jpg"
                    alt="Authentic Luxury Diwali Hamper with Kaju Katli, Motichoor Ladoos, and Almonds"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If the photographic asset is missing, display the styled high-fidelity SVG sweets tray
                      e.currentTarget.style.display = "none";
                      const fallback = document.getElementById("realistic-hamper-fallback");
                      if (fallback) fallback.style.display = "grid";
                    }}
                  />

                  {/* High-Fidelity SVG Fallback Tray if image isn't loaded */}
                  <div
                    id="realistic-hamper-fallback"
                    style={{ display: "none" }}
                    className="w-full h-full grid grid-cols-2 gap-2 p-2 bg-[#0C1427]"
                  >
                    <div className="rounded-lg bg-[#14203D] border border-[#D6AD55]/30 p-2 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl mb-1">💎</span>
                      <span className="text-xs font-semibold text-[#FFF5DF]">Silver Kaju Katli</span>
                      <span className="text-[10px] text-[#D6AD55]">Diamond Cashew Sweets</span>
                    </div>
                    <div className="rounded-lg bg-[#14203D] border border-[#D6AD55]/30 p-2 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl mb-1">🟡</span>
                      <span className="text-xs font-semibold text-[#FFF5DF]">Motichoor Ladoos</span>
                      <span className="text-[10px] text-[#D6AD55]">Pure Ghee Saffron</span>
                    </div>
                    <div className="rounded-lg bg-[#14203D] border border-[#D6AD55]/30 p-2 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl mb-1">🌰</span>
                      <span className="text-xs font-semibold text-[#FFF5DF]">Roasted Almonds</span>
                      <span className="text-[10px] text-[#D6AD55]">Brass Katori</span>
                    </div>
                    <div className="rounded-lg bg-[#14203D] border border-[#D6AD55]/30 p-2 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl mb-1">🪔</span>
                      <span className="text-xs font-semibold text-[#FFF5DF]">Brass Festive Diya</span>
                      <span className="text-[10px] text-[#D6AD55]">Marigold Petals</span>
                    </div>
                  </div>

                  {/* Elegant Golden Rim Glow */}
                  <div className="absolute inset-0 pointer-events-none border border-[#F5DDA0]/30 rounded-lg shadow-[inset_0_0_20px_rgba(214,173,85,0.25)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Unwrap Button (Visible when closed) */}
          {!isOpen && (
            <button
              onClick={handleOpenHamper}
              className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D6AD55] via-[#F5DDA0] to-[#D6AD55] text-[#080D1C] font-semibold text-sm sm:text-base shadow-[0_0_20px_rgba(214,173,85,0.4)] hover:shadow-[0_0_30px_rgba(255,179,71,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-[#080D1C]" />
              <span>{siteConfig.text.openGiftButton}</span>
            </button>
          )}

          {/* Open Hamper Sweet Item Summary Pills (Clean, unboxed metadata without message card) */}
          {isOpen && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-[#F5DDA0]/90 animate-fade-in font-medium">
              <span>Silver Vark Kaju Katli</span>
              <span>·</span>
              <span>Saffron Motichoor Ladoos</span>
              <span>·</span>
              <span>Roasted California Almonds</span>
              <span>·</span>
              <span>Royal Brass Diya</span>
            </div>
          )}
        </div>

        {/* Revealed Navigation Controls once Hamper is open (NO WRITTEN NOTE) */}
        <div
          className={`mt-10 flex items-center gap-4 transition-all duration-700 ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <NavigationButton onClick={onBack} variant="back" text="Back" />
          <NavigationButton
            onClick={onNext}
            text="Watch The Fireworks"
            variant="next"
          />
        </div>
      </div>
    </div>
  );
};
