import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SocialHub from './components/SocialHub';
import DonateTerminal from './components/DonateTerminal';
import GearSpecs from './components/GearSpecs';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { STREAMER_CONFIG } from './config/streamerData';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isLive, setIsLive] = useState(STREAMER_CONFIG.isLive);

  // Fetch real-time live status from Netlify Function
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/live-status');
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isLive === 'boolean') {
            setIsLive(data.isLive);
          }
        }
      } catch (e) {
        // Fallback to config if offline
      }
    }
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Recheck every 60s
    return () => clearInterval(interval);
  }, []);

  const currentConfig = {
    ...STREAMER_CONFIG,
    isLive
  };

  return (
    <div className="min-h-screen bg-[#010a13] text-gray-100 font-sans selection:bg-[#00f0ff] selection:text-black">
      
      {/* Fixed Navigation Header */}
      <Navbar
        isLive={isLive}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Sections */}
      <main>
        {/* 3D Hero Section */}
        <HeroSection streamerConfig={currentConfig} />

        {/* TikTok & Facebook Social & Live Status Hub */}
        <SocialHub streamerConfig={currentConfig} />

        {/* Hextech VietQR Donate Terminal */}
        <DonateTerminal streamerConfig={currentConfig} />

        {/* Battle Station & Gaming Gear */}
        <GearSpecs />
      </main>

      {/* Footer */}
      <Footer
        streamerConfig={currentConfig}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* Booking & Sponsorship Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        streamerConfig={currentConfig}
      />

    </div>
  );
}
