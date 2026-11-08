import { useState, useEffect } from "react";
import { siteConfig } from "./data/siteConfig";
import { audioManager } from "./utils/audioManager";
import { AudioPlayerButton } from "./components/AudioPlayerButton";
import { FloatingParticles } from "./components/FloatingParticles";
import { ContinuousBackgroundFireworks } from "./components/ContinuousBackgroundFireworks";
import { HangingLanterns } from "./components/HangingLanterns";

// Sections
import { Section1Password } from "./sections/Section1Password";
import { Section2Welcome } from "./sections/Section2Welcome";
import { Section3Decoration } from "./sections/Section3Decoration";
import { Section4Hamper } from "./sections/Section4Hamper";
import { Section5Fireworks } from "./sections/Section5Fireworks";
import { Section6Gallery } from "./sections/Section6Gallery";
import { Section7Letter } from "./sections/Section7Letter";
import { Section8Final } from "./sections/Section8Final";

export default function App() {
  // If password protection is disabled in siteConfig, skip directly to Section 2
  const initialSection = siteConfig.passwordEnabled ? 1 : 2;
  const [currentSection, setCurrentSection] = useState<number>(initialSection);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Initialize persistent audio instance once on app mount
  useEffect(() => {
    audioManager.init(siteConfig.music);

    // If password protection is disabled, start music upon first interaction
    if (!siteConfig.passwordEnabled) {
      const handleFirstClick = () => {
        audioManager.startMusic();
        window.removeEventListener("click", handleFirstClick);
        window.removeEventListener("touchstart", handleFirstClick);
      };
      window.addEventListener("click", handleFirstClick, { once: true });
      window.addEventListener("touchstart", handleFirstClick, { once: true });
    }
  }, []);

  const goToSection = (sectionNumber: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Smooth section transition timing
    setTimeout(() => {
      setCurrentSection(sectionNumber);
      setIsTransitioning(false);
    }, 280);
  };

  const handleNext = () => {
    if (currentSection < 8) {
      goToSection(currentSection + 1);
    }
  };

  const handleBack = () => {
    // Only go back to Section 2 if password is enabled (never go back to password screen)
    const minBackSection = siteConfig.passwordEnabled ? 2 : 2;
    if (currentSection > minBackSection) {
      goToSection(currentSection - 1);
    }
  };

  const handleReplay = () => {
    // Replay restarts from Grand Welcome (Section 2) so user doesn't have to re-enter password
    goToSection(2);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#080D1C] text-[#FFF5DF] overflow-x-hidden selection:bg-[#D6AD55]/30 selection:text-[#FFF5DF]">
      {/* Background Floating Ember / Star Particle Canvas */}
      <FloatingParticles count={35} />

      {/* Continuous Background Fireworks across the entire website */}
      <ContinuousBackgroundFireworks />

      {/* Top Decorative Hanging Lanterns & Fairy String */}
      <HangingLanterns />

      {/* Floating Audio Player Button */}
      <AudioPlayerButton />

      {/* Smooth Transition Container */}
      <div
        className={`w-full transition-opacity duration-300 ease-in-out ${
          isTransitioning ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
        }`}
      >
        {currentSection === 1 && (
          <Section1Password onUnlock={() => goToSection(2)} />
        )}

        {currentSection === 2 && (
          <Section2Welcome
            onNext={handleNext}
            onBack={handleBack}
            showBack={false}
          />
        )}

        {currentSection === 3 && (
          <Section3Decoration onNext={handleNext} onBack={handleBack} />
        )}

        {currentSection === 4 && (
          <Section4Hamper onNext={handleNext} onBack={handleBack} />
        )}

        {currentSection === 5 && (
          <Section5Fireworks
            isActive={currentSection === 5}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentSection === 6 && (
          <Section6Gallery onNext={handleNext} onBack={handleBack} />
        )}

        {currentSection === 7 && (
          <Section7Letter onNext={handleNext} onBack={handleBack} />
        )}

        {currentSection === 8 && (
          <Section8Final
            isActive={currentSection === 8}
            onReplay={handleReplay}
          />
        )}
      </div>
    </main>
  );
}
