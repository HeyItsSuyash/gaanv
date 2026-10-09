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
        bone: {
          DEFAULT: "var(--color-bone)",
          d: "var(--color-bone-d)",
        },
        paper: "var(--color-paper)",
        mist: "var(--color-mist)",
        stone: "var(--color-stone)",
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
        },
        madder: {
          DEFAULT: "var(--color-madder)",
          l: "var(--color-madder-l)",
        },
        clay: {
          l: "var(--color-clay-l)",
        },
        brass: {
          DEFAULT: "var(--color-brass)",
          l: "var(--color-brass-l)",
        },
        sage: {
          DEFAULT: "var(--color-sage)",
          l: "var(--color-sage-l)",
        },
        indigo: {
          DEFAULT: "var(--color-indigo)",
          d: "var(--color-indigo-d)",
          l: "var(--color-indigo-l)",
        },
        amber: {
          DEFAULT: "var(--color-amber)",
          l: "var(--color-amber-l)",
        },
        brick: {
          DEFAULT: "var(--color-brick)",
          l: "var(--color-brick-l)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        button: "var(--radius-button)",
        input: "var(--radius-input)",
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
      },
      transitionTimingFunction: {
        signature: "var(--ease-signature)",
      },
      fontSize: {
        hero: ["88px", { lineHeight: "0.95", letterSpacing: "-3px" }],
        display: ["clamp(36px, 5vw + 1rem, 64px)", { lineHeight: "1.05", letterSpacing: "-1.5px" }],
        h1: ["46px", { lineHeight: "1.1", letterSpacing: "-1px" }],
        h2: ["34px", { lineHeight: "1.2", letterSpacing: "-0.5px" }],
        h3: ["24px", { lineHeight: "1.3", letterSpacing: "-0.3px" }],
        h4: ["17px", { lineHeight: "1.3", letterSpacing: "-0.1px" }],
        "body-lg": ["18px", { lineHeight: "1.7" }],
        body: ["16px", { lineHeight: "1.65" }],
        "body-sm": ["14px", { lineHeight: "1.6" }],
        caption: ["13px", { lineHeight: "1.5" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "2px" }],
        price: ["44px", { lineHeight: "1", letterSpacing: "-1px" }],
      },
      animation: {
        "marquee-scroll": "marquee-scroll 30s linear infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        "marquee-scroll": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
