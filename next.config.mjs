/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(lottie|json)$/,
      type: "asset/resource",
      generator: {
        filename: "static/[hash][ext]",
      },
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.lottie": {
          loaders: ["file-loader"],
        },
      },
    },
  },
};

export default nextConfig;
