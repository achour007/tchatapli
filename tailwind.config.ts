import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1a365d',
        'secondary-blue': '#2b6cb0',
        'accent-blue': '#4299e1',
        'light-blue': '#ebf8ff',
        'dark-blue': '#2c5282',
        'text-primary': '#2d3748',
        'text-secondary': '#4a5568',
        'background-light': '#f7fafc',
        'background-white': '#ffffff',
        'orange-bg': '#fff7ed',
      },
    },
  },
  plugins: [],
}

export default config 