import React, { useState } from "react";
import { Lock, Sparkles, KeyRound } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { audioManager } from "../utils/audioManager";

interface Section1PasswordProps {
  onUnlock: () => void;
}

export const Section1Password: React.FC<Section1PasswordProps> = ({ onUnlock }) => {
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) {
      setErrorMsg("Please enter the secret code ✨");
      return;
    }

    setIsSubmitting(true);

    const cleanInput = inputVal.trim().toLowerCase();
    const correctPassword = (siteConfig.password || "").trim().toLowerCase();

    if (cleanInput === correctPassword) {
      setErrorMsg("");
      // Start background music upon user's intentional unlock
      audioManager.startMusic();
      setTimeout(() => {
        onUnlock();
      }, 400);
    } else {
      setIsSubmitting(false);
      setErrorMsg(siteConfig.text.wrongPassword || "Oops! That's not the secret code.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 z-20">
      {/* Decorative Golden Aura Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#FFB347]/15 to-[#D6AD55]/20 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-lg p-8 sm:p-10 rounded-3xl border border-[#D6AD55]/30 bg-[#101B35]/80 backdrop-blur-xl shadow-2xl shadow-black/70 text-center flex flex-col items-center">
        {/* Decorative Diya / Lock Icon */}
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#101B35] to-[#080D1C] border border-[#D6AD55]/40 flex items-center justify-center shadow-[0_0_20px_rgba(214,173,85,0.25)] group">
          <KeyRound className="w-8 h-8 text-[#D6AD55] animate-pulse" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-serif-diwali font-bold tracking-tight text-gold-gradient mb-3">
          {siteConfig.text.websiteTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#FFF5DF]/80 leading-relaxed mb-8 max-w-md">
          {siteConfig.text.welcomeSubtitle}
        </p>

        {/* Form */}
        <form onSubmit={handleUnlock} className="w-full flex flex-col items-center gap-4">
          <div className={`w-full relative transition-transform ${shake ? "translate-x-1 duration-75 text-red-400" : ""}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D6AD55]/70">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder={siteConfig.text.passwordPlaceholder || "Enter secret key..."}
              autoFocus
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#080D1C]/80 border border-[#D6AD55]/40 text-[#FFF5DF] placeholder-[#FFF5DF]/40 focus:outline-none focus:border-[#D6AD55] focus:ring-2 focus:ring-[#D6AD55]/30 text-sm transition-all"
            />
          </div>

          {/* Friendly Error Message */}
          {errorMsg && (
            <p className="text-xs sm:text-sm text-amber-300 bg-amber-950/40 border border-amber-600/30 px-4 py-2 rounded-xl animate-fade-in text-center">
              {errorMsg}
            </p>
          )}

          {/* Unlock Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D6AD55] via-[#F5DDA0] to-[#D6AD55] text-[#080D1C] font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(214,173,85,0.4)] hover:shadow-[0_0_35px_rgba(255,179,71,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-[#080D1C]" />
            <span>{siteConfig.text.unlockButton}</span>
          </button>
        </form>

        {/* Subtle hint footer */}
        <div className="mt-6 flex items-center gap-2 text-xs text-[#F5DDA0]/60">
          <span>A handcrafted festive surprise</span>
          <span>·</span>
          <span>Diwali Lights & Music</span>
        </div>
      </div>
    </div>
  );
};
