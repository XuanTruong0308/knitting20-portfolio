export const STREAMER_CONFIG = {
  // Thông tin hiển thị tuyển thủ & streamer
  name: "knitting20",
  title: "PRO TOP LANER & TIKTOK CREATOR",
  bio: "Tuyển thủ Thách Đấu máy chủ Việt Nam (VN Challenger). Chuyên chia sẻ giáo án leo rank Đường Trên (Top Lane), nhận duo leo rank và phát sóng livestream giao lưu hàng ngày.",
  
  // Tình trạng phát sóng mặc định (false: Offline/Nghỉ ngơi, true: Đang Live)
  isLive: false,

  // Các đường link truyền thông chính
  tiktokUrl: "https://www.tiktok.com/@hdan902?is_from_webapp=1&sender_device=pc",
  tiktokUsername: "hdan902",
  facebookUrl: "https://www.facebook.com/huynh.an.711021?locale=vi_VN",
  facebookGroupUrl: "https://www.facebook.com/huynh.an.711021?locale=vi_VN",

  // Cổng VietQR Banking Donate chuẩn Vietcombank (VCB)
  banking: {
    bankId: "VCB",
    bankName: "Ngân Hàng Ngoại Thương Việt Nam (Vietcombank)",
    accountNumber: "1822372533",
    accountName: "HUYNH VAN DANG",
    memoPrefix: "DONATE KNITTING20",
  },

  // Lịch phát sóng Livestream cố định trong tuần
  schedule: [
    { day: "Thứ 2 - Thứ 6", time: "20:00 - 00:30", type: "LEO RANK ĐƯỜNG TRÊN", desc: "Giáo án leo rank Top Lane, kiểm soát thế lính và gánh team" },
    { day: "Thứ 7", time: "19:30 - 01:00", type: "KÈO SOLO TOP & SHOWMATCH", desc: "Kèo solo kỹ năng Top Lane cùng viewer và giao lưu" },
    { day: "Chủ Nhật", time: "20:00 - 23:30", type: "CUSTOM GIAO LƯU FAN", desc: "Đánh custom 5v5 tặng Rương Hextech & Skin LoL" },
  ],

  // Chỉ số thành tích & cộng đồng
  stats: {
    tiktokFollowers: "450+",
    tiktokLikes: "12.3K+",
    winRate: "68.5%",
    pentakills: "148+",
    kda: "4.85",
    currentRank: "Thách Đấu (Challenger 1,240 LP)",
    mainRole: "Đường Trên (Top Lane)",
  }
};


