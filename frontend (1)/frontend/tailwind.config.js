/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#30528f',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        white: '#fff',
      },
      backgroundGradient: {
        'blue-gradient': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(48,82,143,1) 35%, rgba(0,212,255,1) 100%)',
      },
    },
    fonts: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  darkMode: 'class',
  plugins: [],
}
