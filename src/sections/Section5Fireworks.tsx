import React from "react";
import { Sparkles, MousePointerClick } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { FireworksCanvas } from "../components/FireworksCanvas";
import { NavigationButton } from "../components/NavigationButton";

interface Section5FireworksProps {
  onNext: () => void;
  onBack: () => void;
  isActive: boolean;
}

export const Section5Fireworks: React.FC<Section5FireworksProps> = ({
  onNext,
  onBack,
  isActive,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden z-20">
      {/* Fullscreen Canvas Fireworks Engine */}
      <FireworksCanvas isActive={isActive} className="z-10" />

      {/* Top Header Floating Glass Card */}
      <div className="relative z-30 pt-16 px-4 sm:px-6 flex flex-col items-center text-center pointer-events-none">
        <div className="pointer-events-auto max-w-xl mx-auto p-5 sm:p-6 rounded-3xl border border-[#D6AD55]/30 bg-[#080D1C]/75 backdrop-blur-md shadow-2xl shadow-black/80">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6AD55]/40 bg-[#101B35]/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D6AD55]" />
            <span className="text-xs font-medium text-[#F5DDA0]">
              Midnight Sky Spectacle
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-serif-diwali font-bold tracking-tight text-gold-gradient mb-2">
            {siteConfig.text.fireworksTitle}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#FFF5DF]/80 leading-relaxed font-body">
            {siteConfig.text.fireworksSubtitle}
          </p>

          {/* Tap anywhere prompt */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#FFB347] font-medium animate-pulse">
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>{siteConfig.text.fireworksHint || "Tap anywhere on the sky to launch a firework!"}</span>
          </div>
        </div>
      </div>

      {/* Center sky area remains wide open for fireworks appreciation */}
      <div className="flex-1 pointer-events-none" />

      {/* Bottom Floating Navigation Controls */}
      <div className="relative z-30 pb-12 px-4 flex justify-center items-center gap-4">
        <div className="p-2 sm:p-3 rounded-full bg-[#080D1C]/80 border border-[#D6AD55]/30 backdrop-blur-lg shadow-2xl flex items-center gap-3">
          <NavigationButton onClick={onBack} variant="back" text="Back" />
          <NavigationButton
            onClick={onNext}
            text="View Your Moments"
            variant="next"
          />
        </div>
      </div>
    </div>
  );
};
