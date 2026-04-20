/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#FAF8F5',
        surface: '#FFFFFF',
        dusty: '#C4A08A',
        'dusty-light': '#E8D5C8',
        'dusty-dark': '#A07B65',
        champagne: '#F5E6D3',
        'champagne-light': '#FBF3EB',
        slate: '#64748B',
        'slate-dark': '#475569',
        'slate-light': '#94A3B8',
        rose: '#B5838D',
        'rose-light': '#D4A5AD',
        'rose-dark': '#8B5E6B',
        warm: '#D4C5B9',
        cream: '#F0E6DC',
        taupe: '#8B7E74',
        // Night / celestial
        cosmos: '#0B0D17',
        'cosmos-surface': '#12152A',
        'cosmos-card': '#181C35',
        nebula: '#7C3AED',
        'nebula-light': '#A78BFA',
        'nebula-soft': '#C4B5FD',
        stellar: '#818CF8',
        aurora: '#34D399',
        'star-gold': '#FCD34D',
        'cosmos-text': '#E2E8F0',
        'cosmos-muted': '#94A3B8',
        'cosmos-border': '#2D3258',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
        btn: '8px',
      },
    },
  },
  plugins: [],
}
