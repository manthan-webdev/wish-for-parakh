import React, { useState } from "react";
import { Sparkles, RotateCcw, Share2, Heart, Check } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { FireworksCanvas } from "../components/FireworksCanvas";

interface Section8FinalProps {
  onReplay: () => void;
  isActive: boolean;
}

export const Section8Final: React.FC<Section8FinalProps> = ({
  onReplay,
  isActive,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden z-20 text-center">
      {/* Background Fullscreen Fireworks Canvas */}
      <FireworksCanvas isActive={isActive} className="z-10 opacity-75" />

      {/* Central Radiating Ambient Glow */}
      <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-[#FFB347]/20 via-[#D6AD55]/15 to-transparent blur-3xl pointer-events-none z-10" />

      {/* Main Glass Finale Card */}
      <div className="relative z-30 max-w-2xl w-full p-8 sm:p-12 rounded-3xl border border-[#D6AD55]/40 bg-[#080D1C]/85 backdrop-blur-xl shadow-2xl shadow-black/80 flex flex-col items-center animate-fade-in">
        {/* Festive Golden Crown / Diya Motif */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#101B35] to-[#080D1C] border border-[#D6AD55]/60 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(255,179,71,0.4)]">
          <Sparkles className="w-8 h-8 text-[#FFB347] animate-pulse" />
        </div>

        {/* Grand Heading */}
        <h1 className="text-3xl sm:text-5xl font-serif-diwali font-bold tracking-tight text-gold-gradient leading-tight mb-4">
          {siteConfig.text.finalHeading}
        </h1>

        {/* Main Message */}
        <p className="text-base sm:text-lg text-[#FFF5DF]/90 leading-relaxed font-body mb-6 max-w-lg">
          {siteConfig.text.finalMessage}
        </p>

        {/* Small Closing Line */}
        <p className="text-xs sm:text-sm text-[#F5DDA0]/80 italic font-body mb-8">
          "{siteConfig.text.finalClosing}"
        </p>

        {/* Row of Glowing Decorative Diyas */}
        <div className="flex items-center gap-6 mb-8 py-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <div
                className="w-3 h-5 rounded-full bg-gradient-to-t from-[#FF5722] via-[#FFB347] to-[#FFF5DF] shadow-[0_0_15px_#FFB347]"
                style={{
                  animation: `flameFlicker ${1.4 + i * 0.3}s ease-in-out infinite`,
                }}
              />
              {/* Diya Base */}
              <div className="w-7 h-3 rounded-b-full bg-gradient-to-r from-[#D6AD55] to-[#8B6508] border border-[#FFF5DF]/40 -mt-0.5" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Replay Button */}
          <button
            onClick={onReplay}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#D6AD55] via-[#F5DDA0] to-[#D6AD55] text-[#080D1C] font-semibold text-sm shadow-[0_0_20px_rgba(214,173,85,0.4)] hover:shadow-[0_0_30px_rgba(255,179,71,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
            <span>{siteConfig.text.replayButton || "Experience Again"}</span>
          </button>

          {/* Share / Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D6AD55]/40 bg-[#101B35]/70 hover:border-[#D6AD55] hover:bg-[#101B35] text-[#FFF5DF] font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#D6AD55]" />
                <span>Share Surprise</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Credit */}
        <div className="mt-8 pt-6 border-t border-[#D6AD55]/20 flex items-center gap-2 text-xs text-[#FFF5DF]/50">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
          <span>by {siteConfig.yourName} for {siteConfig.friendName}</span>
        </div>
      </div>
    </div>
  );
};
