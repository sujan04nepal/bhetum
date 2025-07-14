/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
        },
        vibrant: {
          purple: "#8b5cf6",
          pink: "#ec4899",
          orange: "#f97316",
          cyan: "#06b6d4",
          emerald: "#10b981",
          yellow: "#f59e0b",
          rose: "#f43f5e",
          indigo: "#6366f1",
        },
      },
      backgroundImage: {
        "gradient-rainbow": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-sunset":
          "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
        "gradient-ocean": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-fire": "linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-in": "bounceIn 0.6s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.5)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.5)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.5)",
        "xl-colored":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
