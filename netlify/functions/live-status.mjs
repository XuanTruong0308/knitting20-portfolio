// Netlify Scheduled Function: Tự động quét TikTok Live của @hdan902 mỗi phút
// Chạy 100% miễn phí trên Netlify mà không cần server hay thẻ tín dụng!

import { WebcastPushConnection } from 'tiktok-live-connector';
import webpush from 'web-push';

const TIKTOK_USERNAME = 'hdan902';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'UU2xTaoxB5dETU_1_5Fj7qZ4c2g7R5f9_gXl6e3w2A8';

webpush.setVapidDetails(
  'mailto:contact@knitting20.lol',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export default async (req, context) => {
  try {
    const tiktokConnector = new WebcastPushConnection(TIKTOK_USERNAME, {
      processInitialData: false,
      enableExtendedGiftInfo: false,
      clientParams: {
        app_language: 'vi-VN',
        webcast_language: 'vi-VN'
      }
    });

    const roomInfo = await tiktokConnector.getRoomInfo();
    const isLive = roomInfo && (roomInfo.status === 2 || roomInfo.status === '2');

    return new Response(JSON.stringify({
      success: true,
      username: TIKTOK_USERNAME,
      isLive: Boolean(isLive),
      title: roomInfo?.title || 'Livestream LMHT Thách Đấu',
      viewerCount: roomInfo?.user_count || 0,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      isLive: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const config = {
  path: "/api/live-status"
};
