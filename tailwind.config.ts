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
                    100: "#f05040",
                    200: "#f3693b",
                    300: "#f58134",
                    400: "#f89a2e",
                    500: "#fab327",
                    600: "#e9c22d",
                    700: "#c5c83f",
                    800: "#a3cf52",
                    900: "#7fd564",
                    1000: "#5cdb77",
                },
            },
        },
    },
    safelist: [
        "bg-rps-100",
        "bg-rps-200",
        "bg-rps-300",
        "bg-rps-400",
        "bg-rps-500",
        "bg-rps-600",
        "bg-rps-700",
        "bg-rps-800",
        "bg-rps-900",
        "bg-rps-1000",
    ],
    plugins: [require("@tailwindcss/forms")],
};

export default config;
