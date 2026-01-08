// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "hp-blue": "#0096d6",
        "hp-dark-blue": "#0073b7",
        "hp-gray": "#666666",
        "hp-light-gray": "#f5f5f5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        hp: "0 4px 14px 0 rgba(0, 150, 214, 0.1)",
        "hp-lg": "0 10px 40px 0 rgba(0, 150, 214, 0.15)",
        "hp-xl": "0 20px 60px 0 rgba(0, 150, 214, 0.2)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms")({
    //   strategy: "class",
    // }),
  ],
};
