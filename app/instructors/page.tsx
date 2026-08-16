import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import InstructorCard from "@/components/sections/InstructorCard";
import CTASection from "@/components/sections/CTASection";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import Reveal from "@/components/ui/Reveal";
import { instructors } from "@/data/instructors";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "講師紹介",
  description:
    "イグチソフトテニススクールの講師紹介。代表・ヘッドコーチの井口雄介は元ナショナルチーム日本代表。全日本シングルスベスト8、全日本学生シングルス2連覇、九州選手権シングルス・ダブルス3連覇などの実績を持ち、宮崎で直接指導しています。",
  alternates: { canonical: "/instructors" },
  openGraph: {
    title: `講師紹介｜${siteConfig.name}`,
    description:
      "代表・ヘッドコーチ 井口雄介（元ナショナルチーム日本代表）の経歴・得意分野・メッセージをご紹介します。",
  },
};

export default function InstructorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Instructor"
        title="講師紹介"
        description="元ナショナルチーム日本代表として世界で戦った経験を、宮崎の選手たちへ。技術だけでなく「勝つための考え方」までお伝えします。"
        image="/images/instructors/iguchi-yusuke.jpg"
        imageAlt="代表・ヘッドコーチ 井口雄介"
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-page space-y-10">
          {instructors.map((item, i) => (
            <Reveal key={item.slug} delay={i * 100}>
              <InstructorCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="レッスンで、直接お会いしましょう。"
        description="見学・体験も受け付けています。指導内容やクラス選びについてのご質問もお気軽にどうぞ。"
      />

      <BackToHomeButton />
    </>
  );
}
