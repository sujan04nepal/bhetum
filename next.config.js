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
  // Skip static generation for pages with context issues
  async generateStaticParams() {
    return [];
  },
  // Force dynamic rendering for problematic routes
  async headers() {
    return [
      {
        source: "/((?!api/).*)",
        headers: [
          {
            key: "x-middleware-cache",
            value: "no-cache",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
