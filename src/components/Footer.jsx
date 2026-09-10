import React from 'react';
import { Heart, Sparkles, Mail, Shield, MessageCircle } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Footer({ streamerConfig, onOpenBooking }) {
  return (
    <footer className="bg-[#010a13] border-t border-[#c89b3c]/30 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Arcane Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#0ac8b9]/5 rounded-t-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#c89b3c]/20">
          
          {/* Brand / Summoner Summary */}
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded border border-[#c89b3c] bg-[#091428] flex items-center justify-center shadow-hextech-cyan">
                <div className="w-4 h-4 border-2 border-[#00f0ff] rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#f0e6d2] rounded-full" />
                </div>
              </div>
              <span className="font-cinzel font-bold text-xl text-gold-gradient tracking-wider">
                {streamerConfig.name}
              </span>
            </div>
            <p className="text-gray-400 font-sans text-xs sm:text-sm max-w-md leading-relaxed">
              Cảm ơn các bạn đã đồng hành và ủng hộ hành trình leo rank Thách Đấu cũng như các buổi livestream vui vẻ mỗi tối. Hẹn gặp lại anh em trên Summoner's Rift!
            </p>
          </div>

          {/* Quick Channels */}
          <div className="md:col-span-3 space-y-3 text-left">
            <div className="text-xs font-rajdhani font-bold tracking-widest text-[#ffd700] uppercase">
              KÊNH CHÍNH THỨC
            </div>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a
                  href={streamerConfig.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className="text-gray-300 hover:text-[#00f0ff] flex items-center gap-2 transition-colors"
                >
                  <span>• Kênh TikTok Highlights</span>
                </a>
              </li>
              <li>
                <a
                  href={streamerConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className="text-gray-300 hover:text-[#00f0ff] flex items-center gap-2 transition-colors"
                >
                  <span>• Fanpage Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#donate"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className="text-gray-300 hover:text-[#ffd700] flex items-center gap-2 transition-colors"
                >
                  <span>• Cổng VietQR Donate</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Booking & Business Contact */}
          <div className="md:col-span-3 space-y-3 text-left">
            <div className="text-xs font-rajdhani font-bold tracking-widest text-[#00f0ff] uppercase">
              HỢP TÁC & BOOKING
            </div>
            <p className="text-xs text-gray-400">
              Liên hệ tài trợ thiết bị, livestream quảng bá game hoặc tham gia sự kiện.
            </p>
            <button
              onClick={() => {
                onOpenBooking();
                soundFx.playClick();
              }}
              className="hextech-btn-gold px-4 py-2 rounded text-xs font-bold w-full shadow-hextech-gold"
            >
              LIÊN HỆ BOOKING
            </button>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-sans">
          <div>
            © {new Date().getFullYear()} {streamerConfig.name}. Thiết kế phong cách Hextech LoL.
          </div>
          <div className="text-center sm:text-right max-w-md">
            League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
          </div>
        </div>

      </div>
    </footer>
  );
}
