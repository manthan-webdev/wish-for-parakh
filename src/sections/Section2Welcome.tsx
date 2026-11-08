import React, { useState } from "react";
import { Sparkles, Flame } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { NavigationButton } from "../components/NavigationButton";

interface Section2WelcomeProps {
  onNext: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export const Section2Welcome: React.FC<Section2WelcomeProps> = ({
  onNext,
  onBack,
  showBack = false,
}) => {
  const [isDiyaLit, setIsDiyaLit] = useState<boolean>(false);
  const [sparkleAnim, setSparkleAnim] = useState<boolean>(false);

  const handleLightDiya = () => {
    if (isDiyaLit) return;
    setIsDiyaLit(true);
    setSparkleAnim(true);
    setTimeout(() => setSparkleAnim(false), 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 z-20">
      {/* Background radial ambient glow when diya is lit */}
      <div
        className={`absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#FFB347]/25 via-[#D6AD55]/20 to-transparent blur-3xl pointer-events-none transition-all duration-1000 ${
          isDiyaLit ? "opacity-100 scale-105" : "opacity-20 scale-95"
        }`}
      />

      <div className="relative w-full max-w-2xl text-center flex flex-col items-center">
        {/* Subtle royal badge / kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6AD55]/30 bg-[#101B35]/70 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D6AD55]" />
          <span className="text-xs sm:text-sm font-medium text-[#F5DDA0] tracking-wide">
            Shubh Deepavali Celebrations
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl font-serif-diwali font-bold tracking-tight text-gold-gradient leading-tight mb-4">
          {siteConfig.friendName.toUpperCase()},{" "}
          <span className="block sm:inline">{siteConfig.text.welcomeHeaderSuffix}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#FFF5DF]/85 leading-relaxed max-w-xl mb-8 sm:mb-10 font-body">
          {siteConfig.text.welcomeMessage}
        </p>

        {/* ================= Interactive Diya Component ================= */}
        <div className="relative flex flex-col items-center my-4 group">
          {/* Flame Ambient Glow */}
          <div
            className={`absolute -top-16 w-32 h-32 rounded-full bg-gradient-to-t from-[#FFB347]/70 to-[#FFF5DF]/40 blur-2xl pointer-events-none transition-all duration-700 ${
              isDiyaLit ? "opacity-100 scale-125" : "opacity-0 scale-50"
            }`}
          />

          {/* Diya Interactive Click Target */}
          <button
            onClick={handleLightDiya}
            aria-label={isDiyaLit ? "Diya is glowing brightly" : "Click to light the Diya"}
            className="relative cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
          >
            {/* The SVG Diya with realistic flame and oil reflection */}
            <div className="relative w-48 sm:w-56 h-36 flex items-center justify-center">
              <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-2xl">
                <defs>
                  {/* Brass clay gradient */}
                  <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5DDA0" />
                    <stop offset="35%" stopColor="#D6AD55" />
                    <stop offset="70%" stopColor="#A88128" />
                    <stop offset="100%" stopColor="#5E430E" />
                  </linearGradient>

                  {/* Oil reflection gradient */}
                  <linearGradient id="oilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB347" stopOpacity={isDiyaLit ? "0.9" : "0.3"} />
                    <stop offset="100%" stopColor="#7A4200" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Flame outer gradient */}
                  <radialGradient id="flameOuter" cx="50%" cy="80%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="25%" stopColor="#FFF5DF" />
                    <stop offset="55%" stopColor="#FFB347" />
                    <stop offset="85%" stopColor="#FF5722" />
                    <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
                  </radialGradient>

                  {/* Flame core gradient */}
                  <linearGradient id="flameCore" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.8" />
                    <stop offset="20%" stopColor="#FFFFFF" />
                    <stop offset="70%" stopColor="#FFF5DF" />
                    <stop offset="100%" stopColor="#FFB347" />
                  </linearGradient>
                </defs>

                {/* Base Pedestal / Foot */}
                <ellipse cx="100" cy="132" rx="36" ry="7" fill="url(#brassGrad)" />
                <path d="M82 132 C85 124, 90 118, 92 114 L108 114 C110 118, 115 124, 118 132 Z" fill="url(#brassGrad)" />

                {/* Diya Bowl (Outer Silhouette) */}
                <path
                  d="M25 78 C25 116, 175 116, 175 78 C160 84, 120 90, 100 90 C80 90, 40 84, 25 78 Z"
                  fill="url(#brassGrad)"
                  stroke="#F5DDA0"
                  strokeWidth="1.2"
                />

                {/* Decorative Filigree Engravings on Rim */}
                <path
                  d="M32 79 Q45 86 60 88 Q75 90 100 90 Q125 90 140 88 Q155 86 168 79"
                  fill="none"
                  stroke="#FFF5DF"
                  strokeWidth="1"
                  strokeDasharray="2,3"
                />

                {/* Diya Inner Cavity / Oil Well */}
                <ellipse cx="100" cy="78" rx="72" ry="14" fill="#2E1C08" stroke="#D6AD55" strokeWidth="1" />
                <ellipse cx="100" cy="79" rx="66" ry="11" fill="url(#oilGrad)" />

                {/* Cotton Wick tip */}
                <path d="M98 75 C97 70, 99 64, 100 58 C101 64, 103 70, 102 75 Z" fill="#2A1B0E" />

                {/* ================= Flame (Visible when Lit) ================= */}
                {isDiyaLit && (
                  <g className="animate-flame" style={{ transformOrigin: "100px 65px" }}>
                    {/* Outer Radiant Flame Aura */}
                    <path
                      d="M100 8 C115 32, 122 46, 118 64 C114 74, 86 74, 82 64 C78 46, 85 32, 100 8 Z"
                      fill="url(#flameOuter)"
                    />
                    {/* Inner Intense Teardrop Core */}
                    <path
                      d="M100 24 C108 40, 112 50, 109 63 C106 70, 94 70, 91 63 C88 50, 92 40, 100 24 Z"
                      fill="url(#flameCore)"
                    />
                  </g>
                )}
              </svg>

              {/* Sparkle burst on initial light */}
              {sparkleAnim && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <span
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-[#FFF5DF] rounded-full animate-ping"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-40px)`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </button>

          {/* Diya status label */}
          <p className="mt-3 text-xs sm:text-sm font-medium tracking-wide text-[#F5DDA0]">
            {isDiyaLit ? siteConfig.text.diyaLitStatus : "Tap the diya to ignite the festive flame ✨"}
          </p>

          {/* Light Diya Button if not yet lit */}
          {!isDiyaLit && (
            <button
              onClick={handleLightDiya}
              className="mt-4 px-6 py-2.5 rounded-full border border-[#D6AD55]/60 bg-[#101B35]/80 text-[#FFF5DF] hover:border-[#D6AD55] hover:bg-[#D6AD55] hover:text-[#080D1C] font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center gap-2 group"
            >
              <Flame className="w-4 h-4 text-[#FFB347] group-hover:text-[#080D1C]" />
              <span>{siteConfig.text.lightDiyaButton}</span>
            </button>
          )}
        </div>

        {/* Revealed Navigation Controls once Diya is lit */}
        <div
          className={`mt-8 sm:mt-10 flex items-center gap-4 transition-all duration-700 ${
            isDiyaLit
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {showBack && onBack && (
            <NavigationButton onClick={onBack} variant="back" text="Back" />
          )}
          <NavigationButton
            onClick={onNext}
            text="Continue the Journey"
            variant="next"
          />
        </div>
      </div>
    </div>
  );
};
