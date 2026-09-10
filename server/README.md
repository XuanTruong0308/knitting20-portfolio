# TikTok Live Detector & Notification Server (Method 1)

Dịch vụ backend siêu nhẹ giúp tự động kiểm tra trạng thái Livestream của tài khoản TikTok `@hdan902` (knitting20) và tự động bắn thông báo khi lên sóng.

## 🚀 Cách cài đặt & Khởi chạy

1. **Di chuyển vào thư mục server:**
   ```bash
   cd server
   npm install
   ```

2. **Chạy server:**
   ```bash
   npm start
   ```
   Server sẽ lắng nghe tại `http://localhost:4000`.

## ⚙️ Biến Môi Trường (Tùy chọn)

Bạn có thể cấu hình các biến sau để tự động bắn thông báo:

| Biến | Ý nghĩa | Ví dụ |
| :--- | :--- | :--- |
| `TIKTOK_USERNAME` | Username TikTok cần track | `hdan902` |
| `DISCORD_WEBHOOK_URL` | Webhook URL kênh Discord | `https://discord.com/api/webhooks/...` |
| `TELEGRAM_BOT_TOKEN` | Token Bot Telegram | `123456:ABC-DEF...` |
| `TELEGRAM_CHAT_ID` | Channel hoặc Group ID | `@knitting20_live` |

## 📡 API Endpoints

- `GET /api/live-status`: Trả về trạng thái `isLive`, `title`, `viewerCount`, `roomId`.
- `POST /api/subscribe/email`: Đăng ký email nhận thông báo.
