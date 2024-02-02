/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "imgsvc.trackercdn.com",
                port: "",
                pathname: "/url/**",
            },
        ],
    },
};

module.exports = nextConfig;
