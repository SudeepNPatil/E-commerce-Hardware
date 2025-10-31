/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: ['autofill'],
      boxShadow: ['autofill'],

      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.7)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
