/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#00D4A0",
          "teal-dark": "#00B88A",
          "teal-light": "#E0FAF4",
          navy: "#1A2332",
          "navy-light": "#243044",
          "navy-lighter": "#2E3D56",
          slate: "#8B9BB4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      screens: {
        // keep defaults but ensure lg is wide enough for sidebar
        lg: "1024px",
      },
      width: {
        72: "18rem",  // sidebar width
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
