import React, { useState } from "react";
import { Sparkles, Image as ImageIcon, ZoomIn } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { NavigationButton } from "../components/NavigationButton";
import { ImageLightbox, PhotoItem } from "../components/ImageLightbox";

interface Section6GalleryProps {
  onNext: () => void;
  onBack: () => void;
}

export const Section6Gallery: React.FC<Section6GalleryProps> = ({
  onNext,
  onBack,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const photos: PhotoItem[] = siteConfig.photos || [
    { id: 1, src: "/assets/photos/1.jpg", caption: "Lighting the first diya together — warmth, laughter, and golden traditions." },
    { id: 2, src: "/assets/photos/2.jpg", caption: "Sparklers in hand, that radiant smile outshining every festive light in the city." },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 z-20">
      {/* Background radial soft light */}
      <div className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#D6AD55]/15 to-[#FFB347]/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-4xl text-center flex flex-col items-center">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6AD55]/30 bg-[#101B35]/70 backdrop-blur-md mb-4">
          <ImageIcon className="w-3.5 h-3.5 text-[#D6AD55]" />
          <span className="text-xs sm:text-sm font-medium text-[#F5DDA0]">
            Captured Memories
          </span>
        </div>

        {/* Heading: Your Little Moments */}
        <h2 className="text-3xl sm:text-4xl font-serif-diwali font-bold tracking-tight text-gold-gradient mb-3">
          {siteConfig.text.galleryTitle}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#FFF5DF]/80 leading-relaxed max-w-xl mb-10 font-body">
          {siteConfig.text.gallerySubtitle}
        </p>

        {/* ================= Balanced 2-Photo Prominent Showcase Grid ================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
          {photos.slice(0, 2).map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={`Open memory: ${photo.caption}`}
              className="group relative cursor-pointer rounded-3xl overflow-hidden border-2 border-[#D6AD55]/40 bg-[#101B35]/85 shadow-2xl transition-all duration-300 hover:border-[#D6AD55] hover:shadow-[0_0_35px_rgba(214,173,85,0.25)] hover:-translate-y-2 flex flex-col"
            >
              {/* Photo Frame Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#080D1C] flex items-center justify-center">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.style.display = "none";
                    const fallback = document.getElementById(`gallery-fallback-${photo.id}`);
                    if (fallback) fallback.style.display = "flex";
                  }}
                />

                {/* Styled CSS/SVG Fallback if image path is unavailable */}
                <div
                  id={`gallery-fallback-${photo.id}`}
                  style={{ display: "none" }}
                  className="absolute inset-0 flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#101B35] to-[#080D1C]"
                >
                  <Sparkles className="w-10 h-10 text-[#D6AD55] mb-2" />
                  <span className="text-sm font-serif-diwali text-[#F5DDA0]">Diwali Moment #{photo.id}</span>
                </div>

                {/* Subtle Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#101B35]/90 border border-[#D6AD55] flex items-center justify-center text-[#F5DDA0] shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Badge Number */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#080D1C]/85 border border-[#D6AD55]/40 text-xs font-mono text-[#D6AD55]">
                  0{photo.id}
                </div>
              </div>

              {/* Photo Caption Container */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#101B35] to-[#0A1124] border-t border-[#D6AD55]/30 text-left">
                <p className="text-sm sm:text-base text-[#FFF5DF] leading-relaxed font-body">
                  {photo.caption}
                </p>
                <div className="mt-4 pt-3 border-t border-[#D6AD55]/15 flex items-center justify-between text-xs text-[#D6AD55] font-medium tracking-wide">
                  <span className="inline-flex items-center gap-1.5 group-hover:text-[#FFF5DF] transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" /> Click to view full image
                  </span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revealed Navigation Controls */}
        <div className="mt-12 flex items-center gap-4">
          <NavigationButton onClick={onBack} variant="back" text="Back" />
          <NavigationButton
            onClick={onNext}
            text="Open Surprise Letter"
            variant="next"
          />
        </div>
      </div>

      {/* Full-screen Lightbox Component */}
      <ImageLightbox
        photos={photos.slice(0, 2)}
        currentIndex={selectedPhotoIndex ?? 0}
        isOpen={selectedPhotoIndex !== null}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(idx) => setSelectedPhotoIndex(idx)}
      />
    </div>
  );
};
