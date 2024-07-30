/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'inherit',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282'
              }
            }
          }
        }
      },
      fontFamily: {
        'sans-nunito': ['Nunito', 'sans-serif']
      },
      boxShadow: {
        'light-surface':
          '12px 12px 12px rgba(0,0,0,0.1) , -10px -10px 10px white '
      }
    },
    screens: {
      sm: { max: '739px' },
      md: { min: '740px', max: '1023px' },
      lg: '1024px'
    }
  },
  plugins: [typography]
}
