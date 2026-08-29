import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "イグチソフトテニススクールへのお問い合わせ・お申し込みはこちらから。体験や見学のご相談、クラス選びのご質問も受け付けています。宮崎市でソフトテニスを始めたい方、競技力を伸ばしたい方はお気軽にご連絡ください。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `お問い合わせ｜${siteConfig.name}`,
    description:
      "体験・見学のご相談、クラス選びのご質問も受け付けています。お気軽にご連絡ください。",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="お問い合わせ"
        description="体験・見学のご相談、クラス選びのご質問も受け付けています。以下のフォームからお気軽にご連絡ください。"
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start lg:gap-14">
            {/* フォーム */}
            <div>
              <h2 className="text-xl font-bold text-brand-800 sm:text-2xl">
                お問い合わせフォーム
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                すべての項目にご入力のうえ、送信してください。
                <br />
                {siteConfig.contact.replyNote}
              </p>

              <div className="mt-8">
                {/* useSearchParams を使うため Suspense で囲みます */}
                <Suspense fallback={<FormSkeleton />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            {/* 補足情報 */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
                <h2 className="text-base font-bold text-brand-800">
                  お問い合わせの前に
                </h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "初心者の方も大歓迎です。用具をお持ちでない場合もご相談ください。",
                    "どのクラスが合うか分からない場合は「まだ決めていない / 相談したい」をお選びください。",
                    "見学・体験のご希望は、お問い合わせ内容にご記入ください。",
                    "上級クラスへのご参加には大会審査があります。",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-100 bg-white p-6">
                <h2 className="text-base font-bold text-brand-800">練習会場</h2>
                <ul className="mt-3 space-y-2">
                  {siteConfig.area.venues.map((v) => (
                    <li key={v} className="text-sm text-slate-600">
                      {v}（{siteConfig.area.prefecture}
                      {siteConfig.area.city}）
                    </li>
                  ))}
                </ul>

                {siteConfig.social.length > 0 && (
                  <>
                    <h2 className="mt-6 text-base font-bold text-brand-800">
                      SNS
                    </h2>
                    <ul className="mt-3 flex flex-wrap gap-2.5">
                      {siteConfig.social.map((s) => (
                        <li key={s.href}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-[44px] items-center rounded-lg border border-brand-100 bg-brand-50 px-4 text-sm font-bold text-brand-800 transition-colors hover:border-accent hover:text-accent-dark"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <BackToHomeButton />
    </>
  );
}

/** フォーム読み込み中に表示するプレースホルダー */
function FormSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-28 rounded bg-brand-100" />
          <div className="h-[52px] w-full rounded-xl bg-brand-50" />
        </div>
      ))}
    </div>
  );
}
