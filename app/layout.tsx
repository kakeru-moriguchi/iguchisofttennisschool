import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Outfit } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { siteConfig } from "@/data/site";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}｜宮崎のソフトテニススクール`,
    // 各ページのタイトルはこのテンプレートに差し込まれます
    template: `%s｜${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name}｜宮崎のソフトテニススクール`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}｜宮崎のソフトテニススクール`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1b3c16",
  width: "device-width",
  initialScale: 1,
};

/** 検索エンジン向けの構造化データ */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    description: siteConfig.description,
    url: siteConfig.url,
    sport: "ソフトテニス",
    areaServed: {
      "@type": "City",
      name: `${siteConfig.area.prefecture}${siteConfig.area.city}`,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: siteConfig.area.prefecture,
      addressLocality: siteConfig.area.city,
      addressCountry: "JP",
    },
    sameAs: siteConfig.social.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // 構造化データはビルド時に確定する静的な内容です
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <StructuredData />

        {/* キーボード操作でのスキップリンク */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand-800 focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          本文へスキップ
        </a>

        <Header />

        {/* SP下部の固定CTAバーに隠れないよう余白を確保 */}
        <main id="main" className="flex-1 pb-24 lg:pb-0">
          {children}
        </main>

        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
