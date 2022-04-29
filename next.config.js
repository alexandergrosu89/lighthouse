/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "raw.githubusercontent.com"],
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
