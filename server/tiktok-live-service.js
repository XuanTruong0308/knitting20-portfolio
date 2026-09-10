/**
 * TIKTOK LIVE DETECTOR SERVICE & WEB PUSH DISPATCHER (Method 1)
 * -------------------------------------------------------------
 * 1. Tự động kiểm tra livestream của @hdan902 qua tiktok-live-connector
 * 2. Khi Live: Bắn Web Push Notification trực tiếp về màn hình PC / Điện thoại (kể cả khi đã đóng web)
 */

import express from 'express';
import cors from 'cors';
import webpush from 'web-push';
import { WebcastPushConnection } from 'tiktok-live-connector';

const app = express();
const PORT = process.env.PORT || 4000;

// Username TikTok của streamer
const TIKTOK_USERNAME = process.env.TIKTOK_USERNAME || 'hdan902';

// Cấu hình VAPID Keys cho Web Push (Chuẩn W3C)
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'UU2xTaoxB5dETU_1_5Fj7qZ4c2g7R5f9_gXl6e3w2A8';

webpush.setVapidDetails(
  'mailto:contact@knitting20.lol',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.use(cors());
app.use(express.json());

// In-memory subscribers database
const pushSubscriptions = new Map(); // endpoint -> subscription
const emailSubscribers = new Set();

let currentLiveState = {
  username: TIKTOK_USERNAME,
  isLive: false,
  title: '',
  viewerCount: 0,
  roomId: null,
  lastChecked: new Date().toISOString()
};

/**
 * Bắn thông báo Web Push trực tiếp tới toàn bộ PC / Điện thoại của người xem
 */
async function dispatchLiveAlert(liveInfo) {
  console.log(`\n======================================================`);
  console.log(`🔥 [TIKTOK LIVE DETECTED] @${TIKTOK_USERNAME} ĐANG LIVESTREAM!`);
  console.log(`Tiêu đề: ${liveInfo.title || 'Livestream LMHT leo rank Thách Đấu'}`);
  console.log(`Số thiết bị nhận Web Push: ${pushSubscriptions.size}`);
  console.log(`Thời gian: ${new Date().toLocaleString('vi-VN')}`);
  console.log(`======================================================\n`);

  const payload = JSON.stringify({
    title: `🔴 ${TIKTOK_USERNAME} ĐANG LIVESTREAM TIKTOK!`,
    body: `🔥 Vào xem ngay: ${liveInfo.title || 'Pha xử lý outplay tướng sát thủ & leo rank!'}`,
    icon: '/favicon.ico',
    url: `https://www.tiktok.com/@${TIKTOK_USERNAME}?is_from_webapp=1&sender_device=pc`
  });

  // 1. Gửi Web Push tới toàn bộ thiết bị (PC/Mobile)
  pushSubscriptions.forEach(async (sub, endpoint) => {
    try {
      await webpush.sendNotification(sub, payload);
      console.log(`✅ Đã push thông báo tới thiết bị: ${endpoint.substring(0, 30)}...`);
    } catch (err) {
      if (err.statusCode === 410 || err.statusCode === 404) {
        // Thiết bị đã hủy đăng ký
        pushSubscriptions.delete(endpoint);
      } else {
        console.error(`❌ Lỗi gửi push tới ${endpoint.substring(0, 30)}:`, err.message);
      }
    }
  });

  // 2. Gửi Discord Webhook nếu có
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **@${TIKTOK_USERNAME} VỪA LÊN SÓNG TIKTOK LIVE!**\n🎮 Vào xem ngay tại: https://www.tiktok.com/@${TIKTOK_USERNAME}?is_from_webapp=1&sender_device=pc`
        })
      });
    } catch (err) {
      console.error('Discord error:', err.message);
    }
  }
}

/**
 * Kiểm tra phòng live TikTok định kỳ
 */
async function checkTikTokLiveStatus() {
  const tiktokConnector = new WebcastPushConnection(TIKTOK_USERNAME, {
    processInitialData: false,
    enableExtendedGiftInfo: false,
    clientParams: {
      app_language: 'vi-VN',
      webcast_language: 'vi-VN'
    }
  });

  try {
    const roomInfo = await tiktokConnector.getRoomInfo();
    const isNowLive = roomInfo && (roomInfo.status === 2 || roomInfo.status === '2');

    if (isNowLive && !currentLiveState.isLive) {
      currentLiveState = {
        username: TIKTOK_USERNAME,
        isLive: true,
        title: roomInfo.title || 'Livestream LMHT leo rank Thách Đấu',
        viewerCount: roomInfo.user_count || 0,
        roomId: roomInfo.id_str || roomInfo.room_id,
        lastChecked: new Date().toISOString()
      };
      await dispatchLiveAlert(currentLiveState);
    } else if (!isNowLive && currentLiveState.isLive) {
      console.log(`ℹ️ Streamer @${TIKTOK_USERNAME} đã tắt Live.`);
      currentLiveState.isLive = false;
      currentLiveState.roomId = null;
    }

    currentLiveState.lastChecked = new Date().toISOString();
  } catch (err) {
    currentLiveState.isLive = false;
    currentLiveState.lastChecked = new Date().toISOString();
  }
}

// Kiểm tra mỗi 30s
setInterval(checkTikTokLiveStatus, 30 * 1000);
checkTikTokLiveStatus();

// ======================= API ROUTES ======================= //

// Trả về VAPID Public Key để Frontend đăng ký Web Push
app.get('/api/vapid-key', (req, res) => {
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// Trạng thái live realtime
app.get('/api/live-status', (req, res) => {
  res.json({ success: true, data: currentLiveState });
});

// Đăng ký nhận Web Push từ thiết bị (PC / Điện thoại)
app.post('/api/subscribe/push', (req, res) => {
  const subscription = req.body;
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Subscription object không hợp lệ' });
  }

  pushSubscriptions.set(subscription.endpoint, subscription);
  console.log(`📱 [NEW DEVICE] Đã đăng ký nhận Web Push (Tổng: ${pushSubscriptions.size} thiết bị)`);

  return res.status(201).json({ success: true, message: 'Đăng ký nhận thông báo thiết bị thành công!' });
});

// Hủy đăng ký Web Push
app.post('/api/unsubscribe/push', (req, res) => {
  const { endpoint } = req.body || {};
  if (endpoint) {
    pushSubscriptions.delete(endpoint);
  }
  return res.json({ success: true });
});

// Đăng ký Email
app.post('/api/subscribe/email', (req, res) => {
  const { email } = req.body || {};
  if (email && email.includes('@')) {
    emailSubscribers.add(email);
    return res.json({ success: true, message: 'Đăng ký email thành công!' });
  }
  return res.status(400).json({ error: 'Email không hợp lệ' });
});

// Test gửi thông báo thử nghiệm
app.post('/api/test-push', async (req, res) => {
  await dispatchLiveAlert({
    title: 'TEST THÔNG BÁO TIKTOK LIVE',
    roomId: 'test-room-123'
  });
  res.json({ success: true, message: 'Đã gửi test push tới tất cả thiết bị.' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 TikTok Live Detector Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`📡 Theo dõi tài khoản TikTok: @${TIKTOK_USERNAME}`);
  console.log(`🔔 Web Push VAPID Key đã sẵn sàng!\n`);
});
