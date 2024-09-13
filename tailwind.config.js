/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        openWithBottomSlide: {
          '0%': { height: '0px' },
          '100%': { height: '400px' },
        },
      },
      animation: {
        openWithBottomSlide: 'openWithBottomSlide 0.2s linear forwards',
      },
      colors: {
        "primary": '#F1F0E9',
        "primary-dark": '#e7e6df',
        "secondary": '#FFFFFF',
        "tprimary": '#032B3A',
        // "inputs": '#EDE9E9',
        // "texts": '#C2C2C2',
        // "text-dark": "#666C89"
      },
    },
  },
  plugins: [],
};
