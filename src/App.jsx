import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChampionCards from './components/ChampionCards';
import SocialHub from './components/SocialHub';
import DonateTerminal from './components/DonateTerminal';
import GearSpecs from './components/GearSpecs';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { STREAMER_CONFIG } from './config/streamerData';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#010a13] text-gray-100 font-sans selection:bg-[#00f0ff] selection:text-black">
      
      {/* Fixed Navigation Header */}
      <Navbar
        isLive={STREAMER_CONFIG.isLive}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Sections */}
      <main>
        {/* 3D Hero Section */}
        <HeroSection streamerConfig={STREAMER_CONFIG} />

        {/* Signature Champions & Stats */}
        <ChampionCards />

        {/* TikTok & Facebook Social Highlights Hub */}
        <SocialHub streamerConfig={STREAMER_CONFIG} />

        {/* Hextech VietQR Donate Terminal */}
        <DonateTerminal streamerConfig={STREAMER_CONFIG} />

        {/* Battle Station & Gaming Gear */}
        <GearSpecs />
      </main>

      {/* Footer */}
      <Footer
        streamerConfig={STREAMER_CONFIG}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* Booking & Sponsorship Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        streamerConfig={STREAMER_CONFIG}
      />

    </div>
  );
}
