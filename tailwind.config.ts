import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        gold: "var(--gold)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },
      fontSize: {
        "hero-xl": ["clamp(2.5rem, 5.5vw, 4.25rem)", { lineHeight: "1.08" }],
        "section-heading": ["clamp(1.85rem, 3.5vw, 2.75rem)", { lineHeight: "1.2" }],
      },
      boxShadow: {
        earth: "0 4px 16px rgba(37, 35, 33, 0.08)",
        "earth-sm": "0 2px 8px rgba(37, 35, 33, 0.06)",
        "earth-lg": "0 16px 40px rgba(37, 35, 33, 0.12)",
        "earth-xl": "0 24px 60px rgba(37, 35, 33, 0.15)",
        terracotta: "0 8px 24px rgba(166, 93, 59, 0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "float-badge": "floatBadge 5s ease-in-out infinite",
        "float-slow": "floatSlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatBadge: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
