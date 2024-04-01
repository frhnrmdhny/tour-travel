import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Figtree Variable', 'system-ui',],
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter']
  }
} satisfies Config
