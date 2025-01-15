/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss-motion');
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}"
  ],

  safelist: [
    'motion-scale-in-[0.5]',
    'motion-translate-x-in-[-120%]',
    'motion-translate-y-in-[-60%]',
    'motion-opacity-in-[33%]',
    'motion-rotate-in-[-1080deg]',
    'motion-blur-in-[10px]',
    'motion-delay-[0.38s]/scale',
    'motion-duration-[0.38s]/opacity',
    'motion-duration-[1.20s]/rotate',
    'motion-duration-[0.15s]/blur',
    'motion-delay-[0.60s]/blur',
    'motion-ease-spring-bouncier',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E3A8A', // Định nghĩa màu cơ bản
        'custom-teal': '#14B8A6', // Định nghĩa màu phụ
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(315deg, #00aaaa 0%, #00dca0 100%)', // Gradient tùy chỉnh
      },
      fontFamily: {
        'svn-avo': ['"SVN-Avo"', 'sans-serif'],
        'svn-avo-bold': ['"SVN-Avo-Bold"', 'sans-serif'],
        'svn-avo-italic': ['"SVN-Avo-Italic"', 'sans-serif'],
        'svn-avo-bold-italic': ['"SVN-Avo-BoldItalic"', 'sans-serif'],
        'utm-avo': ['"UTM-Avo"', 'sans-serif'],
        'utm-avo-bold': ['"UTM-Avo-Bold"', 'sans-serif'],
        'utm-avo-bold-italic': ['"UTM-Avo-BoldItalic"', 'sans-serif'],
        'utm-avo-italic': ['"UTM-Avo-Italic"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-motion'),
    require('tailwindcss-animated'),
  ],
}
