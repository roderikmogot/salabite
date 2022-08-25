/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://countryflagsapi.com"],
  },
};

module.exports = nextConfig;
