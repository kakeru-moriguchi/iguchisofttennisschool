import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // 講習会の申し込みページ（public/kousyukai/index.html）を /kousyukai で開けるようにする
  async rewrites() {
    return [{ source: "/kousyukai", destination: "/kousyukai/index.html" }];
  },
};

export default nextConfig;
