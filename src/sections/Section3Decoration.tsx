import React, { useState } from "react";
import { Sparkles, SunMedium, CheckCircle2 } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { NavigationButton } from "../components/NavigationButton";

interface Section3DecorationProps {
  onNext: () => void;
  onBack: () => void;
}

export const Section3Decoration: React.FC<Section3DecorationProps> = ({
  onNext,
  onBack,
}) => {
  // Set of lit item IDs
  const [litItems, setLitItems] = useState<Set<string>>(new Set());

  const items = siteConfig.decorationItems || [
    { id: "lantern-left", label: "Left Akash Kandil", type: "lantern" },
    { id: "lantern-right", label: "Right Akash Kandil", type: "lantern" },
    { id: "fairy-lights", label: "Fairy Lights Garland", type: "fairy" },
    { id: "brass-diya-1", label: "Left Brass Diya", type: "diya" },
    { id: "brass-diya-2", label: "Right Brass Diya", type: "diya" },
    { id: "rangoli-candle", label: "Center Floral Diya", type: "candle" },
  ];

  const toggleItem = (id: string) => {
    setLitItems((prev) => {
      const next = new Set(prev);
      next.add(id); // items remain lit
      return next;
    });
  };

  const handleLightAll = () => {
    const all = new Set(items.map((i) => i.id));
    setLitItems(all);
  };

  const allLit = litItems.size === items.length;
  const canProceed = litItems.size >= 2;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 z-20">
      {/* Dynamic ambient backlight based on number of lit lights */}
      <div
        className="absolute inset-0 bg-gradient-radial from-[#FFB347]/15 via-transparent to-transparent pointer-events-none transition-opacity duration-700"
        style={{ opacity: (litItems.size / items.length) * 0.9 }}
      />

      <div className="relative w-full max-w-4xl text-center flex flex-col items-center">
        {/* Editorial Subtitle Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6AD55]/30 bg-[#101B35]/70 backdrop-blur-md mb-4">
          <SunMedium className="w-3.5 h-3.5 text-[#D6AD55]" />
          <span className="text-xs sm:text-sm font-medium text-[#F5DDA0]">
            Interactive Festive Decoration
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif-diwali font-bold tracking-tight text-gold-gradient mb-3">
          {siteConfig.text.decorationTitle}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#FFF5DF]/80 leading-relaxed max-w-xl mb-6 font-body">
          {siteConfig.text.decorationSubtitle}
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8 text-xs sm:text-sm text-[#F5DDA0]">
          <span>Lights activated:</span>
          <span className="font-mono font-semibold text-[#FFB347]">
            {litItems.size} / {items.length}
          </span>
          {allLit && (
            <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold ml-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Fully Illuminated!
            </span>
          )}
        </div>

        {/* ================= Interactive Festive Courtyard Grid ================= */}
        <div className="w-full relative min-h-[360px] sm:min-h-[420px] rounded-3xl border border-[#D6AD55]/30 bg-[#101B35]/75 backdrop-blur-lg p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl shadow-black/80">
          {/* Top Hanging Fairy Lights Bar */}
          <div
            onClick={() => toggleItem("fairy-lights")}
            role="button"
            tabIndex={0}
            aria-label="Toggle Fairy Lights Garland"
            className="w-full cursor-pointer group flex flex-col items-center py-2 transition-transform hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center w-full px-2 sm:px-8">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
                const isLit = litItems.has("fairy-lights");
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-[1px] h-3 sm:h-4 bg-[#D6AD55]/30" />
                    <div
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-500 ${
                        isLit
                          ? "bg-[#FFF5DF] shadow-[0_0_15px_#FFB347] scale-110"
                          : "bg-[#2A3756] border border-[#D6AD55]/30 group-hover:bg-[#FFB347]/40"
                      }`}
                      style={{
                        animation: isLit ? `flameFlicker ${1.2 + (idx % 3) * 0.3}s infinite` : "none",
                        animationDelay: `${idx * 0.15}s`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] text-[#F5DDA0]/70 mt-1 font-mono tracking-wide">
              {litItems.has("fairy-lights") ? "✨ Fairy Lights Glowing" : "Tap string to light fairy bulbs"}
            </span>
          </div>

          {/* Middle Row: Left Lantern, Center Rangoli Diya, Right Lantern */}
          <div className="grid grid-cols-3 gap-4 items-center justify-items-center py-6">
            {/* Left Akash Kandil Lantern */}
            <button
              onClick={() => toggleItem("lantern-left")}
              aria-label="Light Left Akash Kandil Lantern"
              className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <div
                  className={`absolute -inset-3 rounded-full blur-xl transition-opacity duration-700 ${
                    litItems.has("lantern-left")
                      ? "bg-[#FFB347]/60 opacity-100"
                      : "opacity-0 group-hover:opacity-30 bg-[#FFB347]/20"
                  }`}
                />
                <svg width="56" height="74" viewBox="0 0 60 80" className="relative drop-shadow-md">
                  <path d="M22 6 L38 6 L35 14 L25 14 Z" fill="#D6AD55" />
                  <polygon
                    points="30,14 52,40 30,66 8,40"
                    fill={litItems.has("lantern-left") ? "#2A1805" : "#0B1224"}
                    stroke="#D6AD55"
                    strokeWidth="2"
                  />
                  <circle
                    cx="30"
                    cy="40"
                    r={litItems.has("lantern-left") ? "9" : "4"}
                    fill={litItems.has("lantern-left") ? "#FFB347" : "#4A5568"}
                    className={litItems.has("lantern-left") ? "animate-pulse" : ""}
                  />
                  <line x1="20" y1="66" x2="16" y2="80" stroke="#D6AD55" strokeWidth="1.5" />
                  <line x1="30" y1="66" x2="30" y2="85" stroke="#FFB347" strokeWidth="1.8" />
                  <line x1="40" y1="66" x2="44" y2="80" stroke="#D6AD55" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-[#F5DDA0] mt-2 font-medium">
                {litItems.has("lantern-left") ? "Akash Kandil ✨" : "Tap to Light"}
              </span>
            </button>

            {/* Center Floral Rangoli Diya */}
            <button
              onClick={() => toggleItem("rangoli-candle")}
              aria-label="Light Center Floral Rangoli Diya"
              className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <div
                  className={`absolute -inset-4 rounded-full blur-xl transition-opacity duration-700 ${
                    litItems.has("rangoli-candle")
                      ? "bg-[#FFB347]/70 opacity-100"
                      : "opacity-0 group-hover:opacity-40 bg-[#FFB347]/30"
                  }`}
                />
                <svg width="84" height="84" viewBox="0 0 100 100" className="relative drop-shadow-xl">
                  {/* Floral petals */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <circle
                      key={i}
                      cx={50 + 26 * Math.cos((angle * Math.PI) / 180)}
                      cy={50 + 26 * Math.sin((angle * Math.PI) / 180)}
                      r="12"
                      fill={i % 2 === 0 ? "#FF5722" : "#FFC107"}
                      opacity="0.8"
                    />
                  ))}
                  {/* Diya dish */}
                  <ellipse cx="50" cy="50" rx="20" ry="14" fill="#6B3A0E" stroke="#D6AD55" strokeWidth="1.5" />
                  {/* Flame */}
                  {litItems.has("rangoli-candle") ? (
                    <g className="animate-flame" style={{ transformOrigin: "50px 44px" }}>
                      <path d="M50 20 C56 32, 58 40, 56 46 C54 50, 46 50, 44 46 C42 40, 44 32, 50 20 Z" fill="#FFB347" />
                      <circle cx="50" cy="42" r="4" fill="#FFFFFF" />
                    </g>
                  ) : (
                    <ellipse cx="50" cy="50" rx="14" ry="8" fill="#3D2005" />
                  )}
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-[#F5DDA0] mt-2 font-medium">
                {litItems.has("rangoli-candle") ? "Rangoli Lamp ✨" : "Tap Center Diya"}
              </span>
            </button>

            {/* Right Akash Kandil Lantern */}
            <button
              onClick={() => toggleItem("lantern-right")}
              aria-label="Light Right Akash Kandil Lantern"
              className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <div
                  className={`absolute -inset-3 rounded-full blur-xl transition-opacity duration-700 ${
                    litItems.has("lantern-right")
                      ? "bg-[#FFB347]/60 opacity-100"
                      : "opacity-0 group-hover:opacity-30 bg-[#FFB347]/20"
                  }`}
                />
                <svg width="56" height="74" viewBox="0 0 60 80" className="relative drop-shadow-md">
                  <path d="M22 6 L38 6 L35 14 L25 14 Z" fill="#D6AD55" />
                  <polygon
                    points="30,14 52,40 30,66 8,40"
                    fill={litItems.has("lantern-right") ? "#2A1805" : "#0B1224"}
                    stroke="#D6AD55"
                    strokeWidth="2"
                  />
                  <circle
                    cx="30"
                    cy="40"
                    r={litItems.has("lantern-right") ? "9" : "4"}
                    fill={litItems.has("lantern-right") ? "#FFB347" : "#4A5568"}
                    className={litItems.has("lantern-right") ? "animate-pulse" : ""}
                  />
                  <line x1="20" y1="66" x2="16" y2="80" stroke="#D6AD55" strokeWidth="1.5" />
                  <line x1="30" y1="66" x2="30" y2="85" stroke="#FFB347" strokeWidth="1.8" />
                  <line x1="40" y1="66" x2="44" y2="80" stroke="#D6AD55" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-[#F5DDA0] mt-2 font-medium">
                {litItems.has("lantern-right") ? "Akash Kandil ✨" : "Tap to Light"}
              </span>
            </button>
          </div>

          {/* Bottom Row: Left and Right Brass Kuthuvilakku floor lamps */}
          <div className="flex justify-around items-end pt-2">
            {/* Left Brass Stand Diya */}
            <button
              onClick={() => toggleItem("brass-diya-1")}
              aria-label="Light Left Brass Lamp"
              className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#080D1C]/60 border border-[#D6AD55]/30 hover:border-[#D6AD55] cursor-pointer transition-all active:scale-95"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  litItems.has("brass-diya-1")
                    ? "bg-[#FFB347] shadow-[0_0_12px_#FFB347]"
                    : "bg-[#1E293B]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#080D1C]" />
              </div>
              <span className="text-xs font-medium text-[#FFF5DF]">
                {litItems.has("brass-diya-1") ? "Brass Lamp Lit ✨" : "Light Brass Diya"}
              </span>
            </button>

            {/* Quick Action: Light All */}
            {!allLit && (
              <button
                onClick={handleLightAll}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D6AD55]/40 bg-[#D6AD55]/10 text-xs font-medium text-[#F5DDA0] hover:bg-[#D6AD55]/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D6AD55]" />
                <span>{siteConfig.text.lightAllButton || "Light All"}</span>
              </button>
            )}

            {/* Right Brass Stand Diya */}
            <button
              onClick={() => toggleItem("brass-diya-2")}
              aria-label="Light Right Brass Lamp"
              className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#080D1C]/60 border border-[#D6AD55]/30 hover:border-[#D6AD55] cursor-pointer transition-all active:scale-95"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  litItems.has("brass-diya-2")
                    ? "bg-[#FFB347] shadow-[0_0_12px_#FFB347]"
                    : "bg-[#1E293B]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#080D1C]" />
              </div>
              <span className="text-xs font-medium text-[#FFF5DF]">
                {litItems.has("brass-diya-2") ? "Brass Lamp Lit ✨" : "Light Brass Diya"}
              </span>
            </button>
          </div>
        </div>

        {/* Revealed Navigation Controls */}
        <div
          className={`mt-10 flex items-center gap-4 transition-all duration-700 ${
            canProceed
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <NavigationButton onClick={onBack} variant="back" text="Back" />
          <NavigationButton
            onClick={onNext}
            text="Unwrap Festive Surprise"
            variant="next"
          />
        </div>
      </div>
    </div>
  );
};
