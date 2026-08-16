import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";

type PageHeaderProps = {
  /** 英字の小見出し */
  eyebrow: string;
  /** h1 に入る見出し */
  title: string;
  description?: string;
  /** 背景写真（省略時はプレースホルダー） */
  image?: string;
  imageAlt?: string;
};

/** 下層ページ共通のページヘッダー */
export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800">
      {image && (
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src={image}
            alt={imageAlt ?? ""}
            placeholderLabel={title}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-navy-900/70" />
        </div>
      )}

      <div className="container-page py-12 md:py-20">
        {/* パンくず */}
        <nav aria-label="パンくずリスト">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-200">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-white">{title}</li>
          </ol>
        </nav>

        <p className="font-display mt-6 text-xs font-semibold tracking-[0.2em] text-sky-brand-light uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-navy-100 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
