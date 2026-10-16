/* Tailwind CDN theme extensions shared by every page. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        sky: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          500: "#0EA5E9",
          600: "#0284C7"
        },
        leaf: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#22C55E",
          600: "#16A34A"
        },
        ink: "#0F2A43"
      },
      fontFamily: {
        heading: ["Century Gothic", "Questrial", "sans-serif"],
        body: ["Montserrat", "sans-serif"]
      },
      boxShadow: {
        soft: "0 4px 18px rgba(15, 42, 67, 0.08)",
        "soft-lg": "0 12px 32px rgba(15, 42, 67, 0.12)"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      }
    }
  }
};