module.exports = {
  darkMode: 'class', // Enables dark mode (class-based)
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
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounceIn: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            opacity: 0.6,
          },
          '50%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        openWithBottomSlide: 'openWithBottomSlide 0.2s linear forwards',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        bounceIn: 'bounceIn 1s ease-in-out',
      },
      colors: {
        "primary": '#F1F0E9',
        "primary-dark": '#e7e6df',
        "secondary": '#FFFFFF',
        "tprimary": '#032B3A',
        "red_danger":"#DC2626!important",
        "red_Light_danger":"#F87171!important",
        "green_light":"#16A34A!important",
        // Define dark mode colors
        "dark-primary": "#171B1C", // Example dark background
        "dark-secondary": "#273135", // Dark secondary color
        "dark-text": "#f5f5f5", // Light text on dark background
        "dark-hover":"#FFFFFF1A",
        "dark-second-text":"#4ADE80!important",
        // Theme responsive colors from ./theme.js
        "ct-primary": "var(--ct-primary)",
        "ct-secondary": "var(--ct-secondary)",
        "ct-background": "var(--ct-background)",
        "ct-background-paper": "var(--ct-background-paper)",
        "ct-text-primary": "var(--ct-text-primary)",
        "ct-text-secondary": "var(--ct-text-secondary)"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
