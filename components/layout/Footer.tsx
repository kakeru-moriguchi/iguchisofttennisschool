import Link from "next/link";
import { mainNav, siteConfig } from "@/data/site";
import { classes } from "@/data/classes";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 text-navy-100">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* スクール情報 */}
          <div>
            <p className="font-display text-sm font-bold tracking-[0.18em] text-sky-brand-light">
              {siteConfig.nameEn}
            </p>
            <p className="mt-2 text-lg font-bold text-white">
              {siteConfig.name}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-200">
              {siteConfig.area.prefecture}
              {siteConfig.area.city}のソフトテニススクール。
              <br />
              練習会場：{siteConfig.area.venues.join(" / ")}
            </p>

            {siteConfig.social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {siteConfig.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center rounded-lg border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* メニュー */}
          <nav aria-label="フッターメニュー">
            <h2 className="font-display text-xs font-bold tracking-[0.18em] text-sky-brand-light uppercase">
              Menu
            </h2>
            <ul className="mt-4 space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-[44px] items-center text-[15px] text-navy-100 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* クラス一覧 */}
          <nav aria-label="クラス一覧">
            <h2 className="font-display text-xs font-bold tracking-[0.18em] text-sky-brand-light uppercase">
              Class
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 md:grid-cols-1 md:gap-x-0">
              {classes.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/classes#${c.slug}`}
                    className="flex min-h-[40px] items-center text-sm text-navy-200 transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 問い合わせ導線 */}
        <div className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-6 md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="text-base font-bold text-white">
              体験・見学のご相談も受け付けています
            </p>
            <p className="mt-1 text-sm text-navy-200">
              {siteConfig.contact.hours}／{siteConfig.contact.replyNote}
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-4 flex min-h-[52px] items-center justify-center rounded-xl bg-sky-brand px-8 text-[15px] font-bold text-white transition-colors hover:bg-sky-brand-dark md:mt-0 md:shrink-0"
          >
            お問い合わせフォームへ
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-navy-300">
          © {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
