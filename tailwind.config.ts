import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F3E97",
        secondary: "#FFB800",
        gray: {
          300: "#D9D9D9",
          500: "#858585",
          600: "#464646",
        }
      },
      fontFamily: {
        pacifico: ["var(--font-pacifico)"],
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [],
}

export default config