import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import type { SchoolClass } from "@/data/classes";
import { cn } from "@/lib/utils";

type ClassCardProps = {
  item: SchoolClass;
  /** compact: トップページ用の抜粋表示 */
  variant?: "full" | "compact";
  /** 画像の sizes 属性 */
  sizes?: string;
};

/** 申し込みリンク（希望クラスを自動選択させる） */
export function applyHref(className: string) {
  return `/contact?class=${encodeURIComponent(className)}`;
}

const TIER_STYLE = {
  vip: {
    card: "border-gold-600/40 bg-brand-900 text-white",
    accent: "text-gold-400",
    badge: "bg-gold-500 text-brand-900",
    priceText: "text-gold-300",
    label: "text-gold-300",
    body: "text-brand-50",
    divider: "border-white/20",
    button:
      "bg-gold-500 text-brand-900 hover:bg-gold-400 shadow-lg shadow-gold-600/20",
    tone: "gold" as const,
    ribbon: "特別クラス",
  },
  ex: {
    card: "border-silver-400/30 bg-graphite-800 text-white",
    accent: "text-silver-300",
    badge: "bg-silver-300 text-graphite-900",
    priceText: "text-white",
    label: "text-silver-300",
    body: "text-slate-100",
    divider: "border-white/20",
    button: "bg-white text-graphite-900 hover:bg-silver-300 shadow-lg",
    tone: "dark" as const,
    ribbon: "選抜クラス",
  },
  regular: {
    card: "border-brand-100 bg-white text-brand-900",
    accent: "text-accent-dark",
    badge: "bg-accent text-white",
    priceText: "text-brand-800",
    label: "text-slate-500",
    body: "text-slate-600",
    divider: "border-brand-100",
    button: "bg-accent text-white hover:bg-accent-dark",
    tone: "brand" as const,
    ribbon: null,
  },
  service: {
    card: "border-brand-100 bg-brand-50 text-brand-900",
    accent: "text-brand-600",
    badge: "bg-brand-700 text-white",
    priceText: "text-brand-800",
    label: "text-slate-500",
    body: "text-slate-600",
    divider: "border-brand-200",
    button: "bg-brand-800 text-white hover:bg-brand-700",
    tone: "brand" as const,
    ribbon: null,
  },
} as const;

