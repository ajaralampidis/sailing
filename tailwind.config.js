/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'selector',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      height: {
        'sail-screen': 'calc(100vh - 4rem - 4rem)',
      },
      maxHeight: {
        'sail-screen': 'calc(100vh - 4rem - 4rem)',
      },
      minHeight: {
        'sail-screen': 'calc(100vh - 4rem - 4rem)',
      },
      colors: {
        'sailing-lapiz': {
          400: '#22aaf9',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
