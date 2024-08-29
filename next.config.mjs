/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "**", // Adjust path pattern to match specific paths
      },
    ],
  },
};

export default nextConfig;
// next.config.js
