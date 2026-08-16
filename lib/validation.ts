import { z } from "zod";

/**
 * お問い合わせフォームのバリデーション定義。
 * クライアント側とサーバー側の両方で同じスキーマを使用します。
 * （サーバー側でも必ず検証するため、フロントの改ざんでは突破できません）
 */

/** 各項目の最大文字数 */
export const MAX = {
  name: 50,
  nameKana: 50,
  email: 120,
  tel: 20,
  grade: 40,
  experience: 60,
  desiredClass: 60,
  message: 2000,
} as const;

/**
 * 必須の文字列項目。
 * 値が未入力でも、項目自体が送られてこなかった場合でも、
 * 同じ日本語のメッセージが表示されるようにしています。
 */
const required = (message: string) =>
  z.string({ error: message }).trim().min(1, message);

export const contactSchema = z.object({
  name: required("お名前を入力してください").max(
    MAX.name,
    `お名前は${MAX.name}文字以内で入力してください`,
  ),

  nameKana: required("フリガナを入力してください")
    .max(MAX.nameKana, `フリガナは${MAX.nameKana}文字以内で入力してください`)
    .regex(
      /^[ァ-ヶーー\s　ァ-ヴｦ-ﾟ]+$/,
      "フリガナはカタカナで入力してください",
    ),

  email: required("メールアドレスを入力してください")
    .max(MAX.email, `メールアドレスは${MAX.email}文字以内で入力してください`)
    .email("メールアドレスの形式が正しくありません"),

  tel: required("電話番号を入力してください")
    .max(MAX.tel, `電話番号は${MAX.tel}文字以内で入力してください`)
    .regex(
      /^[0-9０-９\-ー－\s()（）+]+$/,
      "電話番号は数字とハイフンで入力してください",
    )
    .refine(
      (v) => (v.match(/[0-9０-９]/g) ?? []).length >= 10,
      "電話番号は10桁以上で入力してください",
    ),

  grade: required("学年・年齢を入力してください").max(
    MAX.grade,
    `学年・年齢は${MAX.grade}文字以内で入力してください`,
  ),

  experience: required("ソフトテニス経験を選択してください").max(
    MAX.experience,
    `ソフトテニス経験は${MAX.experience}文字以内で入力してください`,
  ),

  desiredClass: required("希望クラスを選択してください").max(
    MAX.desiredClass,
    `希望クラスは${MAX.desiredClass}文字以内で入力してください`,
  ),

  message: required("お問い合わせ内容を入力してください")
    .min(10, "お問い合わせ内容を10文字以上で入力してください")
    .max(
      MAX.message,
      `お問い合わせ内容は${MAX.message}文字以内で入力してください`,
    ),

  /**
   * 迷惑メール対策（ハニーポット）。
   * 人間には見えない項目なので、入力されていたら bot と判定します。
   * ここでは形式エラーにせず受け取り、送信処理側で判定します
   * （bot にハニーポットの存在を気づかせないため）。
   * ブラウザの自動入力が働かないよう、意味を持たない項目名にしています。
   */
  formCode: z.string().max(200).optional().default(""),

  /** 迷惑メール対策：フォーム表示からの経過ミリ秒 */
  elapsedMs: z.number().int().nonnegative().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** フォームの入力値（クライアント側の state 用） */
export type ContactFormValues = {
  name: string;
  nameKana: string;
  email: string;
  tel: string;
  grade: string;
  experience: string;
  desiredClass: string;
  message: string;
  formCode: string;
};

export const emptyForm: ContactFormValues = {
  name: "",
  nameKana: "",
  email: "",
  tel: "",
  grade: "",
  experience: "",
  desiredClass: "",
  message: "",
  formCode: "",
};

/** ソフトテニス経験の選択肢 */
export const experienceOptions = [
  "未経験・初心者",
  "1年未満",
  "1〜3年",
  "3〜5年",
  "5年以上",
  "現在部活動などで競技中",
] as const;

/** 項目のラベル（メール本文とエラー表示で共用） */
export const fieldLabels: Record<keyof ContactFormValues, string> = {
  name: "お名前",
  nameKana: "フリガナ",
  email: "メールアドレス",
  tel: "電話番号",
  grade: "学年・年齢",
  experience: "ソフトテニス経験",
  desiredClass: "希望クラス",
  message: "お問い合わせ内容",
  formCode: "",
};

/**
 * クライアント側で1項目だけ検証する。
 * 入力欄から離れたタイミングでのエラー表示に使用します。
 */
export function validateField(
  field: keyof ContactFormValues,
  value: string,
): string | null {
  if (field === "formCode") return null;

  const shape = contactSchema.shape[field];
  const result = shape.safeParse(value);
  if (result.success) return null;
  return result.error.issues[0]?.message ?? "入力内容を確認してください";
}
