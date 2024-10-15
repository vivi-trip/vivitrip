/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    // unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**.domain.co(m|.kr)" }],
  },
};

export default nextConfig;
