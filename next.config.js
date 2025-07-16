/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable static optimization completely to fix context issues
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Disable ISR and SSG
    isrMemoryCacheSize: 0,
  },
  // Improve development experience
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Improve HMR reliability
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };

      // Better source maps for debugging
      config.devtool = "eval-source-map";

      // Optimize for development
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }

    return config;
  },
  // Handle development mode fetch issues
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "no-cache, no-store, must-revalidate",
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
            },
          ],
        },
      ];
    }
    return [];
  },
  // Development-specific settings
  ...(process.env.NODE_ENV === "development" && {
    onDemandEntries: {
      maxInactiveAge: 60 * 1000 * 60, // 1 hour
      pagesBufferLength: 5,
    },
  }),
};

module.exports = nextConfig;
