/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real images (when they replace placeholders) get modern formats by default.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
