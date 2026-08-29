/**
 * クラス情報。
 *
 * クラスの追加・料金変更・曜日／場所変更・画像差し替えは
 * すべてこのファイルの編集だけで完結します。
 *
 * 画像は public/images/classes/ 配下に配置してください。
 * 画像が未配置の場合は自動でプレースホルダーが表示され、
 * 同じファイル名で画像を置くだけで差し替わります。
 */

/** デザインのバリアント */
export type ClassTier = "vip" | "ex" | "regular" | "service";

export type SchoolClass = {
  /** URL のアンカー等に使う識別子 */
  slug: string;
  /** クラス名（お問い合わせフォームの「希望クラス」と一致させています） */
  name: string;
  /** 英語表記（見出しの装飾用） */
  nameEn: string;
  /** デザインのバリアント */
  tier: ClassTier;
  /** 画像パス */
  image: string;
  /** 料金の表示文字列 */
  priceLabel: string;
  /** 料金の補足（別途費用など） */
  priceNote?: string;
  /** クラスのコンセプト（1文） */
  concept?: string;
  /** 曜日・場所（曜日ごとに会場が違う場合は複数行） */
  schedule?: { day: string; place?: string }[];
  /** 時間 */
  time?: string;
  /** 開催回数 */
  frequency?: string;
  /** 対象 */
  target?: string[];
  /** 定員 */
  capacity?: string;
  /** 定員の内訳 */
  capacityBreakdown?: string[];
  /** 注意事項 */
  notes?: string[];
  /** 内容（箇条書き） */
  details?: string[];
  /** 補足説明（文章） */
  description?: string;
  /** トップページに抜粋表示するか */
  featured?: boolean;
};

