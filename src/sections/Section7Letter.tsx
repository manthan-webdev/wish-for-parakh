import React, { useState, useEffect } from "react";
import { Mail, Sparkles, Heart } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { NavigationButton } from "../components/NavigationButton";

interface Section7LetterProps {
  onNext: () => void;
  onBack: () => void;
}

export const Section7Letter: React.FC<Section7LetterProps> = ({
  onNext,
  onBack,
}) => {
  // Envelope states: 'closed' | 'unsealing' | 'emerging' | 'revealed'
  const [envelopeState, setEnvelopeState] = useState<"closed" | "unsealing" | "emerging" | "revealed">("closed");
  const [fireworkBurst, setFireworkBurst] = useState(false);

  const greeting = siteConfig.text.letterGreeting || `Hey ${siteConfig.friendName},`;
  const paragraphs = siteConfig.text.letterParagraphs || [
    "Diwali has always been about light, warmth, and celebrating the people who make life feel a little brighter.",
    "Whether it's our random conversations that drift into hours or your unmistakable laugh—you make ordinary days special.",
    "As you celebrate tonight, I hope this year brings you everything you've wished for. Keep shining bright.",
  ];
  const closing = siteConfig.text.letterClosing || "Wishing you warmth and celebration,";

  const handleOpenEnvelope = () => {
    if (envelopeState !== "closed") return;

    // Step 1: Unseal wax seal
    setEnvelopeState("unsealing");

    // Step 2: Open flap and slide letter up
    setTimeout(() => {
      setEnvelopeState("emerging");
    }, 450);

    // Step 3: Unfold full letter & trigger celebratory fireworks burst
    setTimeout(() => {
      setEnvelopeState("revealed");
      setFireworkBurst(true);
    }, 1100);

    setTimeout(() => {
      setFireworkBurst(false);
    }, 3200);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 z-20">
      {/* Background radial ambient glow */}
      <div
        className={`absolute w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#FFB347]/20 via-[#D6AD55]/15 to-transparent blur-3xl pointer-events-none transition-all duration-1000 ${
          envelopeState === "revealed" ? "opacity-100 scale-110" : "opacity-40 scale-95"
        }`}
      />

      {/* Celebratory golden fireworks flash & cracker bursts when letter unfolds */}
      {fireworkBurst && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          {/* Radial explosive shockwave */}
          <div className="w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full border border-[#FFF5DF]/60 bg-radial from-[#FFB347]/30 via-transparent to-transparent animate-ping" />

          {/* Crackling Golden Star Embers */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const dist = 140 + (i % 3) * 60;
            return (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#FFF5DF] shadow-[0_0_15px_#FFB347] animate-ping"
                style={{
                  transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
                  animationDuration: `${1.2 + (i % 4) * 0.3}s`,
                }}
              />
            );
          })}
        </div>
      )}

      <div className="relative w-full max-w-3xl text-center flex flex-col items-center">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6AD55]/30 bg-[#101B35]/70 backdrop-blur-md mb-4">
          <Mail className="w-3.5 h-3.5 text-[#D6AD55]" />
          <span className="text-xs sm:text-sm font-medium text-[#F5DDA0]">
            From The Heart
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif-diwali font-bold tracking-tight text-gold-gradient mb-3">
          {siteConfig.text.letterTitle}
        </h2>

        {/* Envelope Instruction (Visible when closed) */}
        {envelopeState === "closed" && (
          <p className="text-sm sm:text-base text-[#F5DDA0]/90 italic font-body mb-8 animate-pulse">
            "{siteConfig.text.envelopeInstruction || "There's a little something waiting for you... Tap the envelope to unseal it ✨"}"
          </p>
        )}

        {/* ================= INTERACTIVE LUXURY ENVELOPE ================= */}
        {envelopeState !== "revealed" && (
          <div className="relative my-6 flex flex-col items-center">
            <div
              onClick={handleOpenEnvelope}
              role="button"
              tabIndex={0}
              aria-label="Click to open Diwali letter envelope"
              className="relative w-72 sm:w-96 aspect-[1.5/1] cursor-pointer group select-none transition-transform hover:scale-105 active:scale-95 perspective-1000"
            >
              {/* Envelope Back Body (Cream Ivory Paper) */}
              <div className="absolute inset-0 rounded-2xl bg-[#F5EEDB] border-2 border-[#D6AD55]/70 shadow-2xl overflow-hidden">
                {/* Diagonal fold shadows */}
                <svg viewBox="0 0 300 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="envelopeShadow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E2D4BB" />
                      <stop offset="100%" stopColor="#D5C4A6" />
                    </linearGradient>
                  </defs>
                  {/* Left flap */}
                  <polygon points="0,0 150,110 0,200" fill="#EADFCB" stroke="#D6AD55" strokeWidth="0.5" />
                  {/* Right flap */}
                  <polygon points="300,0 150,110 300,200" fill="#E4D7C1" stroke="#D6AD55" strokeWidth="0.5" />
                  {/* Bottom flap */}
                  <polygon points="0,200 150,105 300,200" fill="#DFD0B8" stroke="#D6AD55" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Emerging Letter Preview when opening */}
              <div
                className={`absolute inset-x-6 top-3 h-28 rounded-t-xl bg-[#FFFDF5] border border-[#D6AD55]/40 p-3 shadow-md transition-all duration-700 ease-out flex flex-col justify-between ${
                  envelopeState === "emerging"
                    ? "-translate-y-28 opacity-100 scale-105"
                    : "translate-y-0 opacity-0"
                }`}
              >
                <div className="w-16 h-1.5 bg-[#D6AD55]/40 rounded-full" />
                <div className="w-full space-y-1">
                  <div className="w-full h-1 bg-[#D6AD55]/20 rounded" />
                  <div className="w-3/4 h-1 bg-[#D6AD55]/20 rounded" />
                </div>
              </div>

              {/* Top Flap (Triangular) with 3D Flip Open Animation */}
              <div
                className={`absolute inset-x-0 top-0 h-1/2 origin-top transition-transform duration-700 ease-in-out z-20 ${
                  envelopeState !== "closed" ? "rotate-x-180 -translate-y-2" : "rotate-x-0"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <svg viewBox="0 0 300 110" className="w-full h-full drop-shadow-md">
                  <polygon points="0,0 150,105 300,0" fill="#F0E5D1" stroke="#D6AD55" strokeWidth="1" />
                </svg>
              </div>

              {/* Realistic Golden Wax Seal in the center of the flap */}
              <div
                className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
                  envelopeState !== "closed"
                    ? "opacity-0 scale-50 pointer-events-none"
                    : "opacity-100 scale-100 group-hover:scale-110"
                }`}
              >
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#A52A2A] via-[#8B1A1A] to-[#5C0606] border-2 border-[#D6AD55] shadow-xl flex items-center justify-center text-[#FFF5DF] transform rotate-[-8deg]">
                  {/* Outer wax drip ring */}
                  <div className="absolute inset-0 rounded-full border border-[#FFF5DF]/30" />
                  <Sparkles className="w-6 h-6 text-[#F5DDA0] drop-shadow-md animate-pulse" />
                </div>
              </div>
            </div>

            {/* Prompt Button under envelope */}
            <button
              onClick={handleOpenEnvelope}
              className="mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-[#D6AD55] via-[#F5DDA0] to-[#D6AD55] text-[#080D1C] font-semibold text-sm shadow-[0_0_20px_rgba(214,173,85,0.4)] hover:shadow-[0_0_30px_rgba(255,179,71,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#080D1C]" />
              <span>Tap to Open Envelope</span>
            </button>
          </div>
        )}

        {/* ================= UNFOLDED READABLE LETTER ================= */}
        {envelopeState === "revealed" && (
          <div className="relative w-full rounded-3xl bg-[#FFFDF5] text-[#1A1A24] p-8 sm:p-12 shadow-2xl shadow-black/80 border-4 border-[#D6AD55]/40 transition-all duration-700 animate-fade-in text-left my-4">
            {/* Decorative Gold Filigree Corner Borders */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D6AD55]" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D6AD55]" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D6AD55]" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D6AD55]" />

            {/* Letter Header with Golden Motif & Wax Seal Remembrance */}
            <div className="flex justify-between items-start border-b border-[#D6AD55]/25 pb-6 mb-8">
              <div>
                <p className="text-2xl sm:text-3xl font-serif-diwali font-semibold text-[#8B6508] tracking-tight">
                  {greeting}
                </p>
                <span className="text-xs text-[#8A7968] font-mono tracking-wider uppercase mt-1 block">
                  Diwali Special Edition
                </span>
              </div>

              {/* Wax Seal Emblem */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B2500] to-[#5C1400] border-2 border-[#D6AD55] shadow-md flex items-center justify-center text-[#FFF5DF] transform rotate-[-8deg] shrink-0">
                <Sparkles className="w-5 h-5 text-[#F5DDA0]" />
              </div>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2822] font-body font-normal">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-serif-diwali first-letter:text-[#8B6508]">
                  {para}
                </p>
              ))}
            </div>

            {/* Letter Closing & Signature */}
            <div className="mt-10 pt-6 border-t border-[#D6AD55]/25 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <p className="text-xs sm:text-sm text-[#6C5B4C] italic font-body">
                  {closing}
                </p>
                <p className="text-3xl sm:text-4xl font-handwritten text-[#8B6508] mt-1 tracking-wide">
                  {siteConfig.yourName}
                </p>
              </div>

              {/* Small subtle stamp */}
              <div className="flex items-center gap-1.5 text-xs text-[#8B6508] font-medium border border-[#D6AD55]/40 rounded-full px-3 py-1 bg-[#D6AD55]/10">
                <Heart className="w-3.5 h-3.5 text-[#B83227]" />
                <span>Diwali Night</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls: Revealed once letter is unfolded */}
        <div
          className={`mt-10 flex items-center gap-4 transition-all duration-700 ${
            envelopeState === "revealed"
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <NavigationButton onClick={onBack} variant="back" text="Back" />
          <NavigationButton
            onClick={onNext}
            text="Grand Finale Celebration"
            variant="next"
          />
        </div>
      </div>
    </div>
  );
};
