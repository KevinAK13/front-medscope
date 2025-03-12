/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false };
    }

    // Cargar archivos .node correctamente
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });

    return config;
  },
  
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignora errores de ESLint en build
  },
  
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignora errores de TypeScript en build
  },
};

module.exports = nextConfig;