import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pxToRem = require("tailwindcss-preset-px-to-rem");

const config: Config = {
  presets: [pxToRem],
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      height: {
        header: "var(--header-height)",
        footer: "var(--footer-height)",
        main: "calc(100vh - var(--header-height))",
      },
      minHeight: {
        main: "calc(100vh - (var(--header-height)) - (var(--footer-height)))",
      },
      colors: {
        /* brand */
        brand: {
          600: "var(--brand-600)",
          500: "var(--brand-500)",
          400: "var(--brand-400)",
          300: "var(--brand-300)",
          200: "var(--brand-200)",
          100: "var(--brand-100)",
          50: "var(--brand-50)",
        },

        /* basic */
        basic: {
          /* Black */
          black: "var(--basic-black)",
          /* Navy */
          navy: "var(--basic-navy)",
        },

        /* Gray */
        gray: {
          800: "var(--gray-800)",
          700: "var(--gray-700)",
          600: "var(--gray-600)",
          500: "var(--gray-500)",
          400: "var(--gray-400)",
          300: "var(--gray-300)",
          200: "var(--gray-200)",
          100: "var(--gray-100)",
          50: "var(--gray-50)",
        },

        /* Red */
        red: {
          200: "var(--red-200)",
          100: "var(--red-100)",
          50: "var(--red-50)",
        },

        /* Orange */
        orange: {
          100: "var(--orange-100)",
          50: "var(--orange-50)",
        },

        /* Yellow */
        yellow: {
          200: "var(--yellow-200)",
        },

        /* Green */
        green: {
          200: "var(--green-200)",
        },

        /* Blue */
        blue: {
          200: "var(--blue-200)",
          100: "var(--blue-100)",
          50: "var(--blue-50)",
        },
      },
      boxShadow: {
        custom: "0px 4px 16px 0px #1122110D",
      },
    },
  },
  plugins: [],
};

export default config;
