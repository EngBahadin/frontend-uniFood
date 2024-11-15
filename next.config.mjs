/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // or "https" if the URLs are HTTPS
        hostname: "uni-food-deploy.onrender.com",
        port: "", // Leave empty unless you have a custom port in the URL
        pathname: "/media/**", // Allow all images under /media/ path
      },
    ],
  },
};

export default nextConfig;
