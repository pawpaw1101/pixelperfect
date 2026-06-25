/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pixel: {
          bg: "#000000",
          surface: "#111111",
          border: "#333333",
          cyan: "#15ffff",
          magenta: "#ff2c63",
        },
        campus: {
          bg: "#000000",
          yellow: "#ffea00",
        },
      },
      fontFamily: {
        display: ["Roboto", "Inter", "Arial", "sans-serif"],
        mono: ["Roboto Mono", "Consolas", "Courier New", "monospace"],
        body: ["Roboto", "Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        cyan: "0 0 0 1px #15ffff, 0 0 28px rgba(21, 255, 255, 0.2)",
        magenta: "0 0 0 1px #ff2c63, 0 0 28px rgba(255, 44, 99, 0.24)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        ticker: "ticker 24s linear infinite",
        pulseLine: "pulseLine 1.8s steps(2, end) infinite",
      },
    },
  },
  plugins: [],
};
