/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans-nunito': ['Nunito', 'sans-serif']
      }
    },
    screens: {
      sm: { max: '739px' },
      md: { min: '740px', max: '1023px' },
      lg: '1024px'
    }
  },
  plugins: []
}
