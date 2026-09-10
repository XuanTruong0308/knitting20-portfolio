import React, { useState } from 'react';
import { QrCode, Copy, Check, Heart, ShieldCheck, CreditCard, Sparkles, CheckCircle, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export default function DonateTerminal({ streamerConfig }) {
  const [copiedField, setCopiedField] = useState(null);

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#091428] border border-[#ffd700]/40 text-xs font-rajdhani font-bold tracking-widest text-[#ffd700] uppercase">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            CỔNG DONATE TRỰC TIẾP CHÍNH CHỦ
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-wide">
            LÕI NĂNG LƯỢNG <span className="text-gold-gradient">VIETQR BANKING</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Mọi sự ủng hộ dù lớn hay nhỏ đều là nguồn động viên quý báu giúp <strong>{streamerConfig.name}</strong> duy trì đam mê livestream và leo rank mỗi ngày!
          </p>
        </div>

        {/* Centered Main Terminal Box */}
        <div className="hextech-border p-6 sm:p-10 rounded-2xl shadow-hextech-gold bg-[#091428]/90 relative">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: QR Code Hologram Frame */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#010a13] border border-[#c89b3c]/50 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative p-2.5 bg-white rounded-lg shadow-2xl">
                <img
                  src={qrUrl}
                  alt="VietQR Banking Code"
                  className="w-56 h-56 sm:w-60 sm:h-60 object-contain rounded"
                />
                {/* Scanline Overlay */}
                <div className="absolute inset-0 scanline pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity" />
              </div>

              <div className="mt-4 text-center space-y-1">
                <div className="text-xs font-rajdhani font-bold text-[#ffd700] flex items-center justify-center gap-1.5 uppercase">
                  <QrCode className="w-4 h-4 text-[#00f0ff]" />
                  Quét bằng App Ngân Hàng / MoMo
                </div>
                <div className="text-[11px] text-gray-400">
                  Tự động điền đúng STK & Tên thụ hưởng
                </div>
              </div>
            </div>

            {/* Right Column: 1-Click Copy Information Details */}
            <div className="md:col-span-7 space-y-4 text-left">
              
              <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-3">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-[#00f0ff]" />
                  <span className="font-cinzel font-bold text-lg text-white">
                    THÔNG TIN CHUYỂN KHOẢN
                  </span>
                </div>
                <span className="text-xs font-rajdhani text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  0% Phí Trung Gian
                </span>
              </div>

              {/* Bank Name */}
              <div className="flex items-center justify-between p-3.5 bg-[#010a13] border border-[#c89b3c]/30 rounded-lg">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Ngân Hàng (Bank)</div>
                  <div className="text-sm font-semibold text-white">{bankInfo.bankName}</div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.bankName, 'bank')}
                  className="p-2 rounded bg-[#091428] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors"
                  title="Sao chép tên ngân hàng"
                >
                  {copiedField === 'bank' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Account Number (Highlight) */}
              <div className="flex items-center justify-between p-3.5 bg-[#010a13] border border-[#ffd700]/50 rounded-lg shadow-hextech-gold">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Số Tài Khoản (STK)</div>
                  <div className="text-xl font-orbitron font-bold text-[#ffd700] tracking-widest">
                    {bankInfo.accountNumber}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountNumber, 'stk')}
                  className="px-4 py-2 rounded bg-[#ffd700] hover:bg-amber-400 text-black font-rajdhani font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  {copiedField === 'stk' ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>ĐÃ COPY!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-black" />
                      <span>COPY STK</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account Name */}
              <div className="flex items-center justify-between p-3.5 bg-[#010a13] border border-[#c89b3c]/30 rounded-lg">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Chủ Tài Khoản</div>
                  <div className="text-sm font-bold uppercase text-[#00f0ff]">{bankInfo.accountName}</div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountName, 'name')}
                  className="p-2 rounded bg-[#091428] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors"
                  title="Sao chép chủ tài khoản"
                >
                  {copiedField === 'name' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Memo Note */}
              <div className="flex items-center justify-between p-3.5 bg-[#010a13] border border-[#c89b3c]/30 rounded-lg">
                <div className="text-left">
                  <div className="text-[11px] font-rajdhani uppercase text-gray-400">Nội Dung Lời Nhắn</div>
                  <div className="text-xs font-mono text-gray-300">
                    {bankInfo.memoPrefix} [Tên_bạn]
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`${bankInfo.memoPrefix}`, 'memo')}
                  className="p-2 rounded bg-[#091428] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors"
                  title="Sao chép nội dung"
                >
                  {copiedField === 'memo' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-rajdhani text-gray-400">
                  <CheckCircle className="w-4 h-4 text-[#00f0ff]" />
                  <span>Chuyển trực tiếp tới streamer</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-rajdhani text-gray-400">
                  <Zap className="w-4 h-4 text-[#ffd700]" />
                  <span>Xác nhận nhanh Napas 24/7</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

