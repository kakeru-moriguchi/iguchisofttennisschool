/**
 * 講師情報。
 *
 * 講師が増えた場合は、この配列にオブジェクトを追加するだけで
 * 講師紹介ページに反映されます。
 * メッセージ・経歴・写真も、このファイルの編集だけで変更できます。
 */

export type Instructor = {
  slug: string;
  /** 氏名 */
  name: string;
  /** ふりがな */
  nameKana: string;
  /** 英語表記 */
  nameEn: string;
  /** 肩書き */
  role: string;
  /** 写真パス（public/images/instructors/ 配下） */
  image: string;
  /** ひとこと紹介 */
  tagline: string;
  /** 経歴・戦績 */
  careers: string[];
  /** 得意分野 */
  specialties: string[];
  /** 講師からのメッセージ（段落ごとに配列を分けてください） */
  message: string[];
};

export const instructors: Instructor[] = [
  {
    slug: "iguchi-yusuke",
    name: "井口 雄介",
    nameKana: "いぐち ゆうすけ",
    nameEn: "YUSUKE IGUCHI",
    role: "代表 / ヘッドコーチ",
    image: "/images/instructors/iguchi-yusuke.jpg",
    tagline: "元ナショナルチーム 日本代表。宮崎から、次の世代へ。",
    careers: [
      "元ナショナルチーム 日本代表",
      "全日本アジア予選シングルス ベスト8",
      "全日本シングルス ベスト8",
      "全日本学生シングルス 2連覇",
      "2019茨城国体 準優勝",
      "全日本選手権大会 ベスト8",
      "九州選手権ダブルス 3連覇",
      "九州選手権シングルス 3連覇",
    ],
    specialties: ["バックハンド", "スマッシュ"],
    message: [
      "ソフトテニスは、正しい考え方と練習を積み重ねれば、必ず伸びるスポーツです。",
      "私自身が日本代表として世界を経験するなかで学んだのは、才能よりも「どう考えて練習するか」が結果を分けるということでした。イグチソフトテニススクールでは、一人ひとりの体格・レベル・目標に合わせて、その人に必要なことだけを伝えます。",
      "初めてラケットを握るお子さまも、全国を本気で目指す選手も大歓迎です。まずは一度、コートでお会いしましょう。",
    ],
  },
];

/** メイン講師（トップページで使用） */
export const mainInstructor = instructors[0];
