import React from 'react';
import { Monitor, Cpu, Mouse, Headphones, Keyboard, HardDrive, Gamepad2, Shield } from 'lucide-react';
import { soundFx } from '../utils/audio';

const GEAR_ITEMS = [
  {
    category: 'MÀN HÌNH CHUYÊN GAME',
    name: 'BenQ ZOWIE XL2546K 240Hz 0.5ms',
    desc: 'DyAc⁺ Công nghệ chống mờ chuyển động tối ưu cho LoL',
    icon: Monitor
  },
  {
    category: 'CHUỘT ESPORTS',
    name: 'Logitech G Pro X Superlight 2 (White)',
    desc: 'DPI: 800 | Polling Rate: 4000Hz | Cảm biến HERO 2',
    icon: Mouse
  },
  {
    category: 'BÀN PHÍM CƠ CUSTOM',
    name: 'Wooting 60HE+ Rapid Trigger',
    desc: 'Switch Lekker Hall Effect phản hồi siêu tốc 0.1mm',
    icon: Keyboard
  },
  {
    category: 'TAI NGHE GAMING',
    name: 'HyperX Cloud III Wireless 7.1',
    desc: 'Âm thanh không gian nghe chuẩn xác bước chân và ping',
    icon: Headphones
  },
  {
    category: 'CPU & BỘ XỬ LÝ',
    name: 'Intel Core i9-14900K (24 Cores / 32 Threads)',
    desc: 'Khóa 5.8GHz Max Turbo cân mọi trận combat & stream 2K',
    icon: Cpu
  },
  {
    category: 'CARD ĐỒ HỌA (GPU)',
    name: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X',
    desc: 'FPS 350+ ổn định trong combat 5v5 không drop khung hình',
    icon: HardDrive
  }
];

export default function GearSpecs() {
  return (
    <section id="gear" className="py-20 relative bg-[#040e1a] border-t border-[#c89b3c]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#091428] border border-[#00f0ff]/40 text-xs font-rajdhani font-bold tracking-widest text-[#00f0ff] uppercase">
            <Gamepad2 className="w-3.5 h-3.5" />
            BATTLE STATION & ESPORTS GEAR
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-wide">
            CẤU HÌNH <span className="text-gold-gradient">CHIẾN GAME & STREAM</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Hệ thống máy tính và vũ khí gaming gear được streamer sử dụng hàng ngày trong các buổi phát sóng trực tiếp.
          </p>
        </div>

        {/* Gear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GEAR_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                onMouseEnter={() => soundFx.playHover()}
                className="hextech-border p-6 rounded-lg group hover:border-[#00f0ff] hover:shadow-hextech-cyan transition-all duration-300 text-left relative"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded bg-[#091428] border border-[#c89b3c]/40 flex items-center justify-center text-[#ffd700] group-hover:border-[#00f0ff] group-hover:text-[#00f0ff] group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded bg-[#010a13] border border-[#c89b3c]/30 text-[#ffd700] uppercase">
                    PRO GEAR
                  </span>
                </div>

                <div className="text-[11px] font-rajdhani font-bold tracking-wider text-[#00f0ff] uppercase mb-1">
                  {item.category}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
