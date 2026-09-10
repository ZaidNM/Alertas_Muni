/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nilo: {
          DEFAULT: "#2D9596",
          dark: "#1E6B6C",
          light: "#9AD0C2",
          muted: "#E6F2F2",
          50: "#E6F2F2",
          100: "#CBE8E8",
          500: "#2D9596",
          600: "#247A7B",
          700: "#1E6B6C",
          800: "#164F50",
          900: "#0F3637",
        },
        crema: {
          DEFAULT: "#ECF4D6",
          light: "#FEFCE8",
          soft: "#FFFBEA",
          dark: "#D6DEB8",
          50: "#FEFCE8",
          100: "#ECF4D6",
          200: "#E7E5C8",
        },
        plomo: {
          DEFAULT: "#6B7280",
          light: "#E5E7EB",
          lighter: "#F3F4F6",
          dark: "#374151",
          100: "#F3F4F6",
          200: "#E5E7EB",
          500: "#6B7280",
          700: "#374151",
          800: "#1F2937",
        },
        negro: {
          DEFAULT: "#111827",
          soft: "#1F2937",
          light: "#374151",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(45,149,150,0.08)",
        card: "0 8px 30px rgba(0,0,0,0.06)",
        float: "0 12px 40px rgba(45,149,150,0.15)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
