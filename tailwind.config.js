/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        lg: "1280px",
      },
    },
    extend: {
      colors: {
        // 🌊 Young Dolphins kleuren
        primary: "#001F3F",      // Marineblauw
        secondary: "#2FB3E3",    // Aqua lichtblauw
        accent: "#1C6FA3",       // Medium blauw
        softgrey: "#F5F7FA",     // Zachte achtergrond
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
