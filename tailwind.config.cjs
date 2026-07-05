module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        royal: {
          burgundy: '#722F37',
          wine: '#5C2330',
          gold: '#C9A961',
          bronze: '#A67C52',
          cream: '#FAF7F2',
          ivory: '#FFFDF8',
          espresso: '#2C2416',
          charcoal: '#1C1410',
          sage: '#5C6B52',
          navy: '#1E2A3A'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif']
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      boxShadow: {
        'royal': '0 8px 32px rgba(28, 20, 16, 0.25), inset 0 1px 0 rgba(201, 169, 97, 0.12)',
        'royal-lg': '0 16px 48px rgba(28, 20, 16, 0.3), 0 0 0 1px rgba(201, 169, 97, 0.08)'
      }
    }
  },
  plugins: []
}
