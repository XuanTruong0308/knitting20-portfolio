/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hextech: {
          darkest: '#010a13',
          dark: '#091428',
          card: '#0a1a2f',
          surface: '#0e243a',
          cyan: '#0ac8b9',
          'cyan-glow': '#00f0ff',
          'cyan-dark': '#0397ab',
          blue: '#005a82',
          gold: '#c89b3c',
          'gold-light': '#f0e6d2',
          'gold-glow': '#ffd700',
          'gold-dark': '#785a28',
          'gold-metal': '#463714',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        rajdhani: ['"Rajdhani"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'hextech-cyan': '0 0 20px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.15)',
        'hextech-gold': '0 0 20px rgba(200, 155, 60, 0.4), inset 0 0 15px rgba(200, 155, 60, 0.2)',
        'hextech-card': '0 8px 32px 0 rgba(1, 10, 19, 0.7)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 25s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(0,240,255,0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        }
      }
    },
  },
  plugins: [],
}
