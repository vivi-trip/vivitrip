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
    remotePatterns: [
      { protocol: "https", hostname: "**.domain.co(m|.kr)" },
      { protocol: "https", hostname: "http://k.kakaocdn.net/dn" },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