export const classes: SchoolClass[] = [
  {
    slug: "vip",
    name: "VIPクラス",
    nameEn: "VIP CLASS",
    tier: "vip",
    image: "/images/classes/vip.jpg",
    priceLabel: "月額 60,000円",
    priceNote: "試合帯同については別途費用",
    concept: "本気で「勝ち」にこだわり、トップレベルを目指す方へ",
    details: [
      "マンツーマン個別指導",
      "月2回 / 各2時間",
      "試合・練習の動画分析 月4回",
      "LINE相談 24時間受付",
      "スクール通い放題",
      "週4回＋振替参加OK",
      "試合帯同あり",
    ],
    notes: ["試合帯同については別途費用が発生します"],
    featured: true,
  },
  {
    slug: "ex",
    name: "EXクラス",
    nameEn: "EX CLASS",
    tier: "ex",
    image: "/images/classes/ex.jpg",
    priceLabel: "月額 40,000円",
    concept: "競技力を飛躍させ、上位進出を目指す選抜枠",
    details: [
      "マンツーマン個別指導",
      "月1回 / 1時間",
      "試合・練習の動画分析 月2回",
      "LINE相談 24時間受付",
      "スクール週2回参加",
    ],
    featured: true,
  },
  {
    slug: "chujo",
    name: "中上級クラス",
    nameEn: "INTERMEDIATE / ADVANCED",
    tier: "regular",
    image: "/images/classes/chujo.jpg",
    priceLabel: "月額 11,000円",
    concept: "基礎を固め、試合で戦える力を身につけるクラス",
    schedule: [{ day: "月曜日", place: "清武運動公園" }],
    time: "20:00〜22:00",
    frequency: "月4回",
    target: ["中学生以上", "中級者〜上級者"],
    capacity: "16名",
    capacityBreakdown: ["中級 8名", "上級 8名"],
    featured: true,
  },
  {
    slug: "advanced",
    name: "上級クラス",
    nameEn: "ADVANCED CLASS",
    tier: "regular",
    image: "/images/classes/advanced.jpg",
    priceLabel: "月額 11,000円",
    concept: "上位大会での勝利を狙う選手のための実戦クラス",
    schedule: [{ day: "火曜日", place: "生目の杜運動公園" }],
    time: "20:00〜22:00",
    frequency: "月4回",
    target: ["中学生以上", "上級者"],
    capacity: "16名",
    notes: ["入会審査あり"],
    featured: true,
  },
  {
    slug: "beginner",
    name: "初中級クラス",
    nameEn: "BEGINNER / INTERMEDIATE",
    tier: "regular",
    image: "/images/classes/beginner.jpg",
    priceLabel: "月額 9,000円",
    concept: "ラケットの握り方から。基礎をていねいに身につけるクラス",
    schedule: [
      { day: "水曜日", place: "清武運動公園" },
      { day: "木曜日", place: "生目の杜運動公園" },
    ],
    time: "20:00〜22:00",
    frequency: "月4回",
    target: ["中学生以上", "初心者〜中級者"],
    capacity: "20名",
    capacityBreakdown: ["初級 10名", "中級 10名"],
    featured: true,
  },
  {
    slug: "kids",
    name: "キッズクラス",
    nameEn: "KIDS CLASS",
    tier: "regular",
    image: "/images/classes/kids.jpg",
    priceLabel: "月額 5,500円",
    concept: "まずは「楽しい」から。ソフトテニスをはじめる子どもたちへ",
    schedule: [
      { day: "水曜日", place: "清武運動公園" },
      { day: "木曜日", place: "生目の杜運動公園" },
    ],
    time: "19:00〜20:00",
    frequency: "月4回",
    target: ["初心者"],
    capacity: "20名",
    featured: true,
  },
  {
    slug: "seminar",
    name: "講習会",
    nameEn: "SEMINAR",
    tier: "service",
    image: "/images/classes/seminar.jpg",
    priceLabel: "50,000円〜100,000円",
    priceNote: "交通費・宿泊費別途",
    concept: "学校・クラブ・団体からご依頼いただける出張講習会",
    schedule: [{ day: "土日祝" }],
    time: "3〜6時間",
    target: ["小学生以上"],
    description:
      "バックハンドやシングルスなど、さまざまな井口流の考え方を伝える講習会です。学校・クラブ・団体などからご依頼いただけます。内容・時間はご相談のうえ調整いたします。",
    notes: ["交通費・宿泊費は別途申し受けます"],
  },
  {
    slug: "private",
    name: "プライベートクラス",
    nameEn: "PRIVATE CLASS",
    tier: "service",
    image: "/images/classes/private.jpg",
    priceLabel: "1クラス 1人 15,000円",
    priceNote: "交通費・コート代別途",
    concept: "気心の知れた仲間だけで受けられる貸切レッスン",
    schedule: [{ day: "金曜日" }, { day: "土曜日" }, { day: "日曜日" }, { day: "祝日" }],
    time: "2時間（開催可能時間 9:00〜20:00）",
    frequency: "月2回開催",
    target: ["全年齢"],
    capacity: "5人以上で開講",
    description:
      "知らない人と一緒にレッスンを受けることが苦手な方向けのクラスです。同じ学校の友達や知人などをお誘いいただき、5人以上で開講できます。",
    notes: ["5人以上でのお申し込みが条件です", "交通費・コート代は別途申し受けます"],
  },
];

/** 特別クラス（VIP / EX） */
export const specialClasses = classes.filter(
  (c) => c.tier === "vip" || c.tier === "ex",
);

/** 通常クラス */
export const regularClasses = classes.filter((c) => c.tier === "regular");

/** その他サービス（講習会・プライベート） */
export const serviceClasses = classes.filter((c) => c.tier === "service");

/** お問い合わせフォームの「希望クラス」選択肢 */
export const classOptions = [
  ...classes.map((c) => c.name),
  "まだ決めていない / 相談したい",
];

export function getClassBySlug(slug: string): SchoolClass | undefined {
  return classes.find((c) => c.slug === slug);
}
