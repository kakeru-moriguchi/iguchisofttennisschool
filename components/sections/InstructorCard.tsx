import SmartImage from "@/components/ui/SmartImage";
import type { Instructor } from "@/data/instructors";

/**
 * 講師紹介カード。
 * PC：左＝写真 / 右＝名前・経歴・得意分野・メッセージ
 * SP：縦並び
 */
export default function InstructorCard({ item }: { item: Instructor }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* 写真 */}
      <div className="relative aspect-[4/5] w-full md:aspect-auto md:h-full md:min-h-[560px]">
        <SmartImage
          src={item.image}
          alt={`${item.role} ${item.name}`}
          placeholderLabel={`${item.name}（${item.role}）`}
          sizes="(min-width: 768px) 42vw, 100vw"
          priority
        />
        {/* SPでは写真の下部に名前を重ねる */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/90 to-transparent px-5 pt-12 pb-5 md:hidden">
          <p className="font-display text-[10px] font-bold tracking-[0.2em] text-accent-light">
            {item.nameEn}
          </p>
          <p className="mt-1 text-2xl font-bold text-white">{item.name}</p>
          <p className="mt-1 text-sm text-brand-100">{item.role}</p>
        </div>
      </div>

      {/* テキスト */}
      <div className="p-6 sm:p-8 md:p-10">
        {/* 名前（PCのみ。SPは写真に重ねて表示済み） */}
        <div className="hidden md:block">
          <p className="font-display text-[11px] font-bold tracking-[0.2em] text-accent-dark">
            {item.nameEn}
          </p>
          <h2 className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-800 lg:text-4xl">
              {item.name}
            </span>
            <span className="text-sm text-slate-500">{item.nameKana}</span>
          </h2>
          <p className="mt-2 inline-flex rounded-full bg-brand-800 px-3.5 py-1 text-xs font-bold text-white">
            {item.role}
          </p>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed font-bold text-accent-dark md:mt-6">
          {item.tagline}
        </p>

        {/* 経歴 */}
        <section className="mt-7">
          <h3 className="flex items-center gap-2.5 text-sm font-bold tracking-wider text-brand-800">
            <span className="h-4 w-1 rounded-full bg-accent" />
            経歴・戦績
          </h3>
          <ul className="mt-3 space-y-2">
            {item.careers.map((c, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm leading-relaxed text-slate-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
                  <path d="M12 14v4M9 20h6" />
                </svg>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 得意分野 */}
        <section className="mt-7">
          <h3 className="flex items-center gap-2.5 text-sm font-bold tracking-wider text-brand-800">
            <span className="h-4 w-1 rounded-full bg-accent" />
            得意分野
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.specialties.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-accent-dark"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* メッセージ */}
        <section className="mt-7 rounded-xl bg-brand-50 p-5 sm:p-6">
          <h3 className="flex items-center gap-2.5 text-sm font-bold tracking-wider text-brand-800">
            <span className="h-4 w-1 rounded-full bg-accent" />
            メッセージ
          </h3>
          <div className="mt-3 space-y-3">
            {item.message.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed whitespace-pre-line text-slate-700"
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
