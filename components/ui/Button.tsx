import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-sky-brand text-white shadow-sm hover:bg-sky-brand-dark hover:shadow-md active:scale-[0.99]",
  secondary:
    "bg-navy-800 text-white shadow-sm hover:bg-navy-700 hover:shadow-md active:scale-[0.99]",
  outline:
    "border-2 border-navy-800 bg-white text-navy-800 hover:bg-navy-50 active:scale-[0.99]",
  ghost:
    "border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 active:scale-[0.99]",
  gold: "bg-gold-500 text-navy-900 shadow-sm hover:bg-gold-400 hover:shadow-md active:scale-[0.99]",
};

const SIZES: Record<Size, string> = {
  // タップ領域を確保（最低 44px）
  sm: "min-h-[44px] px-4 text-sm",
  md: "min-h-[48px] px-6 text-[15px]",
  lg: "min-h-[56px] px-8 text-base",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** 幅いっぱいに広げる（スマートフォンで使いやすくなります） */
  fullWidth?: boolean;
};

type LinkButtonProps = BaseProps & {
  href: string;
  type?: never;
  disabled?: never;
};

type NativeButtonProps = BaseProps & {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

function classesFor({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: BaseProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-wide transition-all duration-200",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className,
  );
}

/** リンクにもボタンにもなる共通ボタン */
export default function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children } = props;

  if ("href" in props && props.href) {
    const { href } = props;
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classesFor(props)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classesFor(props)}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as NativeButtonProps;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classesFor(props)}
    >
      {children}
    </button>
  );
}
