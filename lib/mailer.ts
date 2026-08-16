import type { ContactInput } from "@/lib/validation";

/**
 * お問い合わせメールの送信処理（サーバー側でのみ実行されます）。
 *
 * 送信先アドレスは環境変数 CONTACT_TO_EMAIL で管理し、
 * フロントエンドのコードには一切含めません。
 *
 * 送信方法は環境変数の設定に応じて自動的に選ばれます。
 *   1. RESEND_API_KEY があれば Resend の API を使用
 *   2. SMTP_HOST / SMTP_USER / SMTP_PASS があれば SMTP を使用
 *      （Gmail の場合はアプリパスワードを使用してください）
 */

const SUBJECT = "【イグチソフトテニススクール】ホームページからのお問い合わせ";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed"; detail?: string };

/** 送信日時を日本時間で整形する */
function formatJstNow(): string {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  return `${formatter.format(new Date())}（日本時間）`;
}

/** HTML に埋め込む文字列をエスケープする */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** メール本文に使う項目一覧を組み立てる */
function buildRows(data: ContactInput) {
  return [
    { label: "送信日時", value: formatJstNow() },
    { label: "お名前", value: data.name },
    { label: "フリガナ", value: data.nameKana },
    { label: "メールアドレス", value: data.email },
    { label: "電話番号", value: data.tel },
    { label: "学年・年齢", value: data.grade },
    { label: "ソフトテニス経験", value: data.experience },
    { label: "希望クラス", value: data.desiredClass },
    { label: "お問い合わせ内容", value: data.message },
  ];
}

/** テキスト形式の本文 */
function buildText(data: ContactInput): string {
  const rows = buildRows(data);
  const body = rows
    .map((r) => `■ ${r.label}\n${r.value}`)
    .join("\n\n");

  return [
    "ホームページのお問い合わせフォームから、以下の内容が送信されました。",
    "------------------------------------------------------------",
    body,
    "------------------------------------------------------------",
    "※このメールに直接返信すると、送信者のメールアドレス宛に返信できます。",
    "イグチソフトテニススクール ホームページ",
  ].join("\n\n");
}

/** HTML形式の本文 */
function buildHtml(data: ContactInput): string {
  const rows = buildRows(data);

  const cells = rows
    .map(
      (r) => `
        <tr>
          <th style="width:150px;padding:14px 16px;text-align:left;vertical-align:top;background:#f1f5f9;border-bottom:1px solid #e2e8f0;color:#0b2545;font-size:13px;font-weight:700;">
            ${escapeHtml(r.label)}
          </th>
          <td style="padding:14px 16px;vertical-align:top;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;line-height:1.8;white-space:pre-wrap;word-break:break-word;">
            ${escapeHtml(r.value)}
          </td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="ja">
<body style="margin:0;padding:24px 12px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Noto Sans JP',sans-serif;">
  <table role="presentation" style="max-width:640px;margin:0 auto;border-collapse:collapse;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
    <tr>
      <td style="padding:24px;background:#0b2545;">
        <p style="margin:0;color:#38bdf8;font-size:11px;letter-spacing:.18em;font-weight:700;">IGUCHI SOFT TENNIS SCHOOL</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:18px;font-weight:700;">ホームページからのお問い合わせ</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px 4px;">
        <p style="margin:0;color:#475569;font-size:13px;line-height:1.8;">
          ホームページのお問い合わせフォームから、以下の内容が送信されました。
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px 24px;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          ${cells}
        </table>
        <p style="margin:16px 0 0;color:#64748b;font-size:12px;line-height:1.8;">
          ※このメールに直接返信すると、送信者（${escapeHtml(data.email)}）宛に返信できます。
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Resend の API を使って送信 */
async function sendWithResend(
  to: string,
  from: string,
  data: ContactInput,
): Promise<SendResult> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: SUBJECT,
      html: buildHtml(data),
      text: buildText(data),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return { ok: false, reason: "send_failed", detail: detail.slice(0, 500) };
  }

  return { ok: true };
}

/** SMTP を使って送信（Gmail のアプリパスワードなど） */
async function sendWithSmtp(
  to: string,
  from: string,
  data: ContactInput,
): Promise<SendResult> {
  const nodemailer = (await import("nodemailer")).default;

  const port = Number(process.env.SMTP_PORT ?? 587);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465番ポートは SMTPS（暗黙のTLS）
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: SUBJECT,
    text: buildText(data),
    html: buildHtml(data),
  });

  return { ok: true };
}

/** お問い合わせ内容をメールで送信する */
export async function sendContactMail(
  data: ContactInput,
): Promise<SendResult> {
  const to = process.env.CONTACT_TO_EMAIL;

  if (!to) {
    console.error(
      "[contact] CONTACT_TO_EMAIL が設定されていません。.env.example を参照してください。",
    );
    return { ok: false, reason: "not_configured" };
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const from =
        process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
      return await sendWithResend(to, from, data);
    }

    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER;
      return await sendWithSmtp(to, from, data);
    }

    console.error(
      "[contact] メール送信の設定がありません。RESEND_API_KEY または SMTP_* を設定してください。",
    );
    return { ok: false, reason: "not_configured" };
  } catch (error) {
    console.error("[contact] メール送信に失敗しました:", error);
    return {
      ok: false,
      reason: "send_failed",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}
