/** クラス名を結合するユーティリティ（falsy な値は除外） */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
