/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force all pages to be server-side rendered for deployment
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Configure for deployment without static generation
  distDir: ".next",
  generateBuildId: () => "build",
};

module.exports = nextConfig;
