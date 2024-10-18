import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Black */
        "basic-black": "var(--basic-black)",
        "nomad-black": "var(--nomad-black)",

        /* Gray */
        "gray-800": "var(--gray-800)",
        "gray-700": "var(--gray-700)",
        "gray-600": "var(--gray-600)",
        "gray-500": "var(--gray-500)",
        "gray-400": "var(--gray-400)",
        "gray-300": "var(--gray-300)",
        "gray-200": "var(--gray-200)",
        "gray-100": "var(--gray-100)",
        "gray-50": "var(--gray-50)",

        /* Green */
        "green-100": "var(--green-100)",
        "green-50": "var(--green-50)",
        "light-green": "var(--light-green)",

        /* Red */
        "red-200": "var(--red-200)",
        "red-100": "var(--red-100)",
        "red-50": "var(--red-50)",

        /* Orange */
        "orange-100": "var(--orange-100)",
        "orange-50": "var(--orange-50)",

        /* Yellow */
        "basic-yellow": "var(--basic-yellow)",

        /* Blue */
        "blue-200": "var(--blue-200)",
        "blue-100": "var(--blue-100)",
        "blue-50": "var(--blue-50)",
      },
    },
  },
  plugins: [],
};

export default config;
