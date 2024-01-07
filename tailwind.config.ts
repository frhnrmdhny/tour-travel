import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx'],
  theme: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter']
  }
} satisfies Config
