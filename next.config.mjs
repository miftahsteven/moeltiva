/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images in /public to be optimized
    unoptimized: false,
    // Supported formats
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
