// next.config.mjs
const nextConfig = {
    reactStrictMode: true,
    env: {
      CUSTOM_ENV_VAR: process.env.CUSTOM_ENV_VAR,
    },
    webpack: (config) => {
      // Custom Webpack configuration
      return config;
    },
  };
  
  export default nextConfig;