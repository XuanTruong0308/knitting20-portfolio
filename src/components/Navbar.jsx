import React, { useState } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ isLive = true, soundEnabled, setSoundEnabled }) {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleSoundToggle = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
    if (newState) soundFx.playClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#010a13]/90 backdrop-blur-md border-b border-[#c89b3c]/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-18 md:h-20 flex items-center justify-between gap-2">
        
        {/* Logo & Hextech Crest */}
        <a 
          href="#home" 
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-2 sm:gap-3 group shrink-0"
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded border border-[#c89b3c] bg-[#091428] flex items-center justify-center relative overflow-hidden shadow-hextech-cyan group-hover:border-[#00f0ff] transition-colors shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/20 to-[#c89b3c]/20" />
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 border-2 border-[#00f0ff] rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#f0e6d2] rounded-full animate-ping" />
            </div>
          </div>
          <div>
            <div className="font-cinzel font-bold text-xs sm:text-base md:text-lg text-gold-gradient tracking-wider sm:tracking-widest flex items-center gap-1 sm:gap-1.5">
              KNITTING20 <span className="text-[8px] sm:text-[10px] md:text-xs px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-[#0ac8b9]/20 text-[#00f0ff] border border-[#0ac8b9]/40 font-rajdhani font-semibold">PRO</span>
            </div>
            <div className="text-[8px] sm:text-[10px] font-rajdhani uppercase tracking-wider text-gray-400 truncate max-w-[120px] sm:max-w-none">
              LOL Streamer & Top Laner
            </div>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="#socials"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-xs lg:text-sm font-rajdhani font-semibold tracking-wider text-gray-300 hover:text-[#00f0ff] transition-colors flex items-center gap-1.5"
          >
            <Radio className={`w-3.5 h-3.5 ${isLive ? 'text-red-400 animate-pulse' : 'text-gray-400'}`} />
            TIKTOK LIVE & BẬT CHUÔNG
          </a>
          <a
            href="#donate"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-xs lg:text-sm font-rajdhani font-semibold tracking-wider text-[#c89b3c] hover:text-[#ffd700] flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
            ỦNG HỘ / DONATE
          </a>
        </nav>

        {/* Right Utility Buttons: Live Status & Audio Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Live Stream Status Badge */}
          <div className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-rajdhani font-bold flex items-center gap-1 sm:gap-1.5 border whitespace-nowrap ${
            isLive 
              ? 'bg-red-950/60 text-red-400 border-red-500/50 animate-pulse' 
              : 'bg-[#091428] text-gray-300 border-[#c89b3c]/30'
          }`}>
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isLive ? 'bg-red-500 animate-ping' : 'bg-gray-400'}`} />
            <span className="hidden sm:inline">{isLive ? 'ĐANG PHÁT SÓNG' : 'ĐANG OFFLINE'}</span>
            <span className="sm:hidden">{isLive ? 'LIVE' : 'OFFLINE'}</span>
          </div>

          {/* Sound FX Switcher */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? "Tắt âm thanh Hextech SFX" : "Bật âm thanh Hextech SFX"}
            className="p-1.5 sm:p-2 rounded border border-[#c89b3c]/40 bg-[#091428] hover:border-[#00f0ff] hover:text-[#00f0ff] text-[#f0e6d2] transition-colors shrink-0"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff]" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />}
          </button>
        </div>
      </div>
    </header>
  );
}
