import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { siteConfig } from "@/data/site";

/**
 * ファーストビュー。
 * タイトル・キャッチコピーは data/site.ts の catchCopy を編集すると変わります。
 * 背景写真は public/images/hero.jpg を差し替えてください。
 */
export default function Hero() {
  const { catchCopy } = siteConfig;

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-navy-900 md:min-h-[92svh]">
      {/* 背景写真 */}
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src={siteConfig.heroImage}
          alt="ソフトテニスの練習に打ち込むイグチソフトテニススクールの選手たち"
          placeholderLabel="ソフトテニスの練習・試合の写真"
          sizes="100vw"
          priority
          tone="brand"
        />
        {/* 文字を読みやすくするためのオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/75 to-navy-900/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 to-transparent" />
      </div>

      <div className="container-page pt-28 pb-14 md:pt-32 md:pb-20">
        <div className="max-w-3xl">
          {/* 所在地バッジ */}
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-brand-light" />
            {siteConfig.area.prefecture}
            {siteConfig.area.city}のソフトテニススクール
          </p>

          {/* サイトタイトル */}
          <h1 className="mt-5">
            <span className="font-display block text-[clamp(1.75rem,7vw,4rem)] leading-[1.05] font-extrabold tracking-tight text-white">
              IGUCHI SOFT
              <br className="sm:hidden" /> TENNIS SCHOOL
            </span>
            <span className="mt-3 block text-base font-bold tracking-wide text-sky-brand-light sm:text-lg md:text-xl">
              イグチソフトテニススクール
            </span>
          </h1>

          {/* キャッチコピー */}
          <p className="mt-7 text-[clamp(1.25rem,4.5vw,2rem)] leading-snug font-bold text-white">
            {catchCopy.headline}
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-100 sm:text-base">
            {catchCopy.lead.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>

          {/* CTA 3つ */}
          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link
              href="/classes"
              className="flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-sky-brand px-8 text-base font-bold text-white shadow-lg shadow-sky-brand/25 transition-all hover:bg-sky-brand-dark active:scale-[0.99] sm:min-w-[180px]"
            >
              クラスを見る
              <ArrowIcon />
            </Link>
            <Link
              href="/prices"
              className="flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-navy-800 shadow-lg transition-all hover:bg-navy-50 active:scale-[0.99] sm:min-w-[180px]"
            >
              料金を見る
              <ArrowIcon />
            </Link>
            <Link
              href="/contact"
              className="flex min-h-[56px] items-center justify-center gap-2 rounded-xl border-2 border-white/70 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.99] sm:min-w-[180px]"
            >
              お問い合わせ
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* スクロール誘導（PCのみ） */}
      <div
        className="absolute right-8 bottom-8 hidden flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <span className="font-display text-[10px] tracking-[0.25em] text-white/60">
          SCROLL
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
