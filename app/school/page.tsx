import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import {
  features,
  galleryPhotos,
  philosophy,
  policies,
  stats,
} from "@/data/school";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "スクール紹介",
  description:
    "宮崎市のイグチソフトテニススクールの理念・指導方針・特徴をご紹介します。初心者への指導から競技力向上を目指す選手への指導、試合で勝つための考え方まで、一人ひとりに合わせた指導を行っています。",
  alternates: { canonical: "/school" },
  openGraph: {
    title: `スクール紹介｜${siteConfig.name}`,
    description:
      "理念・指導方針・スクールの特徴をご紹介。初心者から競技志向の選手まで、一人ひとりに合わせた指導を行っています。",
  },
};

export default function SchoolPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Our School"
        title="スクール紹介"
        description="宮崎県宮崎市を拠点に活動するソフトテニススクールです。キッズから競技志向の選手まで、一人ひとりに合わせた指導でソフトテニスの楽しさと成長をサポートします。"
      />

      {/* 理念 */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Mission" title="スクールの理念" />
            <h3 className="mt-8 max-w-3xl text-2xl leading-relaxed font-bold whitespace-pre-line text-brand-800 sm:text-3xl md:text-4xl">
              {philosophy.heading}
            </h3>
            <div className="mt-7 max-w-3xl space-y-5">
              {philosophy.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-slate-600 sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* 数字で見るスクール */}
          <Reveal delay={100}>
            {/* 項目数に合わせて列数が変わります */}
            <dl
              className="mt-12 grid gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-8"
              style={{
                gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
              }}
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="font-display text-3xl font-extrabold text-accent-dark sm:text-5xl">
                      {s.value}
                    </span>
                    <span className="ml-1 text-sm font-bold text-brand-800">
                      {s.unit}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-slate-500 sm:text-sm">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 指導方針 */}
      <section className="bg-brand-50 py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Policy"
              title="指導方針"
              description="イグチソフトテニススクールが、指導で大切にしている3つの考え方です。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {policies.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-800 text-accent-light">
                    <Icon name={p.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-brand-800">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 写真（練習・指導・試合） */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Gallery"
              title="練習・試合の様子"
              description="練習風景、指導風景、試合や大会、集合写真など、スクールの日常をご覧ください。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPhotos.map((photo, i) => (
              <Reveal as="li" key={photo.src} delay={i * 60}>
                <figure className="zoom-parent group relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-100">
                  <SmartImage
                    src={photo.src}
                    alt={photo.alt}
                    placeholderLabel={photo.caption}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-3.5 text-sm font-bold text-white">
                    {photo.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* スクールの特徴 */}
      <section className="bg-brand-50 py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Features"
              title="スクールの特徴"
              description="初めての方も、全国を目指す選手も。それぞれの目標に合わせた指導を行っています。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((text, i) => (
              <Reveal as="li" key={text} delay={(i % 3) * 70}>
                <div className="flex h-full min-h-[132px] items-center justify-center rounded-2xl border border-brand-100 bg-white px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg sm:min-h-[150px]">
                  <h3 className="text-lg leading-snug font-bold text-brand-800 sm:text-xl">
                    {text}
                  </h3>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="見学・体験のご相談も受け付けています。"
        description="実際の練習を見てからご判断いただけます。「どのクラスが合うか分からない」というご相談も歓迎です。"
      />

      <BackToHomeButton />
    </>
  );
}
