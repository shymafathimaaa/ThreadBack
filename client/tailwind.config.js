/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090E', // Ultra dark background
          900: '#0B0E17', // Main app background
          850: '#101522', // Card background
          800: '#161D2E', // Hover card / lighter dark
          750: '#1D253B', // Border dark
          700: '#2A3450',
          600: '#435174',
          400: '#8E9BB5',
          200: '#CBD5E1',
          100: '#F1F5F9'
        },
        neon: {
          purple: '#A855F7',
          purpleGlow: 'rgba(168, 85, 247, 0.35)',
          cyan: '#06B6D4',
          cyanGlow: 'rgba(6, 182, 212, 0.35)',
          pink: '#F43F5E',
          emerald: '#10B981',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'neon-purple': '0 0 20px -3px rgba(168, 85, 247, 0.3)',
        'neon-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.3)',
        'neon-card': '0 4px 24px -2px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'neon-hero': '0 10px 40px -10px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.25)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'glow-spin 8s linear infinite',
      },
      keyframes: {
        'glow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
