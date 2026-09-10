// Service Worker for Background Web Push Notifications
// Chạy ngầm trong hệ điều hành (Windows, macOS, Android, iOS) để nhận thông báo kể cả khi đã đóng web

self.addEventListener('push', function (event) {
  let data = {
    title: '🔴 knitting20 ĐANG LIVESTREAM TIKTOK!',
    body: 'Vào xem ngay những pha outplay Yasuo/Zed và giao lưu cùng streamer!',
    icon: '/favicon.ico',
    url: 'https://www.tiktok.com/@hdan902?is_from_webapp=1&sender_device=pc'
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || 'https://www.tiktok.com/@hdan902?is_from_webapp=1&sender_device=pc'
    },
    actions: [
      { action: 'open_live', title: '👉 Xem Live Ngay' },
      { action: 'close', title: 'Đóng' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Khi người dùng bấm vào thông báo popup trên màn hình
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || 'https://www.tiktok.com/@hdan902?is_from_webapp=1&sender_device=pc';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