export default function ClassCard({
  item,
  variant = "full",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: ClassCardProps) {
  const s = TIER_STYLE[item.tier];
  const isCompact = variant === "compact";
  const isPremium = item.tier === "vip" || item.tier === "ex";

  // 曜日・時間・対象・定員のいずれかが設定されている場合のみ詳細欄を表示する
  const hasScheduleDetails = Boolean(
    (item.schedule && item.schedule.length > 0) ||
    item.time ||
    item.frequency ||
    (item.target && item.target.length > 0) ||
    item.capacity,
  );

  return (
    <article
      id={item.slug}
      className={cn(
        "group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        s.card,
        isPremium && "shadow-lg",
      )}
    >
      {/* 画像（大きめに表示。下部に半透明の帯でクラス名） */}
      <div
        className={cn(
          "zoom-parent relative w-full overflow-hidden",
          isCompact ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        <SmartImage
          src={item.image}
          alt={`${item.name}のレッスン風景`}
          placeholderLabel={item.name}
          sizes={sizes}
          tone={s.tone}
        />

        {/* 特別クラスのリボン */}
        {s.ribbon && (
          <span
            className={cn(
              "absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide",
              s.badge,
            )}
          >
            {s.ribbon}
          </span>
        )}

        {/* 半透明の帯にクラス名 */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 pt-10 pb-3.5">
          <p className="font-display text-[10px] font-semibold tracking-[0.18em] text-white/70">
            {item.nameEn}
          </p>
          <h3 className="mt-0.5 text-xl font-bold text-white sm:text-2xl">
            {item.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* コンセプト */}
        {item.concept && (
          <p className={cn("text-sm leading-relaxed font-medium", s.body)}>
            {item.concept}
          </p>
        )}

        {/* 料金 */}
        <div className={cn("mt-4 border-t pt-4", s.divider)}>
          <p
            className={cn("text-[11px] font-semibold tracking-wider", s.label)}
          >
            料金
          </p>
          <p
            className={cn(
              "mt-1 text-2xl font-extrabold tracking-tight",
              s.priceText,
            )}
          >
            {item.priceLabel}
          </p>
          {item.priceNote && (
            <p className={cn("mt-1 text-xs", s.label)}>※{item.priceNote}</p>
          )}
        </div>

        {!isCompact && (
          <>
            {/* 詳細情報（該当する項目がある場合のみ表示） */}
            {hasScheduleDetails && (
              <dl
                className={cn(
                  "mt-4 space-y-3 border-t pt-4 text-sm",
                  s.divider,
                )}
              >
                {item.schedule && item.schedule.length > 0 && (
                  <DetailRow label="曜日・場所" styles={s}>
                    <ul className="space-y-0.5">
                      {item.schedule.map((sch, i) => (
                        <li key={i}>
                          <span className="font-semibold">{sch.day}</span>
                          {sch.place && (
                            <span className={cn("ml-2", s.body)}>
                              {sch.place}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </DetailRow>
                )}

                {item.time && (
                  <DetailRow label="時間" styles={s}>
                    {item.time}
                    {item.frequency && (
                      <span className="ml-2 font-normal">
                        （{item.frequency}）
                      </span>
                    )}
                  </DetailRow>
                )}

                {!item.time && item.frequency && (
                  <DetailRow label="開催" styles={s}>
                    {item.frequency}
                  </DetailRow>
                )}

                {item.target && item.target.length > 0 && (
                  <DetailRow label="対象" styles={s}>
                    {item.target.join(" / ")}
                  </DetailRow>
                )}

                {item.capacity && (
                  <DetailRow label="定員" styles={s}>
                    {item.capacity}
                    {item.capacityBreakdown && (
                      <span className={cn("ml-2 font-normal", s.body)}>
                        （{item.capacityBreakdown.join(" / ")}）
                      </span>
                    )}
                  </DetailRow>
                )}
              </dl>
            )}

            {/* 内容（箇条書き） */}
            {item.details && item.details.length > 0 && (
              <div className={cn("mt-4 border-t pt-4", s.divider)}>
                <p
                  className={cn(
                    "text-[11px] font-semibold tracking-wider",
                    s.label,
                  )}
                >
                  内容
                </p>
                <ul className="mt-2 space-y-1.5">
                  {item.details.map((d, i) => (
                    <li
                      key={i}
                      className={cn(
                        "flex gap-2 text-sm leading-relaxed",
                        s.body,
                      )}
                    >
                      <CheckIcon
                        className={cn("mt-0.5 h-4 w-4 shrink-0", s.accent)}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 補足説明 */}
            {item.description && (
              <p className={cn("mt-4 text-sm leading-relaxed", s.body)}>
                {item.description}
              </p>
            )}

            {/* 注意事項 */}
            {item.notes && item.notes.length > 0 && (
              <ul className="mt-4 space-y-1">
                {item.notes.map((n, i) => (
                  <li
                    key={i}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs leading-relaxed",
                      isPremium
                        ? "bg-white/15 text-white"
                        : "bg-amber-50 text-amber-900",
                    )}
                  >
                    ※ {n}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* 申し込みボタン（希望クラスを自動選択） */}
        <div className="mt-6 flex-1" />
        <Link
          href={isCompact ? `/classes#${item.slug}` : applyHref(item.name)}
          className={cn(
            "flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl text-[15px] font-bold transition-all active:scale-[0.99]",
            s.button,
          )}
        >
          {isCompact ? "詳しく見る" : `${item.name}を申し込む`}
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
        </Link>
      </div>
    </article>
  );
}

function DetailRow({
  label,
  children,
  styles,
}: {
  label: string;
  children: React.ReactNode;
  styles: (typeof TIER_STYLE)[keyof typeof TIER_STYLE];
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
      <dt
        className={cn(
          "shrink-0 text-[11px] font-semibold tracking-wider sm:w-20 sm:pt-0.5",
          styles.label,
        )}
      >
        {label}
      </dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}
