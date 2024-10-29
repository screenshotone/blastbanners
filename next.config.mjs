/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    compress: false,
    poweredByHeader: false,
    experimental: {
        instrumentationHook: true,
    },
};

export default nextConfig;
