import Link from "next/link";
import { applyHref } from "@/components/sections/ClassCard";
import {
  formatPrice,
  priceColumns,
  type PriceRow,
  type SpecialPrice,
} from "@/data/prices";
import { cn } from "@/lib/utils";

/**
 * スマートフォン用の料金カード。
 * 横長のテーブルをそのまま表示せず、クラスごとに縦積みで読めるようにしています。
 */
export function PriceCard({ row }: { row: PriceRow }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
      <div className="flex items-baseline justify-between gap-3 bg-brand-800 px-5 py-4">
        <h3 className="text-lg font-bold text-white">{row.className}</h3>
        <Link
          href={`/classes#${row.classSlug}`}
          className="shrink-0 text-xs font-medium text-accent-light underline underline-offset-4"
        >
          クラス詳細
        </Link>
      </div>

      <dl className="divide-y divide-brand-100">
        {priceColumns.map((col, i) => (
          <div
            key={col.key}
            className={cn(
              "flex items-center justify-between gap-4 px-5 py-3.5",
              i === 0 && "bg-brand-50/70",
            )}
          >
            <dt className="text-sm font-medium text-slate-600">
              {col.label}
              <span className="mt-0.5 block text-[11px] text-slate-400">
                {col.note}
              </span>
            </dt>
            <dd
              className={cn(
                "shrink-0 font-extrabold text-brand-800",
                i === 0 ? "text-2xl" : "text-lg",
              )}
            >
              {formatPrice(row[col.key])}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

const SPECIAL_STYLE = {
  vip: {
    card: "border-gold-600/40 bg-brand-900",
    label: "text-gold-400",
    name: "text-white",
    price: "text-gold-300",
    body: "text-brand-100",
    note: "text-gold-400/80",
    button: "bg-gold-500 text-brand-900 hover:bg-gold-400",
    badge: "特別クラス",
  },
  ex: {
    card: "border-silver-400/30 bg-graphite-800",
    label: "text-silver-400",
    name: "text-white",
    price: "text-white",
    body: "text-slate-300",
    note: "text-silver-400",
    button: "bg-white text-graphite-900 hover:bg-silver-300",
    badge: "選抜クラス",
  },
  service: {
    card: "border-brand-100 bg-white",
    label: "text-accent-dark",
    name: "text-brand-800",
    price: "text-brand-800",
    body: "text-slate-600",
    note: "text-slate-500",
    button: "bg-brand-800 text-white hover:bg-brand-700",
    badge: null,
  },
} as const;

/** 特別クラス・その他サービスの料金カード */
export function SpecialPriceCard({ item }: { item: SpecialPrice }) {
  const s = SPECIAL_STYLE[item.tier];

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        s.card,
      )}
    >
      {s.badge && (
        <p
          className={cn(
            "font-display text-[10px] font-bold tracking-[0.2em] uppercase",
            s.label,
          )}
        >
          {s.badge}
        </p>
      )}
      <h3 className={cn("mt-1 text-xl font-bold", s.name)}>{item.name}</h3>

      <p className={cn("mt-3 text-2xl font-extrabold tracking-tight", s.price)}>
        {item.price}
      </p>
      {item.note && (
        <p className={cn("mt-1 text-xs", s.note)}>※{item.note}</p>
      )}

      <p className={cn("mt-4 flex-1 text-sm leading-relaxed", s.body)}>
        {item.summary}
      </p>

      <div className="mt-6 grid gap-2.5">
        <Link
          href={applyHref(item.name)}
          className={cn(
            "flex min-h-[48px] items-center justify-center rounded-xl text-sm font-bold transition-colors",
            s.button,
          )}
        >
          このクラスを申し込む
        </Link>
        <Link
          href={item.href}
          className={cn(
            "flex min-h-[44px] items-center justify-center text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70",
            s.body,
          )}
        >
          詳細を見る
        </Link>
      </div>
    </article>
  );
}
