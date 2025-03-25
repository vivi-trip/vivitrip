/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // 프로젝트 정적 페이지 전용으로 설정
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
      { protocol: "http", hostname: "k.kakaocdn.net" },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "vivitrip-thumbnail.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
