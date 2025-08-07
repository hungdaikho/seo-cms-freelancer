/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#b3daff',
          200: '#80c2ff',
          300: '#4daaff',
          400: '#1a92ff',
          500: '#004AAC', // Primary blue
          600: '#003d91',
          700: '#003176',
          800: '#00245b',
          900: '#001740',
        },
        secondary: {
          50: '#e8e7f0',
          100: '#c4c2d9',
          200: '#a09dc2',
          300: '#7c78ab',
          400: '#585394',
          500: '#13124D', // Dark purple
          600: '#100f42',
          700: '#0d0c37',
          800: '#0a092c',
          900: '#070621',
        },
        accent: {
          50: '#fff4e6',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb84d',
          400: '#ffa41a',
          500: '#FF914D', // Orange
          600: '#e6823d',
          700: '#cc732d',
          800: '#b3641d',
          900: '#99550d',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #004AAC 0%, #13124D 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #13124D 0%, #004AAC 100%)',
        'accent-gradient': 'linear-gradient(135deg, #FF914D 0%, #004AAC 100%)',
        'hero-gradient': 'linear-gradient(135deg, #004AAC 0%, #13124D 50%, #FF914D 100%)',
      },
    },
  },
  plugins: [],
};
