"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  /** プレースホルダーに表示するラベル（画像未配置のとき） */
  placeholderLabel?: string;
  /** レイアウト用のクラス（親要素は relative + サイズ指定が必要） */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** プレースホルダーの配色 */
  tone?: "brand" | "dark" | "gold";
};

/**
 * 画像を表示するコンポーネント。
 *
 * 画像ファイルがまだ用意されていない場合は、読み込み失敗を検知して
 * 自動的にプレースホルダーを表示します。
 * あとから同じパスに画像ファイルを置くだけで、そのまま差し替わります。
 *
 * 画像は常に object-cover で表示されるため、
 * 元画像の比率が違ってもレイアウトは崩れません。
 */
export default function SmartImage({
  src,
  alt,
  placeholderLabel,
  className,
  sizes = "100vw",
  priority = false,
  tone = "brand",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <PlaceholderVisual
        label={placeholderLabel ?? alt}
        tone={tone}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}

const TONES = {
  brand: {
    background:
      "linear-gradient(135deg, #112a0f 0%, #1b3c16 45%, #4a851a 100%)",
    text: "rgba(255,255,255,0.92)",
    sub: "rgba(255,255,255,0.55)",
  },
  dark: {
    background:
      "linear-gradient(135deg, #12181f 0%, #1c2430 55%, #2a3441 100%)",
    text: "rgba(255,255,255,0.9)",
    sub: "rgba(255,255,255,0.45)",
  },
  gold: {
    background:
      "linear-gradient(135deg, #0a0a0a 0%, #1a1710 55%, #a68a33 100%)",
    text: "rgba(255,255,255,0.92)",
    sub: "rgba(226,206,142,0.7)",
  },
} as const;

/** 画像が未配置のときに表示されるプレースホルダー */
function PlaceholderVisual({
  label,
  tone,
  className,
}: {
  label: string;
  tone: keyof typeof TONES;
  className?: string;
}) {
  const t = TONES[tone];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden",
        className,
      )}
      style={{ background: t.background }}
    >
      {/* コートのラインを模した装飾 */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="white" strokeWidth="2" fill="none">
          <rect x="40" y="40" width="320" height="220" />
          <line x1="40" y1="150" x2="360" y2="150" />
          <line x1="200" y1="40" x2="200" y2="260" />
          <rect x="100" y="90" width="200" height="120" />
        </g>
      </svg>

      <svg
        viewBox="0 0 24 24"
        className="relative h-9 w-9"
        fill="none"
        stroke={t.text}
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 8.5c4.5 1.2 7.9 4.6 9 9.2M20.4 8.5c-4.5 1.2-7.9 4.6-9 9.2" />
      </svg>

      <p
        className="relative px-4 text-center text-sm font-medium tracking-wide"
        style={{ color: t.text }}
      >
        {label}
      </p>
      <p
        className="relative text-[11px] tracking-widest"
        style={{ color: t.sub }}
      >
        PHOTO COMING SOON
      </p>
    </div>
  );
}
