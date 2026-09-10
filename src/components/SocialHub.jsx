import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Bell, 
  BellRing, 
  Sparkles, 
  ExternalLink, 
  CheckCircle, 
  Users, 
  Send, 
  ShieldCheck, 
  Flame,
  Tv
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function SocialHub({ streamerConfig }) {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(null); // 'loading', 'success', 'error'
  const [webPushEnabled, setWebPushEnabled] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Check initial browser notification permission
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        const isSaved = localStorage.getItem(`live_alert_${streamerConfig.tiktokUsername}`);
        if (isSaved === 'true') {
          setWebPushEnabled(true);
        }
      }
    }
  }, [streamerConfig.tiktokUsername]);

  const triggerSubscribedConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#ffd700', '#0ac8b9']
    });
  };

  // Handle Browser Push Notification Subscription via Service Worker
  const handleToggleWebPush = async () => {
    soundFx.playClick();
    if (!('Notification' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng Web Notification.');
      return;
    }

    if (webPushEnabled) {
      setWebPushEnabled(false);
      localStorage.setItem(`live_alert_${streamerConfig.tiktokUsername}`, 'false');
      setNotificationMsg('Đã tắt thông báo đẩy trên thiết bị.');
      setTimeout(() => setNotificationMsg(''), 3000);
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setWebPushEnabled(true);
        localStorage.setItem(`live_alert_${streamerConfig.tiktokUsername}`, 'true');
        soundFx.playDonateSuccess();
        triggerSubscribedConfetti();
        setNotificationMsg('Đã bật chuông! Hệ thống sẽ thông báo thẳng về điện thoại / PC khi bạn lên sóng.');
        
        // Register Service Worker for Background Web Push
        if ('serviceWorker' in navigator) {
          try {
            const reg = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker đã sẵn sàng:', reg);
          } catch (e) {
            console.log('SW registration note:', e);
          }
        }

        // Show sample desktop notification
        try {
          new Notification('KNITTING20 - ĐÃ BẬT THÔNG BÁO!', {
            body: 'Bạn sẽ nhận được thông báo ngay khi streamer phát trực tiếp trên TikTok.',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: 'welcome-notification'
          });
        } catch {
          // Ignore
        }
      } else {
        setNotificationMsg('Bạn đã từ chối quyền thông báo trên trình duyệt. Vui lòng mở quyền trong cài đặt trình duyệt để nhận tin.');
      }
    } catch {
      setNotificationMsg('Không thể kích hoạt thông báo trên thiết bị này.');
    }

    setTimeout(() => {
      setNotificationMsg('');
    }, 5000);
  };

  // Handle Email Live Alert Subscription
  const handleEmailSubscribe = (e) => {
    e.preventDefault();
    if (!subscribedEmail || !subscribedEmail.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    setEmailStatus('loading');
    soundFx.playClick();

    setTimeout(() => {
      setEmailStatus('success');
      soundFx.playDonateSuccess();
      triggerSubscribedConfetti();
      localStorage.setItem(`email_sub_${streamerConfig.tiktokUsername}`, subscribedEmail);
    }, 800);
  };

  return (
    <section id="socials" className="py-12 sm:py-20 relative bg-[#040e1a] border-t border-[#c89b3c]/20">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#c89b3c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-16">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded bg-[#091428] border border-[#00f0ff]/40 text-[10px] sm:text-xs font-rajdhani font-bold tracking-wider sm:tracking-widest text-[#00f0ff] uppercase">
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 animate-pulse" />
            TIKTOK LIVE STREAM & ALERT CENTER
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-wide leading-tight">
            TRẠNG THÁI LIVE & <span className="text-cyan-gradient">ĐĂNG KÝ THÔNG BÁO</span>
          </h2>
          <p className="text-gray-400 font-sans text-xs sm:text-sm lg:text-base">
            Theo dõi phòng phát sóng trực tiếp TikTok của <strong>{streamerConfig.name}</strong> (@{streamerConfig.tiktokUsername}) và đăng ký nhận chuông báo tự động để không bỏ lỡ các buổi livestream.
          </p>
        </motion.div>

        {/* Live Status & Notification Subscription Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Live Terminal Card */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-6 hextech-border p-4 sm:p-7 rounded-xl bg-[#091428]/90 relative flex flex-col justify-between space-y-5 sm:space-y-6 shadow-hextech-cyan"
          >
            
            {/* Top Live Indicator */}
            <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-3 sm:pb-4 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${streamerConfig.isLive ? 'bg-red-500 animate-ping' : 'bg-gray-500'}`} />
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${streamerConfig.isLive ? 'bg-red-600' : 'bg-gray-600'} absolute inset-0`} />
                </div>
                <div className="text-left truncate">
                  <h3 className="font-cinzel font-bold text-base sm:text-lg text-white truncate">
                    TIKTOK LIVE ROOM
                  </h3>
                  <div className="text-[11px] sm:text-xs font-rajdhani text-gray-400">
                    ID: @{streamerConfig.tiktokUsername}
                  </div>
                </div>
              </div>

              <div className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-xs font-orbitron font-bold flex items-center gap-1 sm:gap-1.5 shrink-0 ${
                streamerConfig.isLive 
                  ? 'bg-red-950/60 text-red-400 border border-red-500/50 animate-pulse'
                  : 'bg-[#010a13] text-gray-400 border border-gray-700'
              }`}>
                {streamerConfig.isLive ? '🔴 LIVE' : '⚪ OFFLINE'}
              </div>
            </div>

            {/* Middle Preview / Hologram Visual */}
            <div className="p-4 sm:p-6 bg-[#010a13] border border-[#00f0ff]/30 rounded-lg relative overflow-hidden text-center space-y-3 sm:space-y-4">
              <div className="absolute inset-0 scanline pointer-events-none opacity-40" />
              
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] flex items-center justify-center mx-auto shadow-hextech-cyan">
                {streamerConfig.isLive ? (
                  <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-bounce" />
                ) : (
                  <Tv className="w-6 h-6 sm:w-8 sm:h-8 text-[#00f0ff]" />
                )}
              </div>

              <div className="space-y-1">
                <div className="text-sm sm:text-base font-cinzel font-bold text-white flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                  <span>{streamerConfig.name}</span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#00f0ff] px-1.5 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                    {streamerConfig.title}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  {streamerConfig.isLive 
                    ? 'Streamer đang phát sóng trực tiếp trên TikTok! Nhấp vào nút bên dưới để vào xem và giao lưu ngay.'
                    : 'Kênh TikTok chính thức của streamer. Bạn có thể nhấn nút bên dưới để chuyển thẳng sang kênh xem video hoặc bật chuông nhận thông báo khi lên sóng.'}
                </p>
              </div>
            </div>

            {/* Bottom Direct CTA */}
            <div>
              <a
                href={streamerConfig.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="w-full hextech-btn-cyan py-3 sm:py-3.5 px-4 sm:px-6 rounded text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-hextech-cyan group"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.28a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.28 8.28 0 0 0 4.91 1.6V6.87a4.86 4.86 0 0 1-1-.18z"/>
                </svg>
                <span>CHUYỂN ĐẾN KÊNH TIKTOK</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>

          </motion.div>

          {/* Right Column: Web Push & Email Live Alert Subscription Center */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-6 hextech-border p-4 sm:p-7 rounded-xl bg-[#091428]/90 relative flex flex-col justify-between space-y-5 sm:space-y-6 shadow-hextech-gold"
          >
            
            {/* Top Title */}
            <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-3 sm:pb-4 gap-2">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffd700] shrink-0" />
                <span className="font-cinzel font-bold text-base sm:text-lg text-white">
                  TRẠM THÔNG BÁO TỰ ĐỘNG
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-rajdhani text-[#ffd700] border border-[#ffd700]/30 px-1.5 py-0.5 rounded bg-[#ffd700]/10 shrink-0">
                REAL-TIME PUSH
              </span>
            </div>

            {/* Notification Subscription Content */}
            <div className="space-y-4 sm:space-y-6 text-left">
              
              {/* Push Bell System */}
              <div className="p-3.5 sm:p-4 bg-[#010a13] border border-[#c89b3c]/40 rounded-lg space-y-3">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-[#091428] border border-[#00f0ff] flex items-center justify-center shrink-0 text-[#00f0ff]">
                    {webPushEnabled ? (
                      <BellRing className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffd700] animate-bounce" />
                    ) : (
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Bật Chuông Trình Duyệt (Web Push)
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed mt-0.5">
                      Nhận thông báo nổi ngay lập tức trên máy tính hoặc điện thoại mỗi khi streamer bắt đầu phát trực tiếp.
                    </p>
                  </div>
                </div>

                {notificationMsg && (
                  <div className="p-2 sm:p-2.5 rounded text-[11px] sm:text-xs bg-[#091428] border border-[#00f0ff] text-[#00f0ff]">
                    {notificationMsg}
                  </div>
                )}

                <button
                  onClick={handleToggleWebPush}
                  className={`w-full py-2.5 px-3 sm:px-4 rounded font-rajdhani font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all ${
                    webPushEnabled
                      ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-400 hover:bg-emerald-900/80 shadow-md'
                      : 'hextech-btn-gold'
                  }`}
                >
                  {webPushEnabled ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">ĐÃ BẬT CHUÔNG BÁO (CLICK ĐỂ TẮT)</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd700] shrink-0" />
                      <span className="truncate">NHẤP ĐỂ BẬT CHUÔNG BÁO</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email Alerts Backup */}
              <div className="p-3.5 sm:p-4 bg-[#010a13] border border-[#c89b3c]/40 rounded-lg space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff]" />
                  <h4 className="text-[11px] sm:text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Nhận thông báo qua Email
                  </h4>
                </div>

                {emailStatus === 'success' ? (
                  <div className="p-2.5 sm:p-3 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs text-center flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Đã đăng ký email thành công!</span>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubscribe} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Nhập địa chỉ email của bạn..."
                      value={subscribedEmail}
                      onChange={(e) => setSubscribedEmail(e.target.value)}
                      className="flex-1 bg-[#091428] border border-[#c89b3c]/30 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === 'loading'}
                      className="px-4 py-2 rounded bg-[#00f0ff] hover:bg-cyan-300 text-black font-rajdhani font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      {emailStatus === 'loading' ? 'ĐANG GỬI...' : 'ĐĂNG KÝ'}
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Fast Channel Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs text-gray-400 border-t border-[#c89b3c]/20">
              <span>Hỗ trợ: Chrome, Safari, Android, iOS</span>
              <span className="text-[#00f0ff] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Miễn phí
              </span>
            </div>

          </motion.div>

        </div>

        {/* Facebook Community Section with Motion */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="hextech-border p-5 sm:p-8 md:p-10 rounded-xl relative overflow-hidden bg-gradient-to-r from-[#010a13] via-[#091428] to-[#010a13]"
        >
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded bg-[#010a13] border border-[#c89b3c]/40 text-[10px] sm:text-xs font-rajdhani font-bold text-[#ffd700] uppercase">
                <Users className="w-3.5 h-3.5" />
                CỘNG ĐỒNG FAN & KẾT NỐI FACEBOOK
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-white leading-tight">
                GIA NHẬP <span className="text-gold-gradient">FACEBOOK CHÍNH THỨC</span>
              </h3>
              <p className="text-gray-300 font-sans text-xs sm:text-sm lg:text-base leading-relaxed">
                Kết nối với <strong>HUYNH VAN DANG ({streamerConfig.name})</strong> trên Facebook để cùng theo dõi cập nhật, giao lưu và thảo luận cùng cộng đồng người hâm mộ!
              </p>

              {/* Fanpage verified perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-rajdhani text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff] shrink-0" />
                  <span>Cập nhật nhanh thông tin & sự kiện mới</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-rajdhani text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff] shrink-0" />
                  <span>Giao lưu trực tiếp cùng streamer và viewer</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-4">
              <a
                href={streamerConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="w-full hextech-btn-gold py-3 sm:py-4 px-4 sm:px-6 rounded text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-2.5 shadow-hextech-gold group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#00f0ff]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>FOLLOW TRÊN FACEBOOK</span>
              </a>

              <a
                href={streamerConfig.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded text-center font-rajdhani font-bold text-xs sm:text-sm text-[#00f0ff] border border-[#00f0ff]/40 bg-[#091428]/80 hover:bg-[#00f0ff]/10 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#00f0ff]" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.28a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.28 8.28 0 0 0 4.91 1.6V6.87a4.86 4.86 0 0 1-1-.18z"/>
                </svg>
                <span>THEO DÕI KÊNH TIKTOK</span>
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
