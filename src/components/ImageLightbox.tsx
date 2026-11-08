import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export interface PhotoItem {
  id: number;
  src: string;
  caption: string;
}

interface ImageLightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % photos.length);
      }
    },
    [isOpen, currentIndex, photos.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080D1C]/92 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close photo preview"
        className="absolute top-5 right-5 z-60 p-2.5 rounded-full bg-[#101B35]/80 border border-[#D6AD55]/40 text-[#FFF5DF] hover:border-[#D6AD55] hover:bg-[#101B35] hover:scale-105 transition-all shadow-lg"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev Navigation Button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex - 1 + photos.length) % photos.length);
          }}
          aria-label="Previous photo"
          className="absolute left-3 sm:left-6 z-60 p-3 rounded-full bg-[#101B35]/80 border border-[#D6AD55]/30 text-[#FFF5DF] hover:border-[#D6AD55] hover:bg-[#101B35] hover:scale-110 transition-all shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-[#F5DDA0]" />
        </button>
      )}

      {/* Next Navigation Button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex + 1) % photos.length);
          }}
          aria-label="Next photo"
          className="absolute right-3 sm:right-6 z-60 p-3 rounded-full bg-[#101B35]/80 border border-[#D6AD55]/30 text-[#FFF5DF] hover:border-[#D6AD55] hover:bg-[#101B35] hover:scale-110 transition-all shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-[#F5DDA0]" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-[#D6AD55]/40 bg-[#101B35]/90 shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex items-center justify-center bg-black/40 overflow-hidden">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.caption || "Diwali memory"}
            className="max-h-[68vh] w-auto max-w-full object-contain select-none transition-all duration-300"
            onError={(e) => {
              // Graceful fallback if image is missing
              const target = e.currentTarget;
              target.onerror = null;
              target.style.display = "none";
              const fallbackEl = document.getElementById(`lightbox-fallback-${currentPhoto.id}`);
              if (fallbackEl) fallbackEl.style.display = "flex";
            }}
          />

          {/* Graceful fallback block */}
          <div
            id={`lightbox-fallback-${currentPhoto.id}`}
            style={{ display: "none" }}
            className="h-80 w-full flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#101B35] to-[#080D1C]"
          >
            <div className="w-16 h-16 rounded-full bg-[#D6AD55]/10 border border-[#D6AD55]/40 flex items-center justify-center mb-4 text-[#D6AD55]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-serif-diwali text-[#F5DDA0] mb-2">A Treasured Diwali Memory</h4>
            <p className="text-sm text-[#FFF5DF]/70 max-w-md">
              A precious moment of warmth, joy, and laughter during the festive celebrations.
            </p>
          </div>
        </div>

        {/* Caption Bar */}
        <div className="w-full p-4 sm:p-5 bg-gradient-to-t from-[#080D1C] to-[#101B35] border-t border-[#D6AD55]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm sm:text-base font-medium text-[#FFF5DF] leading-relaxed">
            {currentPhoto.caption}
          </p>
          <div className="text-xs text-[#D6AD55] tracking-widest uppercase font-mono px-3 py-1 rounded-full border border-[#D6AD55]/25 bg-[#080D1C]/60 whitespace-nowrap">
            {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
};
