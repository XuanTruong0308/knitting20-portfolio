import React from 'react';
import { Sparkles, Trophy, Flame, PlayCircle, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import HextechCore3D from './HextechCore3D';
import { soundFx } from '../utils/audio';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection({ streamerConfig }) {
  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-screen pt-18 sm:pt-24 lg:pt-28 pb-10 sm:pb-16 flex items-center overflow-hidden">
      
      {/* Background Arcane Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-[#00f0ff]/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-[#c89b3c]/10 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none" />

      {/* Hextech Rune Grid Background Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#0ac8b9_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Summoner Persona & CTAs */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-3.5 sm:space-y-6 text-left"
          >
            
            {/* Role & Game Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 sm:gap-3 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-sm hextech-border">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-rajdhani font-bold tracking-wider sm:tracking-widest text-[#00f0ff] uppercase">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ffd700]" />
                LEAGUE OF LEGENDS • TOP LANER
              </div>
            </motion.div>

            {/* In-Game Name & Title */}
            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-black tracking-tight text-white uppercase leading-tight">
                <span className="text-gold-gradient block">{streamerConfig.name}</span>
                <span className="text-base sm:text-2xl lg:text-3xl font-rajdhani font-bold text-gray-400 block mt-0.5 sm:mt-1">
                  {streamerConfig.title}
                </span>
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base font-sans max-w-xl leading-relaxed pt-0.5 sm:pt-1">
                {streamerConfig.bio}
              </p>
            </motion.div>

            {/* Action CTAs (TikTok, Facebook, Donate) */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3.5 pt-1 sm:pt-2">
              {/* TikTok Channel Button */}
              <a
                href={streamerConfig.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="hextech-btn-cyan px-4 py-2.5 sm:px-6 sm:py-3 rounded text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-hextech-cyan group"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.28a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.28 8.28 0 0 0 4.91 1.6V6.87a4.86 4.86 0 0 1-1-.18z"/>
                </svg>
                <span>XEM TIKTOK LIVE</span>
              </a>

              {/* Facebook Fanpage Button */}
              <a
                href={streamerConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="hextech-btn-gold px-4 py-2.5 sm:px-6 sm:py-3 rounded text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-hextech-gold group"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#00f0ff] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>KẾT NỐI FACEBOOK</span>
              </a>

              {/* Donate Button */}
              <a
                href="#donate"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded text-xs sm:text-sm font-rajdhani font-bold tracking-wider text-[#ffd700] border border-[#ffd700]/40 bg-[#091428]/80 hover:bg-[#c89b3c]/20 hover:border-[#ffd700] flex items-center justify-center gap-1.5 sm:gap-2 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-current animate-pulse" />
                <span>ỦNG HỘ STREAMER</span>
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Interactive Hextech Core Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 h-[290px] xs:h-[320px] sm:h-[400px] lg:h-[480px] relative flex items-center justify-center"
          >
            {/* 3D Core Canvas */}
            <HextechCore3D />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
