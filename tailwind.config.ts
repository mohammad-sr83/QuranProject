import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        typography: 'var(--color-typography)',
      },
      fontFamily: {
        'almarai-bold': ['AlmaraiBold', 'sans-serif'], // فونت جایگزین اضافه شده
        'extra-bold': ['ExtraBold', 'sans-serif'],
        'uthmani-number': ['uthmaninumber', 'sans-serif'], // نام مناسب تر
        'uthmani': ['uthmani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
