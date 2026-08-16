import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import ClassCard from "@/components/sections/ClassCard";
import CTASection from "@/components/sections/CTASection";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import {
  classes,
  regularClasses,
  serviceClasses,
  specialClasses,
} from "@/data/classes";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "クラス",
  description:
    "イグチソフトテニススクールの全8クラス（VIP・EX・中上級・上級・初中級・キッズ・講習会・プライベート）をご紹介。曜日・場所・時間・対象・定員・料金をまとめて確認できます。宮崎市清武運動公園・生目の杜運動公園で開講。",
  alternates: { canonical: "/classes" },
  openGraph: {
    title: `クラス｜${siteConfig.name}`,
    description:
      "キッズから競技志向まで全8クラス。曜日・場所・時間・対象・定員・料金をまとめて確認できます。",
  },
};

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Class"
        title="クラス"
        description="レベルと目的に合わせた8つのクラスをご用意しています。気になるクラスから、そのままお申し込みいただけます。"
        image="/images/school/practice.jpg"
        imageAlt="イグチソフトテニススクールの練習風景"
      />

      {/* クラス一覧への目次（スマートフォンでも探しやすく） */}
      <nav aria-label="クラス一覧" className="border-b border-navy-100 bg-white">
        <div className="container-page py-5">
          <ul className="flex flex-wrap gap-2">
            {classes.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="flex min-h-[44px] items-center rounded-lg border border-navy-100 bg-navy-50 px-4 text-sm font-bold text-navy-800 transition-colors hover:border-sky-brand hover:text-sky-brand-dark"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 特別クラス（VIP / EX） */}
      <section className="bg-navy-900 py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Premium"
              title="特別クラス"
              tone="dark"
              description="マンツーマン指導と動画分析で、本気で上を目指す方のためのクラスです。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {specialClasses.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 100}>
                <ClassCard
                  item={item}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 通常クラス */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Regular Class"
              title="通常クラス"
              description="週1回のレッスンを基本に、レベル別の少人数で練習します。月会費のほか、単発参加や回数券もご利用いただけます。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularClasses.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 70}>
                <ClassCard item={item} />
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-8">
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <h3 className="text-base font-bold text-navy-800">
                  単発参加・回数券もご利用いただけます
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  月会費のほか、1回のみの単発参加や、4回券・8回券の回数券もご用意しています。
                </p>
              </div>
              <Link
                href="/prices"
                className="mt-4 flex min-h-[52px] items-center justify-center rounded-xl bg-navy-800 px-7 text-[15px] font-bold text-white transition-colors hover:bg-navy-700 sm:mt-0 sm:shrink-0"
              >
                料金表を見る
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* その他のサービス */}
      <section className="bg-navy-50 py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Other Service"
              title="講習会・プライベートクラス"
              description="学校・クラブ・団体からのご依頼や、仲間だけで受けられる貸切レッスンにも対応しています。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {serviceClasses.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 90}>
                <ClassCard
                  item={item}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="どのクラスが合うか、ご相談ください。"
        description="現在のレベルや目標をお聞きしたうえで、おすすめのクラスをご提案します。見学・体験も受け付けています。"
        showClassLink={false}
      />

      <BackToHomeButton />
    </>
  );
}
