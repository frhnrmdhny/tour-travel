import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Figtree Variable', 'system-ui']
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        customTheme: {
          primary: '#22d3ee',
          secondary: '#00df91',
          accent: '#00a2ff',
          neutral: '#1f1f1f',
          'base-100': '#f1ffff',
          info: '#00b9ff',
          success: '#00f1cf',
          warning: '#e15e00',
          error: '#f3175a'
        }
      }
    ]
  }
} satisfies Config
