import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ClassCard from "@/components/sections/ClassCard";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { classes } from "@/data/classes";
import { formatPrice, priceRows, specialPrices } from "@/data/prices";
import { mainInstructor } from "@/data/instructors";
import { philosophy, policies, stats } from "@/data/school";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `${siteConfig.name}｜宮崎のソフトテニススクール`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const featuredClasses = classes.filter((c) => c.featured);

export default function HomePage() {
  return (
    <>
      {/* ① ファーストビュー */}
      <Hero />

      {/* ② スクール紹介 */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="About"
                title="スクール紹介"
                description="宮崎県宮崎市を拠点に活動する、元日本代表・井口雄介のソフトテニススクールです。"
              />

              <h3 className="mt-8 text-xl leading-relaxed font-bold whitespace-pre-line text-navy-800 sm:text-2xl">
                {philosophy.heading}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
                {philosophy.body[0]}
              </p>

              {/* 数字で見るスクール */}
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-navy-100 pt-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="font-display text-3xl font-extrabold text-sky-brand-dark sm:text-4xl">
                        {s.value}
                      </span>
                      <span className="ml-1 text-sm font-bold text-navy-800">
                        {s.unit}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-slate-500">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/school"
                className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-navy-800 bg-white px-7 text-[15px] font-bold text-navy-800 transition-all hover:bg-navy-800 hover:text-white"
              >
                スクール紹介を詳しく見る
                <ArrowIcon />
              </Link>
            </Reveal>

            {/* 指導方針 */}
            <Reveal delay={120}>
              <ul className="grid gap-4">
                {policies.map((p) => (
                  <li
                    key={p.title}
                    className="flex gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-brand text-white">
                      <Icon name={p.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy-800">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ③ クラス紹介 */}
      <section className="bg-navy-50 py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Class"
              title="クラス紹介"
              description="キッズから競技志向の選手まで、レベルと目的に合わせた8つのクラスをご用意しています。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredClasses.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 70}>
                <ClassCard
                  item={item}
                  variant="compact"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 text-center">
            <p className="text-sm text-slate-600">
              このほか「講習会」「プライベートクラス」もご用意しています。
            </p>
            <Link
              href="/classes"
              className="mt-4 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-navy-800 px-8 text-base font-bold text-white transition-all hover:bg-navy-700"
            >
              すべてのクラスを見る
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ④ 料金案内 */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Price"
              title="料金案内"
              description="月会費のほか、単発参加や回数券もご利用いただけます。"
            />
          </Reveal>

          {/* 通常クラスの月会費 */}
          <Reveal delay={80}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {priceRows.map((row) => (
                <li
                  key={row.key}
                  className="rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-base font-bold text-navy-800">
                    {row.className}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold tracking-wider text-slate-500">
                    月会費
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-sky-brand-dark">
                    {formatPrice(row.monthly)}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    単発 {formatPrice(row.single)}／回
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 特別クラス */}
          <Reveal delay={140}>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {specialPrices.map((s) => (
                <li
                  key={s.name}
                  className="flex flex-col justify-between rounded-2xl border border-navy-100 bg-navy-50 p-5"
                >
                  <p className="text-sm font-bold text-navy-800">{s.name}</p>
                  <p className="mt-2 text-lg font-extrabold text-navy-800">
                    {s.price}
                  </p>
                  {s.note && (
                    <p className="mt-1 text-[11px] text-slate-500">※{s.note}</p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10 text-center">
            <Link
              href="/prices"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-sky-brand px-8 text-base font-bold text-white shadow-lg shadow-sky-brand/20 transition-all hover:bg-sky-brand-dark"
            >
              料金表を詳しく見る
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ⑤ 講師紹介 */}
      <section className="bg-navy-800 py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <SmartImage
                  src={mainInstructor.image}
                  alt={`${mainInstructor.role} ${mainInstructor.name}`}
                  placeholderLabel={`${mainInstructor.name}（${mainInstructor.role}）`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Instructor"
                title="講師紹介"
                tone="dark"
                description="元ナショナルチーム日本代表として世界で戦った経験を、宮崎の選手たちへ。"
              />

              <div className="mt-8">
                <p className="font-display text-[11px] font-bold tracking-[0.2em] text-sky-brand-light">
                  {mainInstructor.nameEn}
                </p>
                <p className="mt-2 flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-bold text-white">
                    {mainInstructor.name}
                  </span>
                  <span className="text-sm text-navy-200">
                    {mainInstructor.role}
                  </span>
                </p>
              </div>

              {/* 主要な経歴を抜粋 */}
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {mainInstructor.careers.slice(0, 6).map((c) => (
                  <li
                    key={c}
                    className="flex gap-2.5 rounded-lg bg-white/5 px-3.5 py-2.5 text-sm text-navy-100"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2">
                {mainInstructor.message.slice(0, 2).map((p, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-relaxed whitespace-pre-line text-navy-100"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <Link
                href="/instructors"
                className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-white/70 bg-white/10 px-7 text-[15px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                講師紹介を詳しく見る
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ⑥ お問い合わせCTA */}
      <CTASection />
    </>
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
