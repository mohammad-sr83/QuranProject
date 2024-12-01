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
        hover:'var(--color-hover)',
        menu:'var(--color-menu)',
        joz:'var(--color-joz)',
        footer:'var(--color-footer)',
        menubar:'var(--color-menubar)',
        menubarTitlebg:'var(--color-menubarTitlebg)',
        menubarTextbg:'var(--color-menubarTextbg)',
        menubartitle:'var(--color-menubartitle)',
        selectmenu:'var(--color-selectmenu)',
        selectthem:'var(--color-selectthem)',
        colortitle:'var(--color-title)',
        coloricons:'var(--color-icons)',
        colortitlenumber:'var(--color-titlenumber)',
        buttonkol:'#737373',
        clorfont:'#333333',
        seletnav:'#b4924d',
        ColorAye:'#2b712b'
      },
      fontFamily: {
        'almarai': ['AlmaraiBold', 'sans-serif'], // فونت جایگزین اضافه شده
        'extra-bold': ['ExtraBold', 'sans-serif'],
        'uthmani-number': ['uthmaninumber', 'sans-serif'], // نام مناسب تر
        'uthmani': ['uthmani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
