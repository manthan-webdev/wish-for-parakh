import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { audioManager } from "../utils/audioManager";

interface AudioPlayerButtonProps {
  className?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({ className = "" }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    audioManager.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isPlaying ? "Mute background music" : "Play background festive music"}
      title={isPlaying ? "Pause festive music" : "Play festive music"}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#D6AD55]/40 bg-[#101B35]/85 backdrop-blur-md text-[#FFF5DF] shadow-lg shadow-black/40 hover:border-[#D6AD55] hover:bg-[#101B35] transition-all duration-300 group ${className}`}
    >
      {/* Animated Equalizer Wave Bars */}
      <div className="flex items-end gap-0.5 h-3.5 w-3.5">
        <span
          className={`w-0.5 rounded-full bg-[#D6AD55] transition-all duration-300 ${
            isPlaying ? "h-3.5 animate-pulse" : "h-1"
          }`}
        />
        <span
          className={`w-0.5 rounded-full bg-[#F5DDA0] transition-all duration-300 ${
            isPlaying ? "h-2.5 animate-bounce" : "h-1.5"
          }`}
          style={{ animationDelay: "150ms" }}
        />
        <span
          className={`w-0.5 rounded-full bg-[#FFB347] transition-all duration-300 ${
            isPlaying ? "h-3 animate-pulse" : "h-1"
          }`}
          style={{ animationDelay: "300ms" }}
        />
      </div>

      <div className="flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium text-[#F5DDA0]">
        <Music className="w-3.5 h-3.5 text-[#D6AD55]" />
        <span className="hidden sm:inline">{isPlaying ? "Music On" : "Music Off"}</span>
      </div>

      <div className="text-[#D6AD55] group-hover:scale-110 transition-transform">
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-amber-200/60" />}
      </div>
    </button>
  );
};
