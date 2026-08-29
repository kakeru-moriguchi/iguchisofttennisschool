"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ページ遷移したらメニューを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // メニューを開いている間は背面のスクロールを止める
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc キーで閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // スクロール量に応じてヘッダーの見た目を変える
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white/85 backdrop-blur-sm",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        {/* ロゴ */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 py-2"
          aria-label={`${siteConfig.name} トップページ`}
        >
          <LogoMark className="h-9 w-9 md:h-10 md:w-10" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[11px] font-bold tracking-[0.14em] text-accent-dark md:text-xs">
              IGUCHI SOFT TENNIS
            </span>
            <span className="mt-1 text-[13px] font-bold text-brand-800 md:text-[15px]">
              イグチソフトテニススクール
            </span>
          </span>
        </Link>

        {/* PC: 横並びナビ */}
        <nav aria-label="メインメニュー" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav
              .filter((item) => item.href !== "/contact")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-[44px] items-center rounded-lg px-4 text-[15px] font-bold transition-colors",
                      isActive(item.href)
                        ? "text-accent-dark"
                        : "text-brand-800 hover:text-accent-dark",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              ))}
            <li className="ml-2">
              <Link
                href="/contact"
                className="flex min-h-[44px] items-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md"
              >
                <MailIcon className="h-4 w-4" />
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        {/* SP: ハンバーガーボタン */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-800 transition-colors hover:bg-brand-50 lg:hidden"
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute top-1/2 left-0 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-all duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300",
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
              )}
            />
          </span>
        </button>
      </div>

      {/* SP: 全画面ドロワー */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
      >
        <nav
          aria-label="メインメニュー（モバイル）"
          className="container-page py-4"
        >
          <ul className="divide-y divide-brand-100">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-[64px] items-center justify-between gap-4 py-2 text-lg font-bold transition-colors",
                    isActive(item.href) ? "text-accent-dark" : "text-brand-800",
                  )}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-brand-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3 pb-10">
            <Link
              href="/contact"
              className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white shadow-sm"
            >
              <MailIcon className="h-5 w-5" />
              お問い合わせ・お申し込み
            </Link>
            <p className="text-center text-sm text-slate-500">
              {siteConfig.contact.hours}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg bg-brand-900",
        className,
      )}
    >
      <Image
        src="/images/logo.jpg"
        alt=""
        fill
        sizes="48px"
        priority
        className="object-cover"
      />
    </span>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
