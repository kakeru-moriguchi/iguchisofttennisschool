import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import PriceTable from "@/components/sections/PriceTable";
import { PriceCard, SpecialPriceCard } from "@/components/sections/PriceCard";
import CTASection from "@/components/sections/CTASection";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { priceNotes, priceRows, specialPrices } from "@/data/prices";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "料金表",
  description:
    "イグチソフトテニススクールの料金表。キッズ5,500円・初中級9,000円・中上級11,000円・上級11,000円の月会費のほか、単発参加・4回券・8回券もご用意。VIP・EX・講習会・プライベートクラスの料金も掲載しています。",
  alternates: { canonical: "/prices" },
  openGraph: {
    title: `料金表｜${siteConfig.name}`,
    description:
      "月会費・単発・回数券（4回／8回）の料金を一覧で確認できます。特別クラスの料金も掲載。",
  },
};

export default function PricesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Price"
        title="料金表"
        description="月会費のほか、単発参加や回数券もご利用いただけます。ご都合に合わせてお選びください。"
        image="/images/school/match.jpg"
        imageAlt="ソフトテニスの試合の様子"
      />

      {/* 通常クラスの料金 */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Regular Class"
              title="通常クラスの料金"
              description="月会費は月4回のレッスンが基本です。都合が合わない月は、単発参加や回数券もご利用いただけます。"
            />
          </Reveal>

          {/* PC：比較しやすい表 */}
          <Reveal delay={80} className="mt-10">
            <PriceTable />
          </Reveal>

          {/* SP：横スクロールさせず、クラスごとのカードで表示 */}
          <ul className="mt-10 grid gap-4 md:hidden">
            {priceRows.map((row, i) => (
              <Reveal as="li" key={row.key} delay={i * 60}>
                <PriceCard row={row} />
              </Reveal>
            ))}
          </ul>

          <p className="mt-6 text-sm text-slate-500">
            ※ 表示価格はすべて税込です。
          </p>
        </div>
      </section>

      {/* 特別クラス・その他の料金 */}
      <section className="bg-navy-50 py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Special & Other"
              title="特別クラス・その他の料金"
              description="マンツーマン指導のVIP・EXクラス、団体向けの講習会、貸切のプライベートクラスの料金です。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {specialPrices.map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 80}>
                <SpecialPriceCard item={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="bg-white py-14 md:py-16">
        <div className="container-page">
          <Reveal>
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-800">
                料金に関するご注意
              </h2>
              <ul className="mt-4 space-y-2.5">
                {priceNotes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-brand" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="料金やお支払いについてのご質問も、お気軽に。"
        description="「まずは単発で試したい」「兄弟で通いたい」などのご相談も受け付けています。"
      />

      <BackToHomeButton />
    </>
  );
}
