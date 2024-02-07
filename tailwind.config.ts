import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        // './pages/**/*.{js,ts,jsx,tsx,mdx}',
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                rps: {
                    100: "#e88572",
                    200: "#ed976f",
                    300: "#f2a96d",
                    400: "#f7bb6b",
                    500: "#fccd68",
                    600: "#eed36b",
                    700: "#cdce72",
                    800: "#abc879",
                    900: "#8ac380",
                    1000: "#69be87",
                },
            },
        },
    },
    safelist: [
        'bg-rps-100',
        'bg-rps-200',
        'bg-rps-300',
        'bg-rps-400',
        'bg-rps-500',
        'bg-rps-600',
        'bg-rps-700',
        'bg-rps-800',
        'bg-rps-900',
        'bg-rps-1000',
    ],
    plugins: [require("@tailwindcss/forms")],
};

export default config;
