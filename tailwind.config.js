// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with a class
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        'montserrat-alt': ['"Montserrat Alternates"', 'sans-serif'],
      },
      colors: {
        // Light mode colors
        'light-body': '#F9FEFF',
        'light-secondary': '#ffffff',
        'light-text': '#545e85',
        'light-text-primary': '#1e293b',

        // Dark mode colors - consistent palette
        'dark-body': '#09090b',
        'dark-secondary': '#0c0c0f',
        'dark-tertiary': '#18181b',
        'dark-card': '#111113',
        'dark-border': '#27272a',
        'dark-text': '#f1f5f9',
        'dark-text-secondary': '#94a3b8',

        // Accent colors
        'accent-violet': '#8b5cf6',
        'accent-purple': '#a855f7',
        'accent-rose': '#f43f5e',
        'accent-indigo': '#6366f1',

        // Legacy
        'logo-grey': '#6b7280',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.25)',
        'glow-md': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-lg': '0 0 35px -5px rgba(139, 92, 246, 0.45)',
        'glow-violet': '0 0 30px -5px rgba(139, 92, 246, 0.4)',
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.4)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.35)',
        'inner-glow': 'inset 0 0 20px -5px rgba(139, 92, 246, 0.2)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 30px -5px rgba(139, 92, 246, 0.5)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
