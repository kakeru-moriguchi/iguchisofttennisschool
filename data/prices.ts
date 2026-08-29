/**
 * 料金情報。
 *
 * 料金変更時は、このファイルだけを変更すればサイト全体に反映されます。
 * （料金表ページ・トップページの料金抜粋・クラスカードの表示）
 */

export type PriceKey = "kids" | "beginner" | "chujo" | "advanced";

export type PriceRow = {
  key: PriceKey;
  /** 表示名 */
  className: string;
  /** クラスページへのアンカー */
  classSlug: string;
  /** 月会費（円） */
  monthly: number;
  /** 単発（円 / 1回） */
  single: number;
  /** 回数券 4回分（円） */
  ticket4: number;
  /** 回数券 8回分（円） */
  ticket8: number;
};

/** 通常クラスの料金表 */
export const priceRows: PriceRow[] = [
  {
    key: "kids",
    className: "キッズ",
    classSlug: "kids",
    monthly: 5500,
    single: 1800,
    ticket4: 6500,
    ticket8: 12000,
  },
  {
    key: "beginner",
    className: "初中級",
    classSlug: "beginner",
    monthly: 9000,
    single: 2800,
    ticket4: 11000,
    ticket8: 19000,
  },
  {
    key: "chujo",
    className: "中上級",
    classSlug: "chujo",
    monthly: 11000,
    single: 3500,
    ticket4: 13000,
    ticket8: 24500,
  },
  {
    key: "advanced",
    className: "上級",
    classSlug: "advanced",
    monthly: 11000,
    single: 3500,
    ticket4: 13000,
    ticket8: 24500,
  },
];

/** 料金表の列定義（PC用テーブル・SP用カードで共用） */
export const priceColumns = [
  { key: "monthly", label: "月会費", note: "月4回" },
  { key: "single", label: "単発", note: "1回のみ" },
  { key: "ticket4", label: "回数券 4回分", note: "有効期限内に利用" },
  { key: "ticket8", label: "回数券 8回分", note: "有効期限内に利用" },
] as const satisfies readonly {
  key: keyof Pick<PriceRow, "monthly" | "single" | "ticket4" | "ticket8">;
  label: string;
  note: string;
}[];

export type SpecialPriceTier = "vip" | "ex" | "service";

export type SpecialPrice = {
  name: string;
  /** 料金の表示文字列 */
  price: string;
  /** 補足（別途費用など） */
  note?: string;
  /** 概要 */
  summary: string;
  /** クラスページへのリンク */
  href: string;
  tier: SpecialPriceTier;
};

/** 特別クラス・その他サービスの料金 */
export const specialPrices: SpecialPrice[] = [
  {
    name: "VIPクラス",
    price: "月額 60,000円",
    summary:
      "マンツーマン個別指導 月2回（各2時間）・動画分析 月4回・LINE相談24時間・スクール通い放題・試合帯同あり",
    note: "試合帯同については別途費用",
    href: "/classes#vip",
    tier: "vip",
  },
  {
    name: "EXクラス",
    price: "月額 40,000円",
    summary:
      "マンツーマン個別指導 月1回（1時間）・動画分析 月2回・LINE相談24時間・スクール週2回参加",
    href: "/classes#ex",
    tier: "ex",
  },
  {
    name: "講習会",
    price: "50,000円〜100,000円",
    summary: "土日祝・3〜6時間。学校・クラブ・団体からご依頼いただけます。",
    note: "交通費・宿泊費別途",
    href: "/classes#seminar",
    tier: "service",
  },
  {
    name: "プライベートクラス",
    price: "1クラス 1人 15,000円",
    summary: "金・土・日・祝の2時間、月2回開催。5人以上で開講できる貸切クラスです。",
    note: "交通費・コート代別途",
    href: "/classes#private",
    tier: "service",
  },
];

/** 料金に関する注意事項 */
export const priceNotes: string[] = [
  "表示価格はすべて税込です。",
  "月会費は月4回のレッスンを基本としています。",
  "回数券・単発でのご参加も可能です。まずはお気軽にご相談ください。",
  "上級クラスへのご参加には入会審査があります。",
  "講習会・プライベートクラスは、交通費・宿泊費・コート代が別途必要です。",
];

/** 金額を「5,500円」形式に整形 */
export function formatPrice(value: number): string {
  return `${value.toLocaleString("ja-JP")}円`;
}
