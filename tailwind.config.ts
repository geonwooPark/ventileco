import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        point: ['var(--font-rye)', 'var(--font-classic)'],
        normal: ['var(--font-simplehae)'],
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      colors: {
        active: '#295BF2',
        beige: {
          dark: '#A68446',
          normal: '#D9B779',
          light: '#D9BF8F',
        },
        brown: {
          dark: '#403425',
          normal: '#734A19',
        },
      },
      keyframes: {
        slideFadeIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideFadeOut: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        wheelDown: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        slideFadeIn: 'slideFadeIn 0.3s ease-in-out',
        slideFadeOut: 'slideFadeOut 0.3s ease-in-out',
        wheelDown: 'wheelDown 2s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
