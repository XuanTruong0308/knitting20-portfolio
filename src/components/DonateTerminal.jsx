import React, { useState } from 'react';
import { QrCode, Copy, Check, Heart, ShieldCheck, CreditCard, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

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
    <section id="donate" className="py-12 sm:py-20 relative bg-[#010a13] border-t border-[#c89b3c]/20">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#ffd700]/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded bg-[#091428] border border-[#ffd700]/40 text-[10px] sm:text-xs font-rajdhani font-bold tracking-wider sm:tracking-widest text-[#ffd700] uppercase">
            <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 fill-current" />
            CỔNG DONATE TRỰC TIẾP CHÍNH CHỦ
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-wide leading-tight">
            LÕI NĂNG LƯỢNG <span className="text-gold-gradient">VIETQR BANKING</span>
          </h2>
          <p className="text-gray-400 font-sans text-xs sm:text-sm lg:text-base">
            Mọi sự ủng hộ dù lớn hay nhỏ đều là nguồn động viên quý báu giúp <strong>{streamerConfig.name}</strong> duy trì đam mê livestream và leo rank mỗi ngày!
          </p>
        </motion.div>

        {/* Centered Main Terminal Box with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hextech-border p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-hextech-gold bg-[#091428]/90 relative"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Column: QR Code Hologram Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#010a13] border border-[#c89b3c]/50 rounded-xl relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative p-2 bg-white rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <img
                  src={qrUrl}
                  alt="VietQR Banking Code"
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded"
                />
                {/* Scanline Overlay */}
                <div className="absolute inset-0 scanline pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity" />
              </div>

              <div className="mt-3 sm:mt-4 text-center space-y-0.5 sm:space-y-1">
                <div className="text-[11px] sm:text-xs font-rajdhani font-bold text-[#ffd700] flex items-center justify-center gap-1.5 uppercase">
                  <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff]" />
                  Quét bằng App Ngân Hàng / MoMo
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-400">
                  Tự động điền đúng STK & Tên thụ hưởng
                </div>
              </div>
            </motion.div>

            {/* Right Column: 1-Click Copy Information Details */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-7 space-y-3 sm:space-y-4 text-left"
            >
              
              <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#00f0ff]" />
                  <span className="font-cinzel font-bold text-base sm:text-lg text-white">
                    THÔNG TIN CHUYỂN KHOẢN
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-rajdhani text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/30 flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  0% Phí Trung Gian
                </span>
              </div>

              {/* Bank Name */}
              <motion.div variants={itemVariants} className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#010a13] border border-[#c89b3c]/30 rounded-lg hover:border-[#00f0ff]/50 transition-colors">
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-rajdhani uppercase text-gray-400">Ngân Hàng (Bank)</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{bankInfo.bankName}</div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.bankName, 'bank')}
                  className="p-1.5 sm:p-2 rounded bg-[#091428] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors shrink-0"
                  title="Sao chép tên ngân hàng"
                >
                  {copiedField === 'bank' ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </motion.div>

              {/* Account Number (Highlight) */}
              <motion.div variants={itemVariants} className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#010a13] border border-[#ffd700]/50 rounded-lg shadow-hextech-gold">
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-rajdhani uppercase text-gray-400">Số Tài Khoản (STK)</div>
                  <div className="text-base sm:text-xl font-orbitron font-bold text-[#ffd700] tracking-wider sm:tracking-widest">
                    {bankInfo.accountNumber}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountNumber, 'stk')}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded bg-[#ffd700] hover:bg-amber-400 text-black font-rajdhani font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-all shadow-md hover:scale-105 shrink-0"
                >
                  {copiedField === 'stk' ? (
                    <>
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                      <span>ĐÃ COPY!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                      <span>COPY STK</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Account Name */}
              <motion.div variants={itemVariants} className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#010a13] border border-[#c89b3c]/30 rounded-lg hover:border-[#00f0ff]/50 transition-colors">
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-rajdhani uppercase text-gray-400">Chủ Tài Khoản</div>
                  <div className="text-xs sm:text-sm font-bold uppercase text-[#00f0ff]">{bankInfo.accountName}</div>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountName, 'name')}
                  className="p-1.5 sm:p-2 rounded bg-[#091428] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors shrink-0"
                  title="Sao chép chủ tài khoản"
                >
                  {copiedField === 'name' ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </motion.div>

              {/* Memo Note */}
              <motion.div variants={itemVariants} className="flex items-center justify-between p-2.5 sm:p-3.5 bg-[#010a13] border border-[#c89b3c]/30 rounded-lg hover:border-[#00f0ff]/50 transition-colors">
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-rajdhani uppercase text-gray-400">Nội Dung Lời Nhắn</div>
                  <div className="text-[11px] sm:text-xs font-mono text-gray-300">
                    {bankInfo.memoPrefix} [Tên_bạn]
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`${bankInfo.memoPrefix}`, 'memo')}
                  className="p-1.5 sm:p-2 rounded bg-[#091428] border border-[#c89b3c]/40 hover:border-[#00f0ff] text-gray-300 hover:text-[#00f0ff] transition-colors shrink-0"
                  title="Sao chép nội dung"
                >
                  {copiedField === 'memo' ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </motion.div>

              {/* Verified Trust Badges */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-rajdhani text-gray-400">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff] shrink-0" />
                  <span>Chuyển trực tiếp tới streamer</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-rajdhani text-gray-400">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd700] shrink-0" />
                  <span>Xác nhận nhanh Napas 24/7</span>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
