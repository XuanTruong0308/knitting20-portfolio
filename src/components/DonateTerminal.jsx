import React, { useState } from 'react';
import { QrCode, Copy, Check, Heart, Sparkles, Trophy, Coffee, Flame, ShieldAlert, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

const DONATION_TIERS = [
  { amount: '20,000đ', title: 'Ly Cà Phê Leo Rank', desc: 'Tiếp thêm năng lượng quẩy xuyên màn đêm', icon: Coffee },
  { amount: '50,000đ', title: 'Rương & Chìa Hextech', desc: 'Mở ra vận may skin Thần Thoại / Tối Hậu', icon: Sparkles },
  { amount: '100,000đ', title: 'Solo 1v1 Kèo Yasuo', desc: 'Thử sức solo kỹ năng cùng streamer trên stream', icon: Flame },
  { amount: '200,000đ', title: 'Gói VIP Fan Cứng', desc: 'Vinh danh bảng vàng & Slot đánh rank cùng', icon: Trophy },
];

const TOP_SUPPORTERS = [
  { name: 'Hoàng Long (Yasuo Chúa)', amount: '5,000,000đ', message: 'Mãi đỉnh anh ơi, pha 1v5 Baron xem cuốn thực sự!' },
  { name: 'Minh Đức (Mid King)', amount: '3,200,000đ', message: 'Chúc anh sớm lên Top 1 Thách Đấu máy chủ VN.' },
  { name: 'Anh Tuấn Saigon', amount: '2,500,000đ', message: 'Ủng hộ kênh phát triển mạnh mẽ hơn nữa!' },
  { name: 'Tuấn Kiệt Gamer', amount: '1,500,000đ', message: 'Cảm ơn anh vì những video giáo án mid cực hay.' },
];

export default function DonateTerminal({ streamerConfig }) {
  const [copiedField, setCopiedField] = useState(null);
  const [selectedTier, setSelectedTier] = useState(DONATION_TIERS[1]);

  const bankInfo = streamerConfig.banking;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#ffd700', '#0ac8b9', '#f0e6d2']
    });
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    soundFx.playDonateSuccess();
    triggerConfetti();
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  // Generate standard VietQR Image URL
  const qrUrl = `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNumber}-compact2.png?amount=0&addInfo=${encodeURIComponent(bankInfo.memoPrefix || 'Ủng hộ streamer')}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  return (
    <section id="donate" className="py-20 relative bg-[#010a13] border-t border-[#c89b3c]/20">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#ffd700]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#091428] border border-[#ffd700]/40 text-xs font-rajdhani font-bold tracking-widest text-[#ffd700] uppercase">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            CỔNG HỖ TRỢ & DONATE TRỰC TIẾP
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-wide">
            LÕI NĂNG LƯỢNG <span className="text-gold-gradient">VIETQR DONATE</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Mỗi sự ủng hộ của các bạn là nguồn động lực to lớn giúp mình duy trì livestream, nâng cấp thiết bị và sáng tạo nội dung chất lượng hơn.
          </p>
        </div>

        {/* Main Terminal Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* QR Terminal Card (Left) */}
          <div className="lg:col-span-6 hextech-border p-6 sm:p-8 rounded-xl shadow-hextech-gold relative space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="font-cinzel font-bold text-lg text-white">
                  TERMINAL VIETQR 24/7
                </span>
              </div>
              <span className="text-xs font-rajdhani text-[#00f0ff] border border-[#00f0ff]/30 px-2 py-0.5 rounded bg-[#00f0ff]/10">
                0% PHÍ TRUNG GIAN
              </span>
            </div>

            {/* QR Code Hologram Frame */}
            <div className="flex flex-col items-center justify-center p-4 bg-[#091428] border border-[#c89b3c]/50 rounded-lg relative overflow-hidden group">
              <div className="relative p-2 bg-white rounded-md shadow-2xl">
                <img
                  src={qrUrl}
                  alt="VietQR Banking Code"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded"
                />
                {/* Scanline Overlay */}
                <div className="absolute inset-0 scanline pointer-events-none opacity-40 group-hover:opacity-10 transition-opacity" />
              </div>

              <div className="mt-3 text-center space-y-1">
                <div className="text-xs font-rajdhani font-semibold text-gray-300 flex items-center justify-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#ffd700]" />
                  Quét bằng ứng dụng Ngân hàng (Vietcombank, MB, Techcombank, TPBank, MoMo...)
                </div>
              </div>
            </div>

            {/* 1-Click Copy Information Details */}
            <div className="space-y-3">
              {/* Bank Name */}
              <div className="flex items-center justify-between p-3 bg-[#091428] border border-[#c89b3c]/30 rounded">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Ngân Hàng (Bank)</div>
                  <div className="text-sm font-semibold text-white">{bankInfo.bankName}</div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.bankName, 'bank')}
                  className="p-2 rounded bg-[#010a13] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors"
                  title="Sao chép tên ngân hàng"
                >
                  {copiedField === 'bank' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-3 bg-[#091428] border border-[#c89b3c]/30 rounded">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Số Tài Khoản (STK)</div>
                  <div className="text-lg font-orbitron font-bold text-[#ffd700] tracking-wider">
                    {bankInfo.accountNumber}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountNumber, 'stk')}
                  className="px-3 py-1.5 rounded bg-[#010a13] border border-[#ffd700] text-xs font-rajdhani font-bold text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-colors flex items-center gap-1.5 shadow-hextech-gold"
                >
                  {copiedField === 'stk' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>ĐÃ COPY!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY STK</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account Name */}
              <div className="flex items-center justify-between p-3 bg-[#091428] border border-[#c89b3c]/30 rounded">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Chủ Tài Khoản</div>
                  <div className="text-sm font-semibold uppercase text-[#00f0ff]">{bankInfo.accountName}</div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountName, 'name')}
                  className="p-2 rounded bg-[#010a13] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors"
                  title="Sao chép chủ tài khoản"
                >
                  {copiedField === 'name' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Memo Note */}
              <div className="flex items-center justify-between p-3 bg-[#091428] border border-[#c89b3c]/30 rounded">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Nội Dung Lời Nhắn</div>
                  <div className="text-xs font-mono text-gray-300">
                    {bankInfo.memoPrefix} [Tên_bạn] [Lời_chúc]
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`${bankInfo.memoPrefix} Donate`, 'memo')}
                  className="p-2 rounded bg-[#010a13] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors"
                  title="Sao chép nội dung"
                >
                  {copiedField === 'memo' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

          {/* Donation Perks & Hall of Supporters (Right) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Donation Perks / Tiers */}
            <div className="hextech-border p-6 rounded-xl space-y-4">
              <h3 className="font-cinzel font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ffd700]" />
                CÁC MỐC ỦNG HỘ Ý NGHĨA
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DONATION_TIERS.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <div
                      key={tier.amount}
                      onClick={() => {
                        setSelectedTier(tier);
                        soundFx.playClick();
                      }}
                      className={`p-3.5 rounded border transition-all cursor-pointer text-left ${
                        selectedTier.amount === tier.amount
                          ? 'border-[#ffd700] bg-[#c89b3c]/15 shadow-hextech-gold'
                          : 'border-[#c89b3c]/30 bg-[#091428] hover:border-[#00f0ff]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-orbitron font-bold text-[#ffd700]">
                          {tier.amount}
                        </span>
                        <Icon className="w-4 h-4 text-[#00f0ff]" />
                      </div>
                      <div className="text-xs font-semibold text-white">{tier.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{tier.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hall of Supporters (Bảng Vinh Danh Fan Cứng) */}
            <div className="hextech-border p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-3">
                <h3 className="font-cinzel font-bold text-lg text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#ffd700]" />
                  BẢNG VINH DANH TRI ÂN FAN
                </h3>
                <span className="text-xs font-rajdhani text-[#ffd700]">TOP DONATE</span>
              </div>

              <div className="space-y-3">
                {TOP_SUPPORTERS.map((supporter, idx) => (
                  <div
                    key={supporter.name}
                    className="p-3 rounded bg-[#091428] border border-[#c89b3c]/20 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-orbitron font-bold text-xs ${
                        idx === 0 ? 'bg-[#ffd700] text-black' :
                        idx === 1 ? 'bg-gray-300 text-black' :
                        idx === 2 ? 'bg-[#c89b3c] text-white' : 'bg-[#010a13] text-gray-400 border border-gray-700'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{supporter.name}</div>
                        <div className="text-xs text-gray-400 italic">"{supporter.message}"</div>
                      </div>
                    </div>
                    <div className="text-sm font-orbitron font-bold text-[#00f0ff] whitespace-nowrap ml-2">
                      {supporter.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
