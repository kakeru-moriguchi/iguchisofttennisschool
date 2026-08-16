"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * スマートフォン下部に固定表示されるCTAバー。
 * どのページからでも、すぐにクラス確認・お問い合わせへ進めます。
 * （お問い合わせページでは非表示）
 */
export default function MobileCtaBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="flex gap-2.5 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <Link
          href="/classes"
          className="flex min-h-[52px] flex-1 items-center justify-center rounded-xl border-2 border-navy-800 bg-white text-[15px] font-bold text-navy-800 active:scale-[0.99]"
        >
          クラスを見る
        </Link>
        <Link
          href="/contact"
          className="flex min-h-[52px] flex-[1.2] items-center justify-center rounded-xl bg-sky-brand text-[15px] font-bold text-white shadow-sm active:scale-[0.99]"
        >
          お問い合わせ
        </Link>
      </div>
    </div>
  );
}
