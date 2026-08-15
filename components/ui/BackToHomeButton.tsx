import Link from "next/link";

/**
 * 「トップページに戻る」ボタン。
 *
 * トップページ以外のすべてのページ下部に設置します。
 * デザインは全ページで統一され、スマートフォンでも押しやすいサイズです。
 * （ページ最上部へ戻るボタンではありません）
 */
export default function BackToHomeButton() {
  return (
    <div className="container-page py-12 md:py-16">
      <Link
        href="/"
        className="mx-auto flex min-h-[56px] w-full max-w-md items-center justify-center gap-2.5 rounded-xl border-2 border-navy-800 bg-white px-6 text-[15px] font-bold text-navy-800 transition-all duration-200 hover:bg-navy-800 hover:text-white active:scale-[0.99]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
        トップページに戻る
      </Link>
    </div>
  );
}
