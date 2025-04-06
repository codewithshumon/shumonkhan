/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        // Optional: you can add port and pathname if needed
        // port: '',
        // pathname: '/public/**',
      },
    ],
  },
};

export default nextConfig;
