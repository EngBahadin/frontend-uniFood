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
      {
        protocol: "http", // Use 'https' if needed
        hostname: "localhost", // Allow localhost as an image source
        port: "8000", // Specify the port if it's running on a specific port (like 8000)
        pathname: "/media/**", // Allow all images under /media/ path
      },
    ],
  },
};

export default nextConfig;
