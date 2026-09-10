import React from 'react';
import { Sparkles, Trophy, Flame, PlayCircle, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import HextechCore3D from './HextechCore3D';
import { soundFx } from '../utils/audio';

export default function HeroSection({ streamerConfig }) {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden">
      
      {/* Background Arcane Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#c89b3c]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hextech Rune Grid Background Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#0ac8b9_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Summoner Persona & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Rank Challenger & Role Tag */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-sm hextech-border">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <div className="flex items-center gap-2 text-xs font-rajdhani font-bold tracking-widest text-[#00f0ff] uppercase">
                <Trophy className="w-3.5 h-3.5 text-[#ffd700]" />
                THÁCH ĐẤU VIỆT NAM (1,240 LP) • MID LANER
              </div>
            </div>

            {/* In-Game Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-cinzel font-black tracking-tight text-white uppercase leading-none">
                <span className="text-gold-gradient block">{streamerConfig.name}</span>
                <span className="text-2xl sm:text-4xl font-rajdhani font-bold text-gray-400 block mt-2">
                  {streamerConfig.title}
                </span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base font-sans max-w-xl leading-relaxed pt-2">
                {streamerConfig.bio}
              </p>
            </div>

            {/* Action CTAs (TikTok, Facebook, Donate) */}
            <div className="flex flex-wrap gap-4 pt-2">
              {/* TikTok Channel Button */}
              <a
                href={streamerConfig.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="hextech-btn-cyan px-6 py-3 rounded text-sm font-bold flex items-center gap-2.5 shadow-hextech-cyan group"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.28a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.28 8.28 0 0 0 4.91 1.6V6.87a4.86 4.86 0 0 1-1-.18z"/>
                </svg>
                <span>XEM TIKTOK LIVE</span>
              </a>

              {/* Facebook Fanpage Button */}
              <a
                href={streamerConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="hextech-btn-gold px-6 py-3 rounded text-sm font-bold flex items-center gap-2.5 shadow-hextech-gold group"
              >
                <svg className="w-4 h-4 fill-current text-[#00f0ff] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>KẾT NỐI FACEBOOK</span>
              </a>

              {/* Donate Button */}
              <a
                href="#donate"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="px-5 py-3 rounded text-sm font-rajdhani font-bold tracking-wider text-[#ffd700] border border-[#ffd700]/40 bg-[#091428]/80 hover:bg-[#c89b3c]/20 hover:border-[#ffd700] flex items-center gap-2 transition-colors"
              >
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>ỦNG HỘ STREAMER</span>
              </a>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#c89b3c]/20">
              <div className="p-3 bg-[#091428]/60 border border-[#c89b3c]/20 rounded">
                <div className="text-xl sm:text-2xl font-orbitron font-bold text-[#00f0ff]">
                  {streamerConfig.stats.tiktokFollowers}
                </div>
                <div className="text-[11px] font-rajdhani uppercase text-gray-400">TikTok Followers</div>
              </div>
              <div className="p-3 bg-[#091428]/60 border border-[#c89b3c]/20 rounded">
                <div className="text-xl sm:text-2xl font-orbitron font-bold text-[#f0e6d2]">
                  {streamerConfig.stats.winRate}
                </div>
                <div className="text-[11px] font-rajdhani uppercase text-gray-400">Tỉ Lệ Thắng Ranked</div>
              </div>
              <div className="p-3 bg-[#091428]/60 border border-[#c89b3c]/20 rounded">
                <div className="text-xl sm:text-2xl font-orbitron font-bold text-[#ffd700]">
                  {streamerConfig.stats.pentakills}
                </div>
                <div className="text-[11px] font-rajdhani uppercase text-gray-400">Pha Pentakill</div>
              </div>
              <div className="p-3 bg-[#091428]/60 border border-[#c89b3c]/20 rounded">
                <div className="text-xl sm:text-2xl font-orbitron font-bold text-[#0ac8b9]">
                  {streamerConfig.stats.kda}
                </div>
                <div className="text-[11px] font-rajdhani uppercase text-gray-400">KDA Trung Bình</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Hextech Core Canvas */}
          <div className="lg:col-span-5 h-[420px] sm:h-[500px] relative flex items-center justify-center">
            
            {/* Hextech Magic Circle Ornaments */}
            <div className="absolute w-[340px] h-[340px] border border-[#c89b3c]/30 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute w-[390px] h-[390px] border border-dashed border-[#00f0ff]/20 rounded-full animate-spin-reverse pointer-events-none" />
            <div className="absolute w-[440px] h-[440px] border border-[#785a28]/20 rounded-full pointer-events-none" />
            
            {/* 3D Core Canvas */}
            <HextechCore3D />

            {/* Hint for 3D Interaction */}
            <div className="absolute bottom-2 bg-[#010a13]/80 border border-[#c89b3c]/40 px-3 py-1 rounded-full text-[11px] font-rajdhani tracking-widest text-[#00f0ff] uppercase shadow-hextech-cyan pointer-events-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              Kéo chuột để xoay Lõi Hextech 3D
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
