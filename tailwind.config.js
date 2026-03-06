/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF3E0',
        primary: '#2C3E50',
        secondary: '#9B59B6',
        accent: '#E74C3C',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        heading: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px mobile
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px mobile
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px mobile
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px mobile
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px mobile
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px mobile
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px mobile
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px mobile
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px mobile
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '0.5': '0.1rem',   // 1.6px
        '1': '0.2rem',     // 3.2px
        '1.5': '0.3rem',   // 4.8px
        '2': '0.4rem',     // 6.4px
        '2.5': '0.5rem',   // 8px
        '3': '0.6rem',     // 9.6px
        '4': '0.8rem',     // 12.8px
        '5': '1rem',       // 16px
        '6': '1.2rem',     // 19.2px
        '8': '1.6rem',     // 25.6px
        '10': '2rem',      // 32px
        '12': '2.4rem',    // 38.4px
      },
      boxShadow: {
        'paper': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 6px rgba(0, 0, 0, 0.08)',
        'elevated': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
