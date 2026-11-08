import React from "react";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

interface NavigationButtonProps {
  onClick: () => void;
  text?: string;
  variant?: "next" | "back" | "action";
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  text = "Continue",
  variant = "next",
  icon,
  disabled = false,
  className = "",
}) => {
  if (variant === "back") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label="Go to previous step"
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D6AD55]/30 bg-[#101B35]/70 backdrop-blur-md text-[#FFF5DF] text-sm font-medium hover:border-[#D6AD55] hover:bg-[#101B35] hover:text-[#F5DDA0] transition-all duration-300 shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      >
        <ArrowLeft className="w-4 h-4 text-[#D6AD55]" />
        <span>{text || "Back"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative group overflow-hidden inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D6AD55] via-[#F5DDA0] to-[#D6AD55] text-[#080D1C] font-semibold text-base shadow-[0_0_25px_rgba(214,173,85,0.45)] hover:shadow-[0_0_35px_rgba(255,179,71,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
    >
      {/* Shimmer overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      <span className="relative z-10 flex items-center gap-2">
        {icon || <Sparkles className="w-4 h-4 text-[#080D1C]" />}
        <span>{text}</span>
        {variant === "next" && <ArrowRight className="w-4 h-4 text-[#080D1C] group-hover:translate-x-1 transition-transform" />}
      </span>
    </button>
  );
};
