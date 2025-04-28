/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f8c146',
        primaryLight: '#ffe082',
        primaryDark: '#f0b427',
        secondary: '#333333',
        secondaryLight: '#555555',
        accent: '#4a90e2',
        accentDark: '#3a77c9',
        tertiary: '#e2e2e2',
        tertiaryDark: '#d2d2d2',
        danger: '#e53935',
        dangerDark: '#c62828',
        success: '#43a047',
        successDark: '#388e3c',
        background: '#f9f9f9',
        card: '#ffffff',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 15px rgba(0, 0, 0, 0.07)',
        'hover': '0 8px 30px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      gridTemplateColumns: {
        'auto-fill-cards': 'repeat(auto-fill, minmax(270px, 1fr))',
      },
    },
  },
  plugins: [],
} 