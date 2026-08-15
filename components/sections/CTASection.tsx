import Link from "next/link";
import { siteConfig } from "@/data/site";

type CTASectionProps = {
  title?: string;
  description?: string;
  /** 「クラスを見る」ボタンも表示するか */
  showClassLink?: boolean;
};

/** お問い合わせへ誘導する共通CTAブロック */
export default function CTASection({
  title = "まずは、お気軽にご相談ください。",
  description = "「初心者でも大丈夫？」「どのクラスが合う？」といったご質問だけでも歓迎です。体験・見学のご相談も受け付けています。",
  showClassLink = true,
}: CTASectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800">
      {/* 装飾 */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-brand/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-sky-brand/10 blur-3xl"
      />

      <div className="container-page relative py-16 text-center md:py-20">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-sky-brand-light uppercase">
          Contact
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-navy-100 sm:text-base">
          {description}
        </p>

        <div className="mx-auto mt-9 grid max-w-lg gap-3 sm:flex sm:max-w-none sm:justify-center sm:gap-4">
          <Link
            href="/contact"
            className="flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-sky-brand px-9 text-base font-bold text-white shadow-lg shadow-sky-brand/25 transition-all hover:bg-sky-brand-dark active:scale-[0.99]"
          >
            お問い合わせ・お申し込み
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
          </Link>
          {showClassLink && (
            <Link
              href="/classes"
              className="flex min-h-[56px] items-center justify-center rounded-xl border-2 border-white/70 bg-white/10 px-9 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.99]"
            >
              クラスを見る
            </Link>
          )}
        </div>

        <p className="mt-6 text-sm text-navy-200">
          {siteConfig.contact.hours}／{siteConfig.contact.replyNote}
        </p>
      </div>
    </section>
  );
}
