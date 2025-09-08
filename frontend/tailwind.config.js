/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Hospital Blue-Green Pastel Theme
        color: {
          1: "#A8E6CF", // Soft mint green - primary
          2: "#B8E6E1", // Light teal
          3: "#C8E6F5", // Soft sky blue
          4: "#D4F1F4", // Very light cyan
          5: "#B2DFDB", // Pastel teal
          6: "#E1F5FE", // Very light blue
        },
        stroke: {
          1: "#4A90A4", // Muted blue-green for borders
        },
        n: {
          1: "#FFFFFF",   // Pure white
          2: "#F8FDFF",   // Very light blue-white
          3: "#E8F5F7",   // Light blue-gray
          4: "#B8D4D6",   // Medium blue-gray
          5: "#7BA7AA",   // Muted blue-green
          6: "#4A7C7D",   // Darker blue-green
          7: "#2E5F61",   // Deep blue-green
          8: "#1A4648",   // Very dark blue-green
          9: "#5A8A8C",   // Medium blue-green
          10: "#4F7F81",  // Slightly darker
          11: "#3A6B6D",  // Dark blue-green
          12: "#2F5759",  // Very dark
          13: "#6B9799",  // Light blue-green
        },
        // Hospital-themed colors
        primary: {
          50: '#E8F8F5',   // Very light mint
          100: '#D1F2EB',  // Light mint
          200: '#A3E4D7',  // Soft mint
          300: '#76D7C4',  // Medium mint
          400: '#48C9B0',  // Bright mint
          500: '#1ABC9C',  // Main teal
          600: '#17A2B8',  // Hospital blue-teal
          700: '#138496',  // Darker teal
          800: '#0E6674',  // Deep teal
          900: '#0A4851',  // Very deep teal
        },
        medical: {
          50: '#E3F2FD',   // Very light medical blue
          100: '#BBDEFB',  // Light medical blue
          200: '#90CAF9',  // Soft medical blue
          300: '#64B5F6',  // Medium medical blue
          400: '#42A5F5',  // Bright medical blue
          500: '#2196F3',  // Main medical blue
          600: '#1E88E5',  // Darker medical blue
          700: '#1976D2',  // Deep medical blue
          800: '#1565C0',  // Very deep medical blue
          900: '#0D47A1',  // Darkest medical blue
        },
        healing: {
          50: '#E8F5E8',   // Very light healing green
          100: '#C8E6C8',  // Light healing green
          200: '#A5D6A7',  // Soft healing green
          300: '#81C784',  // Medium healing green
          400: '#66BB6A',  // Bright healing green
          500: '#4CAF50',  // Main healing green
          600: '#43A047',  // Darker healing green
          700: '#388E3C',  // Deep healing green
          800: '#2E7D32',  // Very deep healing green
          900: '#1B5E20',  // Darkest healing green
        },
        trust: {
          50: '#F0F8FF',   // Very light trust blue
          100: '#E1F0FE',  // Light trust blue
          200: '#C3E1FD',  // Soft trust blue
          300: '#A4D2FC',  // Medium trust blue
          400: '#86C3FB',  // Bright trust blue
          500: '#68B4FA',  // Main trust blue
          600: '#4A90E2',  // Hospital trust blue
          700: '#3A7BD5',  // Darker trust blue
          800: '#2A66C8',  // Deep trust blue
          900: '#1A51BB',  // Very deep trust blue
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      letterSpacing: {
        tagline: ".15em",
      },
      spacing: {
        0.25: "0.0625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      opacity: {
        15: ".15",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      borderWidth: {
        DEFAULT: "0.0625rem",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
        // Hospital-themed gradients
        "hospital-hero": "linear-gradient(135deg, #E3F2FD 0%, #E8F8F5 50%, #F0F8FF 100%)",
        "healing-gradient": "linear-gradient(45deg, #A8E6CF 0%, #B8E6E1 50%, #C8E6F5 100%)",
        "trust-gradient": "linear-gradient(135deg, #4A90E2 0%, #17A2B8 50%, #1ABC9C 100%)",
        "calm-gradient": "linear-gradient(180deg, #E8F8F5 0%, #E3F2FD 100%)",
        "medical-gradient": "linear-gradient(45deg, #BBDEFB 0%, #A3E4D7 50%, #C8E6C8 100%)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss/plugin')(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]":
            {},
        },
        ".h1": {
          "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[2rem] leading-normal md:text-[2.5rem]": {},
        },
        ".h4": {
          "@apply text-[2rem] leading-normal": {},
        },
        ".h5": {
          "@apply text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8": {},
        },
        ".body-1": {
          "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
            {},
        },
        ".body-2": {
          "@apply font-light text-[0.875rem] leading-6 md:text-base": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },
        ".tagline": {
          "@apply font-sans font-light text-xs tracking-tagline uppercase":
            {},
        },
        ".quote": {
          "@apply font-mono text-lg leading-normal": {},
        },
        ".button": {
          "@apply font-mono text-xs font-bold uppercase tracking-wider": {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    }),
  ],
};