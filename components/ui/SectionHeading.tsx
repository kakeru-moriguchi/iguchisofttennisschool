import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** 英字の小見出し */
  eyebrow?: string;
  /** 日本語の見出し本体 */
  title: ReactNode;
  /** 補足文 */
  description?: ReactNode;
  /** 見出しレベル（SEOのため階層を正しく指定してください） */
  as?: "h2" | "h3";
  align?: "left" | "center";
  /** 濃色背景の上で使う場合 */
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-display text-xs font-semibold tracking-[0.2em] uppercase",
            isDark ? "text-sky-brand-light" : "text-sky-brand-dark",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "mt-2 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl",
          isDark ? "text-white" : "text-navy-800",
        )}
      >
        {title}
      </Tag>
      {description && (
        <div
          className={cn(
            "mt-4 text-[15px] leading-relaxed sm:text-base",
            isDark ? "text-navy-100" : "text-slate-600",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
