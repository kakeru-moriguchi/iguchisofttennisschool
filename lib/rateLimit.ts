/**
 * 連続送信対策（レート制限）。
 *
 * 同一IPからの短時間の連続送信を制限します。
 * サーバーのメモリ上で管理する簡易的な実装のため、
 * サーバーが再起動すると記録はリセットされます。
 * （小規模サイトではこれで十分に機能します）
 */

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

/** 制限のしきい値 */
const WINDOW_MS = 10 * 60 * 1000; // 10分
const MAX_REQUESTS = 3; // 10分間に3件まで

/** 古い記録を掃除する（メモリが増え続けないように） */
function sweep(now: number) {
  if (store.size < 500) return;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** 次に送信できるようになるまでの秒数 */
  retryAfterSec: number;
};

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const entry = store.get(identifier);

  if (!entry || entry.resetAt <= now) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

/** リクエストから送信元IPを推定する */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "unknown"
  );
}
