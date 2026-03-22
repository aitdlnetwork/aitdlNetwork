/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0de3f2",
        "whatsapp": "#10B981",
        "background-light": "#f5f8f8",
        "background-dark": "#070B14",
        "surface-dark": "rgba(17, 24, 39, 0.6)",
        "text-primary": "#F8FAFC",
        "text-muted": "#8A96AA",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "body": ["Outfit", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(13, 227, 242, 0.15) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}
