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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#010a13]/85 backdrop-blur-md border-b border-[#c89b3c]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Hextech Crest */}
        <a 
          href="#home" 
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded border border-[#c89b3c] bg-[#091428] flex items-center justify-center relative overflow-hidden shadow-hextech-cyan group-hover:border-[#00f0ff] transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/20 to-[#c89b3c]/20" />
            <div className="w-5 h-5 border-2 border-[#00f0ff] rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#f0e6d2] rounded-full animate-ping" />
            </div>
          </div>
          <div>
            <div className="font-cinzel font-bold text-lg text-gold-gradient tracking-widest flex items-center gap-2">
              KNITTING20 <span className="text-xs px-1.5 py-0.5 rounded bg-[#0ac8b9]/20 text-[#00f0ff] border border-[#0ac8b9]/40 font-rajdhani font-semibold">PRO</span>
            </div>
            <div className="text-[10px] font-rajdhani uppercase tracking-wider text-gray-400">
              LOL Streamer & Challenger Mid
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#champions"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-sm font-rajdhani font-semibold tracking-wider text-gray-300 hover:text-[#00f0ff] transition-colors"
          >
            TƯỚNG TỦ & STATS
          </a>
          <a
            href="#socials"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-sm font-rajdhani font-semibold tracking-wider text-gray-300 hover:text-[#00f0ff] transition-colors flex items-center gap-1"
          >
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            TIKTOK LIVE & BẬT CHUÔNG
          </a>
          <a
            href="#donate"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-sm font-rajdhani font-semibold tracking-wider text-[#c89b3c] hover:text-[#ffd700] flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
            ỦNG HỘ / DONATE
          </a>
          <a
            href="#gear"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-sm font-rajdhani font-semibold tracking-wider text-gray-300 hover:text-[#00f0ff] transition-colors"
          >
            BATTLE STATION
          </a>
        </nav>

        {/* Right Utility Buttons: Live Status & Audio Toggle */}
        <div className="flex items-center gap-3">
          {/* Live Stream Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-rajdhani font-bold flex items-center gap-2 border ${
            isLive 
              ? 'bg-red-950/50 text-red-400 border-red-500/50 animate-pulse' 
              : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
            {isLive ? '🔴 ĐANG LIVESTREAM' : '🟢 SẴN SÀNG LEO RANK'}
          </div>

          {/* Sound FX Switcher */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? "Tắt âm thanh Hextech SFX" : "Bật âm thanh Hextech SFX"}
            className="p-2 rounded border border-[#c89b3c]/40 bg-[#091428] hover:border-[#00f0ff] hover:text-[#00f0ff] text-[#f0e6d2] transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00f0ff]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>
        </div>
      </div>
    </header>
  );
}
