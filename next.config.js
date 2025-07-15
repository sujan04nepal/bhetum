/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Disable static generation to avoid SSR issues
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
