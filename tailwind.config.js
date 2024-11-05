/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "not-found": "url('/images/background.svg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          shade: {
            0: "#c0f7a6",
            100: "#adde95",
            200: "#9ac685",
            300: "#86ad74",
            400: "#739464",
            500: "#607c53",
            600: "#4d6342",
            700: "#3a4a32",
            800: "#263121",
            900: "#131911",
            1000: "#000000",
          },
          tint: {
            0: "#c0f7a6",
            100: "#c6f8af",
            200: "#cdf9b8",
            300: "#d3f9c1",
            400: "#d9faca",
            500: "#e0fbd3",
            600: "#e6fcdb",
            700: "#ecfde4",
            800: "#f2fded",
            900: "#f9fef6",
            1000: "#ffffff",
          },
        },
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'scaleY(0)', opacity: 0 },
          '100%': { transform: 'scaleY(1)', opacity: 1 }
        }
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out forwards'
      }
    },
  },
  plugins: [],
};
