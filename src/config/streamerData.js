export const STREAMER_CONFIG = {
  // Thông tin hiển thị tuyển thủ & streamer
  name: "knitting20",
  title: "PRO MID LANER & TIKTOK CREATOR",
  bio: "Tuyển thủ Thách Đấu máy chủ Việt Nam (VN Challenger). Chuyên chia sẻ giáo án leo rank, các pha xử lý outplay tướng sát thủ (Yasuo, Zed, Lee Sin) và phát sóng livestream giao lưu hàng ngày.",
  
  // Tình trạng phát sóng mặc định (true: Đang live, false: Nghỉ ngơi)
  isLive: true,

  // Các đường link truyền thông chính
  tiktokUrl: "https://www.tiktok.com/@hdan902?is_from_webapp=1&sender_device=pc",
  tiktokUsername: "hdan902",
  facebookUrl: "https://www.facebook.com/huynh.an.711021?locale=vi_VN",
  facebookGroupUrl: "https://www.facebook.com/huynh.an.711021?locale=vi_VN",

  // Cổng VietQR Banking Donate chuẩn Vietcombank (VCB)
  banking: {
    bankId: "VCB", // Ngân hàng Ngoại thương Việt Nam (Vietcombank)
    bankName: "Ngân Hàng Ngoại Thương Việt Nam (Vietcombank)",
    accountNumber: "1822372533",
    accountName: "HUYNH VAN DANG",
    memoPrefix: "DONATE KNITTING20",
  },

  // Lịch phát sóng Livestream cố định trong tuần
  schedule: [
    { day: "Thứ 2 - Thứ 6", time: "20:00 - 00:30", type: "LEO RANK THÁCH ĐẤU", desc: "Giáo án leo rank Mid Lane, test tướng và meta mới" },
    { day: "Thứ 7", time: "19:30 - 01:00", type: "KÈO SOLO & SHOWMATCH", desc: "Solo Yasuo/Zed cùng viewer và streamer khách mời" },
    { day: "Chủ Nhật", time: "20:00 - 23:30", type: "CUSTOM GIAO LƯU FAN", desc: "Đánh custom 5v5 tặng Rương Hextech & Skin LoL" },
  ],

  // Chỉ số thành tích & cộng đồng
  stats: {
    tiktokFollowers: "85.4K+",
    winRate: "68.5%",
    pentakills: "148+",
    kda: "4.85",
    currentRank: "Thách Đấu (Challenger 1,240 LP)",
    mainRole: "Đường Giữa (Mid Lane)",
  }
};

