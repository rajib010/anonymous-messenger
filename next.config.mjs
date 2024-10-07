/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { dev, isServer }) {
      // Enable better source maps during development
      if (dev && !isServer) {
        config.devtool = 'eval-source-map';  // You can also use 'cheap-module-source-map' if needed
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  