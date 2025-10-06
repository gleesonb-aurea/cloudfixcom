import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CloudFix Brand Colors (from Brand Consistency Audit)
        primary: {
          DEFAULT: '#00BCD4',  // Cyan - Primary brand color
          light: '#4DD0E1',    // Lighter cyan for hover states
          dark: '#0088CC',     // Darker blue for depth
        },
        secondary: {
          DEFAULT: '#0088CC',  // Blue - Secondary brand color
          light: '#42A5F5',    // Lighter blue
          dark: '#0277BD',     // Darker blue
        },
        accent: {
          DEFAULT: '#fecd00',  // Yellow - CTA and highlights
          light: '#FFEB3B',    // Lighter yellow
          dark: '#FFC107',     // Darker yellow/amber
        },
        // Neutral grays
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
