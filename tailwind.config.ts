/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#0D4D4D',
          orange: '#FF6B1A',
        },
        cream: '#F5EBD7',
      },
      borderRadius: {
        'button': '25px',
        'image': '12px',
      },
      fontFamily: {
        japanese: ["'Zen Kaku Gothic New'", "'Noto Sans JP'", "'Hiragino Kaku Gothic ProN'", "'Meiryo'", 'sans-serif'],
        'japanese-body': ["'Noto Sans JP'", "'Hiragino Kaku Gothic ProN'", "'Meiryo'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
