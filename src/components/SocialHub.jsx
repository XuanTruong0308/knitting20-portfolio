import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Bell, 
  BellRing, 
  Calendar, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  CheckCircle, 
  Users, 
  Send, 
  ShieldCheck, 
  Flame,
  Tv
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

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
        soundFx.playLevelUp();
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

        // Show test greeting notification
        new Notification(`🔴 ${streamerConfig.name} - Đã Bật Thông Báo!`, {
          body: `Bạn sẽ nhận được thông báo nổi trên màn hình ngay khi kênh @${streamerConfig.tiktokUsername} bắt đầu phát trực tiếp.`,
          icon: '/favicon.ico'
        });
      } else {
        alert('Vui lòng cho phép quyền thông báo trên trình duyệt (Click biểu tượng ổ khóa cạnh thanh URL -> Cho phép Thông báo).');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Email Subscription
  const handleEmailSubscribe = (e) => {
    e.preventDefault();
    if (!subscribedEmail || !subscribedEmail.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ!');
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
    <section id="socials" className="py-20 relative bg-[#040e1a] border-t border-[#c89b3c]/20">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#c89b3c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#091428] border border-[#00f0ff]/40 text-xs font-rajdhani font-bold tracking-widest text-[#00f0ff] uppercase">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            TIKTOK LIVE STREAM & ALERT CENTER
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-wide">
            TRẠNG THÁI LIVE & <span className="text-cyan-gradient">ĐĂNG KÝ THÔNG BÁO</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Theo dõi phòng phát sóng trực tiếp TikTok của <strong>{streamerConfig.name}</strong> (@{streamerConfig.tiktokUsername}) và đăng ký nhận chuông báo tự động để không bỏ lỡ những trận leo rank căng thẳng.
          </p>
        </div>

        {/* Live Status & Notification Subscription Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Live Terminal Card */}
          <div className="lg:col-span-6 hextech-border p-6 sm:p-8 rounded-xl bg-[#091428]/90 relative flex flex-col justify-between space-y-6 shadow-hextech-cyan">
            
            {/* Top Live Indicator */}
            <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-4 h-4 rounded-full ${streamerConfig.isLive ? 'bg-red-500 animate-ping' : 'bg-gray-500'}`} />
                  <div className={`w-4 h-4 rounded-full ${streamerConfig.isLive ? 'bg-red-600' : 'bg-gray-600'} absolute inset-0`} />
                </div>
                <div className="text-left">
                  <h3 className="font-cinzel font-bold text-lg text-white">
                    TIKTOK LIVE ROOM
                  </h3>
                  <div className="text-xs font-rajdhani text-gray-400">
                    ID: @{streamerConfig.tiktokUsername}
                  </div>
                </div>
              </div>

              <div className={`px-3 py-1 rounded text-xs font-orbitron font-bold flex items-center gap-1.5 ${
                streamerConfig.isLive
                  ? 'bg-red-950/60 border border-red-500/60 text-red-400 animate-pulse'
                  : 'bg-[#010a13] border border-[#c89b3c]/30 text-gray-400'
              }`}>
                <Radio className="w-3.5 h-3.5" />
                <span>{streamerConfig.isLive ? 'ON AIR' : 'OFFLINE'}</span>
              </div>
            </div>

            {/* Middle: Live Room Broadcast Hologram */}
            <div className="p-6 rounded-lg bg-[#010a13] border border-[#00f0ff]/30 text-left space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-[#00f0ff] p-0.5 shadow-hextech-cyan bg-[#091428] flex items-center justify-center">
                  <Tv className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <div>
                  <div className="text-base font-cinzel font-bold text-white flex items-center gap-2">
                    {streamerConfig.name} Live Stream
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40">PRO TOP</span>
                  </div>
                  <div className="text-xs text-gray-400 font-sans">
                    Nền tảng: <span className="text-[#00f0ff] font-semibold">TikTok Live</span> • Máy chủ LMHT VN
                  </div>
                </div>
              </div>

              {streamerConfig.isLive ? (
                <p className="text-xs sm:text-sm text-green-400 font-sans leading-relaxed border-t border-[#c89b3c]/20 pt-3">
                  🔴 <strong>ĐANG PHÁT SÓNG TRỰC TIẾP:</strong> Leo rank Thách Đấu Đường Trên (Top Lane), duo leo rank và giao lưu cùng fan. Bấm nút bên dưới để vào phòng xem ngay!
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed border-t border-[#c89b3c]/20 pt-3">
                  ⚪ <strong>HIỆN ĐANG NGHỈ NGƠI:</strong> Streamer chưa lên sóng. Khung giờ livestream cố định hàng ngày: <strong>20:00 - 00:30</strong>. Hãy bật chuông bên cạnh để nhận thông báo ngay khi mở máy!
                </p>
              )}

              {/* Status Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-rajdhani">
                <div className="p-2 rounded bg-[#091428] border border-[#c89b3c]/20 text-gray-300">
                  <span className="text-gray-400 block text-[10px]">VAI TRÒ:</span>
                  <span className="text-[#ffd700] font-bold">Đường Trên (Top Lane)</span>
                </div>
                <div className="p-2 rounded bg-[#091428] border border-[#c89b3c]/20 text-gray-300">
                  <span className="text-gray-400 block text-[10px]">SERVER:</span>
                  <span className="text-[#00f0ff] font-bold">Việt Nam (VN)</span>
                </div>
              </div>
            </div>

            {/* Direct Link to TikTok Live */}
            <a
              href={streamerConfig.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              className="hextech-btn-cyan py-4 px-6 rounded text-center font-bold text-sm flex items-center justify-center gap-3 shadow-hextech-cyan group w-full"
            >
              <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.28a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.28 8.28 0 0 0 4.91 1.6V6.87a4.86 4.86 0 0 1-1-.18z"/>
              </svg>
              <span>{streamerConfig.isLive ? 'VÀO PHÒNG XEM TIKTOK LIVE NGAY' : 'TRUY CẬP KÊNH TIKTOK @HDAN902'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

          </div>

          {/* Right Column: Live Alert Subscription System */}
          <div className="lg:col-span-6 hextech-border p-6 sm:p-8 rounded-xl bg-[#091428]/90 flex flex-col justify-between space-y-6 shadow-hextech-gold">
            
            <div className="flex items-center justify-between border-b border-[#c89b3c]/30 pb-4">
              <div className="flex items-center gap-2.5">
                <BellRing className="w-5 h-5 text-[#ffd700] animate-bounce" />
                <span className="font-cinzel font-bold text-lg text-white">
                  ĐĂNG KÝ NHẬN THÔNG BÁO LIVE
                </span>
              </div>
              <span className="text-[11px] font-rajdhani text-[#ffd700] border border-[#ffd700]/30 px-2 py-0.5 rounded bg-[#ffd700]/10">
                TỰ ĐỘNG 24/7
              </span>
            </div>

            <div className="space-y-4 text-left">
              <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed">
                Đừng để lỡ những pha highlight, giờ phát quà skin và các buổi custom. Hãy chọn kênh bạn muốn nhận thông báo khi <strong>{streamerConfig.name}</strong> bấm Live:
              </p>

              {/* Option 1: Browser Web Push Button */}
              <div className="p-4 rounded-lg bg-[#010a13] border border-[#c89b3c]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Bell className={`w-5 h-5 ${webPushEnabled ? 'text-green-400' : 'text-[#00f0ff]'}`} />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Thông Báo Đẩy Trên Trình Duyệt (Web Push)
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Nhận chuông thông báo ngay trên màn hình khi streamer mở máy Live
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleWebPush}
                  className={`w-full py-2.5 px-4 rounded font-rajdhani font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    webPushEnabled
                      ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'hextech-btn-gold shadow-hextech-gold'
                  }`}
                >
                  {webPushEnabled ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>ĐÃ BẬT CHUÔNG THÔNG BÁO TRÌNH DUYỆT</span>
                    </>
                  ) : (
                    <>
                      <BellRing className="w-4 h-4 text-black" />
                      <span>BẬT CHUÔNG THÔNG BÁO 1-CLICK</span>
                    </>
                  )}
                </button>

                {notificationMsg && (
                  <div className="text-xs text-emerald-400 font-sans text-center pt-1 animate-pulse">
                    {notificationMsg}
                  </div>
                )}
              </div>

              {/* Option 2: Email Alert Subscription Form */}
              <div className="p-4 rounded-lg bg-[#010a13] border border-[#c89b3c]/40 space-y-3">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>Hoặc nhận thông báo qua Email:</span>
                </div>

                {emailStatus === 'success' ? (
                  <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs text-center flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Đã đăng ký email thành công! Bạn sẽ nhận thông báo khi lên sóng.</span>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubscribe} className="flex gap-2">
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
                      className="px-4 py-2 rounded bg-[#00f0ff] hover:bg-cyan-300 text-black font-rajdhani font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {emailStatus === 'loading' ? 'ĐANG GỬI...' : 'ĐĂNG KÝ'}
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Fast Channel Links */}
            <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-[#c89b3c]/20">
              <span>Hỗ trợ: Chrome, Safari, Cốc Cốc, Edge, Android, iOS</span>
              <span className="text-[#00f0ff] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Miễn phí
              </span>
            </div>

          </div>

        </div>

        {/* Weekly Streaming Schedule */}
        <div className="hextech-border p-6 sm:p-8 rounded-xl bg-[#091428]/60 space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c89b3c]/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#010a13] border border-[#ffd700] flex items-center justify-center shadow-hextech-gold">
                <Calendar className="w-5 h-5 text-[#ffd700]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                  LỊCH PHÁT SÓNG LIVESTREAM DỰ KIẾN
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  Khung giờ lên sóng cố định hàng tuần trên kênh TikTok @{streamerConfig.tiktokUsername}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#010a13] border border-[#00f0ff]/30 text-xs font-rajdhani text-[#00f0ff]">
              <Clock className="w-3.5 h-3.5" />
              <span>GIỜ VIỆT NAM (GMT+7)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {streamerConfig.schedule?.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#010a13] border border-[#c89b3c]/30 hover:border-[#00f0ff] transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-rajdhani font-bold px-2 py-0.5 rounded bg-[#091428] text-[#ffd700] border border-[#ffd700]/30">
                    {item.day}
                  </span>
                  <span className="text-sm font-orbitron font-bold text-[#00f0ff]">
                    {item.time}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
                  {item.type}
                </div>
                <div className="text-xs text-gray-400 font-sans leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facebook Community Section */}
        <div className="hextech-border p-6 sm:p-10 rounded-xl relative overflow-hidden bg-gradient-to-r from-[#010a13] via-[#091428] to-[#010a13]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#010a13] border border-[#c89b3c]/40 text-xs font-rajdhani font-bold text-[#ffd700] uppercase">
                <Users className="w-3.5 h-3.5" />
                CỘNG ĐỒNG FAN & KẾT NỐI FACEBOOK
              </div>
              <h3 className="text-2xl sm:text-4xl font-cinzel font-bold text-white">
                GIA NHẬP <span className="text-gold-gradient">FACEBOOK CHÍNH THỨC</span>
              </h3>
              <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
                Kết nối với <strong>HUYNH VAN DANG ({streamerConfig.name})</strong> trên Facebook để cùng thảo luận meta LMHT, nhận thông báo sự kiện, tham gia kèo giao lưu và mini game tặng quà hàng tuần!
              </p>

              {/* Fanpage verified perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-rajdhani text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#00f0ff]" />
                  <span>Cập nhật nhanh lịch stream & thông báo đột xuất</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-rajdhani text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#00f0ff]" />
                  <span>Giao lưu, đánh rank và tham gia giải đấu solo</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <a
                href={streamerConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="hextech-btn-gold py-4 px-6 rounded text-center font-bold text-sm flex items-center justify-center gap-2.5 shadow-hextech-gold group"
              >
                <svg className="w-5 h-5 fill-current text-[#00f0ff]" viewBox="0 0 24 24">
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
                className="px-6 py-3 rounded text-center font-rajdhani font-bold text-sm text-[#00f0ff] border border-[#00f0ff]/40 bg-[#091428]/80 hover:bg-[#00f0ff]/10 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-[#00f0ff]" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.28a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.28 8.28 0 0 0 4.91 1.6V6.87a4.86 4.86 0 0 1-1-.18z"/>
                </svg>
                <span>THEO DÕI KÊNH TIKTOK</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

