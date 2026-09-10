import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Check, X, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function BookingModal({ isOpen, onClose, streamerConfig }) {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'Booking Livestream', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    soundFx.playDonateSuccess();
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="hextech-border w-full max-w-lg p-6 sm:p-8 rounded-xl shadow-hextech-cyan relative bg-[#091428]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded text-gray-400 hover:text-white hover:border-[#c89b3c]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-left space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-rajdhani font-bold text-[#00f0ff] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            BOOKING & HỢP TÁC TRUYỀN THÔNG
          </div>
          <h3 className="text-2xl font-cinzel font-bold text-white">
            LIÊN HỆ <span className="text-gold-gradient">STREAMER</span>
          </h3>
          <p className="text-xs text-gray-400">
            Hợp tác quảng cáo nhãn hàng, tài trợ thiết bị, tham gia giải đấu Showmatch hoặc giao lưu.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-[#010a13] border border-[#0ac8b9] rounded-lg">
            <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-cinzel font-bold text-white">GỬI THÔNG ĐIỆP THÀNH CÔNG!</h4>
            <p className="text-xs text-gray-300">
              Streamer sẽ phản hồi lại bạn qua Email trong vòng 24 giờ làm việc.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-rajdhani font-bold text-gray-300 uppercase mb-1">
                Tên / Đơn vị đại diện
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: ASUS ROG / GameStudio / Anh Tuấn"
                className="w-full px-3.5 py-2.5 rounded bg-[#010a13] border border-[#c89b3c]/40 text-sm text-white focus:border-[#00f0ff] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani font-bold text-gray-300 uppercase mb-1">
                Email liên hệ
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded bg-[#010a13] border border-[#c89b3c]/40 text-sm text-white focus:border-[#00f0ff] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani font-bold text-gray-300 uppercase mb-1">
                Hình thức hợp tác
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded bg-[#010a13] border border-[#c89b3c]/40 text-sm text-white focus:border-[#00f0ff] focus:outline-none"
              >
                <option value="Booking Livestream">Booking Livestream / Trải nghiệm game</option>
                <option value="Tài trợ Gaming Gear">Tài trợ Gaming Gear / Thiết bị</option>
                <option value="Tham gia Showmatch">Tham gia giải đấu Showmatch / Esports</option>
                <option value="Quảng cáo TikTok / FB">Quảng cáo trên Video TikTok / Fanpage</option>
                <option value="Khác">Nội dung hợp tác khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-rajdhani font-bold text-gray-300 uppercase mb-1">
                Lời nhắn chi tiết
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mô tả ngắn gọn về dự án hoặc yêu cầu hợp tác..."
                className="w-full px-3.5 py-2.5 rounded bg-[#010a13] border border-[#c89b3c]/40 text-sm text-white focus:border-[#00f0ff] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              onClick={() => soundFx.playClick()}
              className="w-full hextech-btn-gold py-3 rounded text-sm font-bold flex items-center justify-center gap-2 shadow-hextech-gold"
            >
              <Send className="w-4 h-4 text-[#ffd700]" />
              <span>GỬI YÊU CẦU HỢP TÁC</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
