import React, { useState } from 'react';
import { Shield, Zap, Flame, Award, Crosshair } from 'lucide-react';
import { soundFx } from '../utils/audio';

const CHAMPIONS = [
  {
    name: 'Yasuo',
    title: 'Kẻ Bất Dung Thứ',
    role: 'Sát Thủ / Đấu Sĩ',
    mastery: '1,850,000 pts',
    winrate: '71.2%',
    kda: '12.4 / 4.1 / 8.2',
    pentas: '48 Pentakills',
    quote: '"Cái chết cũng giống như một cơn gió, luôn luôn ở cạnh bên."',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
    tag: 'TƯỚNG THƯƠNG HIỆU'
  },
  {
    name: 'Zed',
    title: 'Chúa Tể Bóng Tối',
    role: 'Sát Thủ Đường Giữa',
    mastery: '1,420,000 pts',
    winrate: '68.5%',
    kda: '14.8 / 3.9 / 6.5',
    pentas: '36 Pentakills',
    quote: '"Bóng tối đã tiết lộ tất cả."',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg',
    tag: 'SÁT THỦ OUTPLAY'
  },
  {
    name: 'Lee Sin',
    title: 'Thầy Tu Mù',
    role: 'Đấu Sĩ / Cơ Động',
    mastery: '980,000 pts',
    winrate: '66.4%',
    kda: '9.8 / 4.5 / 11.2',
    pentas: '19 Pentakills',
    quote: '"Thứ mù quáng duy nhất là sự nghi ngờ."',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg',
    tag: 'INSEC CHUYÊN NGHIỆP'
  },
  {
    name: 'Ahri',
    title: 'Hồ Ly Chín Đuôi',
    role: 'Pháp Sư / Sát Thủ',
    mastery: '890,000 pts',
    winrate: '69.8%',
    kda: '10.2 / 2.8 / 12.4',
    pentas: '22 Pentakills',
    quote: '"Hãy trao trái tim cho ta."',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg',
    tag: 'KIỂM SOÁT COMBAT'
  },
  {
    name: 'Yone',
    title: 'Kẻ Về Từ Cõi Chết',
    role: 'Sát Thủ Song Kiếm',
    mastery: '1,150,000 pts',
    winrate: '67.0%',
    kda: '11.6 / 4.8 / 7.9',
    pentas: '31 Pentakills',
    quote: '"Một thanh kiếm rèn linh hồn, một thanh đoạt sinh mệnh."',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yone_0.jpg',
    tag: 'GANK & GIAO TRANH'
  },
  {
    name: 'Sylas',
    title: 'Kẻ Phá Xiềng',
    role: 'Pháp Sư Cận Chiến',
    mastery: '760,000 pts',
    winrate: '65.8%',
    kda: '10.5 / 4.2 / 9.1',
    pentas: '15 Pentakills',
    quote: '"Chúng ta không bị trói buộc bởi xiềng xích, mà bởi sự sợ hãi."',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sylas_0.jpg',
    tag: 'LẬT KÈO ĐỈNH CAO'
  }
];

export default function ChampionCards() {
  const [activeChamp, setActiveChamp] = useState(CHAMPIONS[0]);

  return (
    <section id="champions" className="py-20 relative bg-[#010a13] border-t border-[#c89b3c]/20">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c89b3c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#091428] border border-[#c89b3c]/40 text-xs font-rajdhani font-bold tracking-widest text-[#ffd700] uppercase">
            <Award className="w-3.5 h-3.5" />
            HỒ SƠ THÔNG THẠO 7 & KỸ NĂNG
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-wide">
            BỘ SƯU TẬP <span className="text-gold-gradient">TƯỚNG TỦ</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Các vị tướng thương hiệu làm nên những pha outplay triệu view trên kênh TikTok và các trận đấu rank Thách Đấu.
          </p>
        </div>

        {/* Champions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAMPIONS.map((champ, index) => (
            <div
              key={champ.name}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => {
                setActiveChamp(champ);
                soundFx.playClick();
              }}
              className="hextech-border rounded overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-[#00f0ff] hover:shadow-hextech-cyan relative"
            >
              {/* Champion Splash Art Banner */}
              <div className="h-48 relative overflow-hidden bg-[#091428]">
                <img
                  src={champ.image}
                  alt={champ.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091428] via-[#091428]/40 to-transparent" />
                
                {/* Mastery 7 Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#010a13]/85 border border-[#ffd700] text-[11px] font-rajdhani font-bold text-[#ffd700] flex items-center gap-1 shadow-lg">
                  <Shield className="w-3 h-3 text-[#00f0ff]" />
                  <span>THÔNG THẠO 7</span>
                </div>

                {/* Champion Tag */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#0ac8b9]/20 border border-[#0ac8b9]/60 text-[10px] font-rajdhani font-bold text-[#00f0ff] tracking-wider uppercase">
                  {champ.tag}
                </div>
              </div>

              {/* Champion Info & Stats */}
              <div className="p-5 space-y-4 bg-gradient-to-b from-[#091428] to-[#010a13]">
                
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-2xl font-cinzel font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                      {champ.name}
                    </h3>
                    <p className="text-xs font-rajdhani text-[#c89b3c] tracking-wider uppercase">
                      {champ.title} • {champ.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-orbitron font-bold text-[#ffd700]">
                      {champ.mastery}
                    </span>
                  </div>
                </div>

                {/* Stat Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#c89b3c]/20">
                  <div className="p-2 rounded bg-[#010a13] border border-[#c89b3c]/20 text-center">
                    <div className="text-xs font-rajdhani text-gray-400">Tỉ Lệ Thắng</div>
                    <div className="text-sm font-orbitron font-bold text-[#00f0ff]">{champ.winrate}</div>
                  </div>
                  <div className="p-2 rounded bg-[#010a13] border border-[#c89b3c]/20 text-center">
                    <div className="text-xs font-rajdhani text-gray-400">KDA</div>
                    <div className="text-xs font-orbitron font-bold text-[#f0e6d2]">{champ.kda}</div>
                  </div>
                  <div className="p-2 rounded bg-[#010a13] border border-[#c89b3c]/20 text-center">
                    <div className="text-xs font-rajdhani text-gray-400">Pentakill</div>
                    <div className="text-sm font-orbitron font-bold text-[#ffd700]">{champ.pentas.split(' ')[0]}</div>
                  </div>
                </div>

                {/* Champion Quote */}
                <p className="text-xs italic text-gray-400 border-l-2 border-[#00f0ff] pl-2.5 line-clamp-2">
                  {champ.quote}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
