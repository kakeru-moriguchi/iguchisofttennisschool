import { NextResponse } from "next/server";
import { sendContactMail } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { contactSchema } from "@/lib/validation";

/** nodemailer を使うため Node.js ランタイムで動かす */
export const runtime = "nodejs";
/** 常に動的実行（キャッシュしない） */
export const dynamic = "force-dynamic";

/** bot 判定：フォーム表示からこの時間未満での送信は弾く */
const MIN_ELAPSED_MS = 3000;

export async function POST(request: Request) {
  // ---- 連続送信対策（同一IPからの短時間の連投を制限） ----
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit(ip);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: `送信回数の上限に達しました。${Math.ceil(
          limit.retryAfterSec / 60,
        )}分ほど時間をおいてから、もう一度お試しください。`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  // ---- リクエストの解析 ----
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "送信データを読み取れませんでした。" },
      { status: 400 },
    );
  }

  // ---- サーバー側バリデーション ----
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "入力内容に誤りがあります。ご確認ください。",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // ---- 迷惑メール対策 ----
  // ハニーポット（人間には見えない項目）に入力があれば bot と判定。
  // bot に気づかれないよう、成功したように見せて送信はしない。
  if (data.formCode) {
    return NextResponse.json({ ok: true });
  }

  // フォーム表示から極端に短時間で送信された場合も bot と判定
  if (data.elapsedMs !== undefined && data.elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "送信が早すぎるようです。内容をご確認のうえ、もう一度送信してください。",
      },
      { status: 400 },
    );
  }

  // ---- メール送信 ----
  const result = await sendContactMail(data);

  if (!result.ok) {
    const message =
      result.reason === "not_configured"
        ? "現在フォームからの送信を受け付けられません。お手数ですが、しばらく経ってからお試しください。"
        : "送信に失敗しました。通信環境をご確認のうえ、もう一度お試しください。";

    return NextResponse.json({ ok: false, message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
