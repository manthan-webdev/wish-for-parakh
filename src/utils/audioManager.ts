/**
 * Audio Manager: Persistent Background Music Controller
 * - Handles single persistent HTMLAudioElement
 * - Handles autoplay policy restrictions & promise rejections
 * - Includes Web Audio API procedural festive ambient synthesizer fallback
 * - Retains play/pause state across section transitions without restarts
 */

class AudioManager {
  private static instance: AudioManager | null = null;
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private userManuallyPaused: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  
  // Web Audio Synth Fallback (Raga Bhupali / Yaman ambience)
  private audioCtx: AudioContext | null = null;
  private synthGainNode: GainNode | null = null;
  private isSynthRunning: boolean = false;
  private synthTimer: any = null;

  private constructor() {
    // Singleton
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public init(musicSrc: string) {
    if (this.audio) return;

    try {
      this.audio = new Audio(musicSrc);
      this.audio.loop = true;
      this.audio.volume = 0.5;
      this.audio.preload = "auto";

      this.audio.addEventListener("playing", () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("error", (e) => {
        console.warn("Audio file error or unsupported format, falling back to Web Audio synth:", e);
      });
    } catch (err) {
      console.warn("Could not initialize HTML Audio:", err);
    }
  }

  public subscribe(callback: (playing: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isPlaying || this.isSynthRunning);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    const active = this.isPlaying || this.isSynthRunning;
    this.listeners.forEach((cb) => cb(active));
  }

  public async startMusic(): Promise<boolean> {
    if (this.userManuallyPaused) {
      return false;
    }

    if (this.audio) {
      try {
        await this.audio.play();
        this.isPlaying = true;
        this.notify();
        return true;
      } catch (err) {
        console.warn("HTML Audio play() rejected, trying synthetic ambient chime:", err);
      }
    }

    // Try fallback synthetic music
    return this.startSynthMusic();
  }

  public toggle(): boolean {
    if (this.isPlaying || this.isSynthRunning) {
      this.pause(true);
      return false;
    } else {
      this.userManuallyPaused = false;
      this.startMusic();
      return true;
    }
  }

  public pause(byUser: boolean = true) {
    if (byUser) {
      this.userManuallyPaused = true;
    }

    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.isPlaying = false;

    if (this.isSynthRunning) {
      this.stopSynthMusic();
    }

    this.notify();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying || this.isSynthRunning;
  }

  // --- Web Audio Synthetic Ambient Fallback ---
  private startSynthMusic(): boolean {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return false;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      this.synthGainNode = this.audioCtx.createGain();
      this.synthGainNode.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      this.synthGainNode.connect(this.audioCtx.destination);

      // Tanpura drone (Sa & Pa)
      const baseFreq = 130.81; // C3
      [baseFreq, baseFreq * 1.5, baseFreq * 2].forEach((freq, idx) => {
        if (!this.audioCtx || !this.synthGainNode) return;
        const osc = this.audioCtx.createOscillator();
        const droneGain = this.audioCtx.createGain();
        osc.type = idx === 0 ? "sawtooth" : "sine";
        osc.frequency.value = freq;
        droneGain.gain.value = 0.04;
        osc.connect(droneGain);
        droneGain.connect(this.synthGainNode);
        osc.start();
      });

      // Melodic notes sequence in Raag Yaman / Bhupali (pentatonic)
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      let noteIndex = 0;

      const playNextBell = () => {
        if (!this.isSynthRunning || !this.audioCtx || !this.synthGainNode) return;
        const freq = scale[noteIndex % scale.length];
        noteIndex = (noteIndex + 1 + Math.floor(Math.random() * 2)) % scale.length;

        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        const now = this.audioCtx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(noteGain);
        noteGain.connect(this.synthGainNode);

        osc.start(now);
        osc.stop(now + 3.0);

        this.synthTimer = setTimeout(playNextBell, 2200 + Math.random() * 800);
      };

      this.isSynthRunning = true;
      playNextBell();
      this.notify();
      return true;
    } catch (e) {
      console.warn("Synth fallback error:", e);
      return false;
    }
  }

  private stopSynthMusic() {
    this.isSynthRunning = false;
    if (this.synthTimer) {
      clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch {}
      this.audioCtx = null;
    }
  }
}

export const audioManager = AudioManager.getInstance();
