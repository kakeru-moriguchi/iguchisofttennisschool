import type { MetadataRoute } from "next";
import { mainNav, siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // トップページは上で追加済みのため除外する
    ...mainNav
      .filter((item) => item.href !== "/")
      .map((item) => ({
        url: `${siteConfig.url}${item.href}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: item.href === "/contact" ? 0.9 : 0.8,
      })),
  ];
}
