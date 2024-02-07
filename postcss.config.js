/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        require("postcss-nested"),
    ],
};

export default config;
