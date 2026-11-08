import React from "react";

export const HangingLanterns: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 w-full pointer-events-none overflow-hidden h-44 z-10 flex justify-between px-4 sm:px-12 opacity-85">
      {/* Left Hanging Lantern */}
      <div className="flex flex-col items-center animate-sway">
        {/* String */}
        <div className="w-[1.5px] h-14 bg-gradient-to-b from-[#D6AD55]/20 to-[#D6AD55]/80" />
        {/* Akash Kandil Lantern body */}
        <div className="relative">
          <svg width="48" height="64" viewBox="0 0 60 80" fill="none" className="drop-shadow-[0_0_14px_rgba(255,179,71,0.7)]">
            {/* Top cap */}
            <path d="M22 6 L38 6 L35 14 L25 14 Z" fill="#D6AD55" />
            {/* Diamond central lattice */}
            <polygon points="30,14 52,40 30,66 8,40" fill="#101B35" stroke="#D6AD55" strokeWidth="2.5" />
            <polygon points="30,22 44,40 30,58 16,40" fill="#D6AD55" fillOpacity="0.3" stroke="#F5DDA0" strokeWidth="1" />
            {/* Center glowing core */}
            <circle cx="30" cy="40" r="8" fill="#FFB347" className="animate-pulse" />
            <circle cx="30" cy="40" r="14" fill="#FFB347" fillOpacity="0.25" />
            {/* Hanging tassels */}
            <line x1="20" y1="66" x2="16" y2="80" stroke="#D6AD55" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="25" y1="66" x2="23" y2="82" stroke="#FFB347" strokeWidth="1.5" />
            <line x1="30" y1="66" x2="30" y2="85" stroke="#F5DDA0" strokeWidth="2" />
            <line x1="35" y1="66" x2="37" y2="82" stroke="#FFB347" strokeWidth="1.5" />
            <line x1="40" y1="66" x2="44" y2="80" stroke="#D6AD55" strokeWidth="1.5" strokeDasharray="2,2" />
          </svg>
        </div>
      </div>

      {/* Center fairy lights garland string */}
      <div className="hidden md:flex flex-1 justify-around items-start pt-2 px-8">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div key={idx} className="flex flex-col items-center" style={{ transform: `translateY(${Math.sin((idx / 5) * Math.PI) * 16}px)` }}>
            <div className="w-[1px] h-3 bg-[#D6AD55]/40" />
            <div
              className="w-2.5 h-3.5 rounded-full bg-[#FFB347] shadow-[0_0_12px_#FFB347]"
              style={{
                animation: `flameFlicker ${1.4 + (idx % 3) * 0.4}s ease-in-out infinite`,
                animationDelay: `${idx * 0.25}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Right Hanging Lantern */}
      <div className="flex flex-col items-center animate-sway-delayed">
        {/* String */}
        <div className="w-[1.5px] h-18 bg-gradient-to-b from-[#D6AD55]/20 to-[#D6AD55]/80" />
        {/* Akash Kandil Lantern body */}
        <div className="relative">
          <svg width="48" height="64" viewBox="0 0 60 80" fill="none" className="drop-shadow-[0_0_14px_rgba(255,179,71,0.7)]">
            <path d="M22 6 L38 6 L35 14 L25 14 Z" fill="#D6AD55" />
            <polygon points="30,14 52,40 30,66 8,40" fill="#101B35" stroke="#D6AD55" strokeWidth="2.5" />
            <polygon points="30,22 44,40 30,58 16,40" fill="#D6AD55" fillOpacity="0.3" stroke="#F5DDA0" strokeWidth="1" />
            <circle cx="30" cy="40" r="8" fill="#FFB347" className="animate-pulse" />
            <circle cx="30" cy="40" r="14" fill="#FFB347" fillOpacity="0.25" />
            <line x1="20" y1="66" x2="16" y2="80" stroke="#D6AD55" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="25" y1="66" x2="23" y2="82" stroke="#FFB347" strokeWidth="1.5" />
            <line x1="30" y1="66" x2="30" y2="85" stroke="#F5DDA0" strokeWidth="2" />
            <line x1="35" y1="66" x2="37" y2="82" stroke="#FFB347" strokeWidth="1.5" />
            <line x1="40" y1="66" x2="44" y2="80" stroke="#D6AD55" strokeWidth="1.5" strokeDasharray="2,2" />
          </svg>
        </div>
      </div>
    </div>
  );
};
