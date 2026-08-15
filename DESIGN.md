# イグチソフトテニススクール 公式サイト 設計書

制作目的：**初めてスクールを知った方（主に保護者・選手）が、スマートフォンから
「特徴 → クラス → 料金 → 講師」を確認し、そのまま問い合わせ・申込みへ進めること。**

---

## 1. サイトマップ

```
/                 トップページ（スクール全体の概要が1ページで分かる）
├── /school       スクール紹介（理念・指導方針・特徴・フォトギャラリー）
├── /classes      クラス（全8クラス）
├── /prices       料金表（月会費・単発・回数券・特別クラス）
├── /instructors  講師紹介（井口 雄介）
└── /contact      お問い合わせ（フォーム）
     └── /contact/thanks  送信完了（二重送信防止のため画面切替で対応）

補助: /sitemap.xml  /robots.txt  /icon.svg（favicon）  /opengraph-image
```

グローバルメニューは5項目のみ。「スタッフ」表記は使用せず、すべて **講師紹介** に統一。

| 表示名 | URL |
|---|---|
| スクール紹介 | `/school` |
| クラス | `/classes` |
| 料金表 | `/prices` |
| 講師紹介 | `/instructors` |
| お問い合わせ | `/contact` |

- **PC**：ヘッダーに横並び ＋ 右端に「お問い合わせ」ボタン（塗り）
- **SP**：ハンバーガーメニュー（全画面ドロワー、タップ領域 56px 以上）
- **SP下部**：常時表示のスティッキーCTAバー（「クラスを見る」「お問い合わせ」）

---

## 2. 各ページの構成

### /school スクール紹介
1. ページヘッダー（写真背景 + h1「スクール紹介」）
2. 理念（MISSION）— 大きめの一文 + 本文
3. 指導方針（POLICY）— 3本柱をカード表示
4. スクールの特徴（FEATURES）— 6項目（初心者指導／競技力向上／試合で勝つ考え方／楽しく継続できる環境／一人ひとりに合わせた指導／実績ある指導者）
5. フォトギャラリー（練習風景・指導風景・試合・大会・集合写真）
6. CTAセクション
7. トップページに戻るボタン

### /classes クラス
1. ページヘッダー
2. **特別クラス**（VIP / EX）— 専用の高級感デザインで大きく2枚
3. **通常クラス**（中上級・上級・初中級・キッズ）— カードグリッド
4. **その他サービス**（講習会・プライベートクラス）— カードグリッド
5. 料金表への導線
6. CTAセクション ／ トップページに戻るボタン

各カードから「このクラスを申し込む」→ `/contact?class=VIPクラス` へ遷移し、希望クラスを自動選択。

### /prices 料金表
1. ページヘッダー
2. 通常クラス料金（PC：月会費／単発／4回券／8回券の比較表、SP：クラス別カード）
3. 特別クラス・その他料金（VIP / EX / 講習会 / プライベート）
4. 料金に関する注意事項
5. CTAセクション ／ トップページに戻るボタン

### /instructors 講師紹介
1. ページヘッダー
2. 講師カード（PC：左＝写真／右＝名前・経歴・得意分野・メッセージ、SP：縦積み）
3. CTAセクション ／ トップページに戻るボタン

### /contact お問い合わせ
1. ページヘッダー
2. 連絡先情報（メール・SNS・所在地）
3. フォーム（9項目 + 同意）
4. 送信完了メッセージ（同一画面で切替、二重送信防止）
5. トップページに戻るボタン

---

## 3. トップページの構成

| 順 | セクション | 内容 |
|---|---|---|
| 1 | ファーストビュー | 全画面級の迫力ある写真 + `IGUCHI SOFT TENNIS SCHOOL` / イグチソフトテニススクール + キャッチコピー + CTA3つ（クラスを見る／料金を見る／お問い合わせ） |
| 2 | スクール紹介 | 理念抜粋 + 特徴3点 + 「詳しく見る」 |
| 3 | クラス紹介 | 8クラスの抜粋カード（画像＋クラス名＋料金）＋「すべてのクラスを見る」 |
| 4 | 料金案内 | 代表的な月会費を一覧 + 「料金表を見る」 |
| 5 | 講師紹介 | 井口雄介の写真 + 主要経歴 + 「講師紹介を見る」 |
| 6 | お問い合わせCTA | 大きなCTAブロック |
| 7 | フッター | ナビ・連絡先・SNS・コピーライト |

キャッチコピーは `data/site.ts` の `catchCopy` を書き換えるだけで変更可能。

---

## 4. デザインコンセプト

**「スポーティー × 爽やか × 本格派 × 信頼感」**

| 役割 | 色 | 用途 |
|---|---|---|
| ベース | `#FFFFFF` / `#F5F8FC` | 背景 |
| メイン（濃紺） | `#0B2545` | ヘッダー・見出し・フッター |
| ブルー | `#12467F` | 準見出し・境界 |
| アクセント（明るいブルー） | `#0EA5E9` | ボタン・リンク・強調 |
| VIP | `#0A0A0A` + ゴールド `#C8A94B` | VIPクラス専用 |
| EX | `#1C2430` + シルバー `#9AA7B4` | EXクラス専用 |
| テキスト | `#0F172A` / `#4B5563` | 本文 |

- 写真を主役に。画像は常に `object-fit: cover` ＋固定アスペクト比で比率崩れを防止
- 見出しは英字（Outfit）＋日本語（Noto Sans JP）の2段組み
- 角丸は控えめ（`rounded-xl` 中心）、影は薄く、線で締める
- アニメーションは控えめ：スクロールフェードイン／画像の軽いズーム／カード・ボタンのホバー
- `prefers-reduced-motion` に対応

---

## 5. ディレクトリ構成

```
.
├── app/
│   ├── layout.tsx              共通レイアウト・メタデータ・フォント
│   ├── page.tsx                トップページ
│   ├── globals.css             Tailwind + テーマトークン
│   ├── icon.svg                favicon
│   ├── opengraph-image.tsx     OGP画像（動的生成）
│   ├── sitemap.ts / robots.ts  SEO
│   ├── school/page.tsx
│   ├── classes/page.tsx
│   ├── prices/page.tsx
│   ├── instructors/page.tsx
│   ├── contact/page.tsx
│   └── api/contact/route.ts    メール送信API（サーバー側）
├── components/
│   ├── layout/   Header, Footer, MobileCtaBar
│   ├── ui/       Button, SmartImage, Reveal, SectionHeading, BackToHomeButton
│   └── sections/ Hero, ClassCard, PriceTable, PriceCard, InstructorCard,
│                 ContactForm, CTASection ...
├── data/         site.ts, classes.ts, prices.ts, instructors.ts, school.ts
├── lib/          mailer.ts, validation.ts, rateLimit.ts, utils.ts
├── public/images/
│   ├── hero.jpg
│   ├── classes/{vip,ex,chujo,advanced,beginner,kids,seminar,private}.jpg
│   ├── school/{practice,coaching,match,tournament,group}.jpg
│   └── instructors/iguchi-yusuke.jpg
├── .env.example
└── README.md
```

---

## 6. コンポーネント構成

| コンポーネント | 役割 |
|---|---|
| `Header` | PC横並びナビ／SPハンバーガー |
| `Footer` | サイトナビ・連絡先・SNS |
| `MobileCtaBar` | SP下部固定CTA |
| `Hero` | ファーストビュー |
| `ClassCard` | 画像＋クラス名＋料金＋詳細＋申込ボタン（通常／VIP／EXでバリアント切替） |
| `PriceTable` | PC用比較表（月会費・単発・4回券・8回券） |
| `PriceCard` | SP用クラス別料金カード／特別クラス料金カード |
| `InstructorCard` | PC左右分割・SP縦積み |
| `ContactForm` | バリデーション・送信・完了表示 |
| `BackToHomeButton` | 「トップページに戻る」（全ページ下部・統一デザイン） |
| `CTASection` | 問い合わせ導線ブロック |
| `SmartImage` | 画像が無い場合に自動でプレースホルダー表示 |
| `Reveal` | スクロールフェードイン |
| `SectionHeading` | 英字＋日本語の見出し |

---

## 7. クラスデータ構造（`data/classes.ts`）

```ts
export type ClassTier = "vip" | "ex" | "regular" | "service";

export type SchoolClass = {
  slug: string;              // "vip"
  name: string;              // "VIPクラス"
  tier: ClassTier;           // デザインのバリアント
  image: string;             // "/images/classes/vip.jpg"
  priceLabel: string;        // "月額 60,000円"
  priceNote?: string;        // "試合帯同については別途費用"
  concept?: string;          // コンセプト文
  schedule?: { days: string[]; time: string; frequency: string };
  places?: string[];         // ["清武運動公園"]
  target?: string[];         // ["中学生以上", "中級者〜上級者"]
  capacity?: { total: string; breakdown?: string[] };
  notes?: string[];          // ["大会審査あり"]
  details: string[];         // 箇条書きの内容
  description?: string;      // 補足説明
  featured?: boolean;        // トップページ掲載
};
```

クラス追加・料金変更・曜日／場所変更・画像差し替えは **このファイルの編集のみ** で完結。

## 8. 料金データ構造（`data/prices.ts`）

```ts
export type PriceRow = {
  key: "kids" | "beginner" | "chujo" | "advanced";
  className: string;        // "キッズ"
  monthly: number;          // 5500
  single: number;           // 1800
  ticket4: number;          // 6500
  ticket8: number;          // 12000
};

export type SpecialPrice = {
  name: string;             // "VIPクラス"
  price: string;            // "月額 60,000円"
  note?: string;            // "交通費・宿泊費別途"
  href: string;             // "/classes#vip"
  tier: "vip" | "ex" | "service";
};
```

料金表・トップページの料金抜粋・クラスカードの表示はすべてこの1ファイルを参照。

## 9. 講師データ構造（`data/instructors.ts`）

```ts
export type Instructor = {
  slug: string;
  name: string;             // "井口 雄介"
  nameEn: string;           // "Yusuke Iguchi"
  role: string;             // "代表 / ヘッドコーチ"
  image: string;            // "/images/instructors/iguchi-yusuke.jpg"
  careers: string[];        // 経歴8項目
  specialties: string[];    // ["バックハンド", "スマッシュ"]
  message: string;          // 講師メッセージ（後から変更可）
};
```

配列に追加するだけで講師を増やせる設計。

---

## 10. お問い合わせメール送信方法

```
[ブラウザ] ContactForm
   ↓ POST /api/contact （JSON）
[サーバー] app/api/contact/route.ts（Node.js runtime）
   ├ サーバー側バリデーション（必須・形式・文字数）
   ├ ハニーポット & 送信時間チェック（bot対策）
   ├ IP単位のレート制限（10分間に3件まで）
   └ lib/mailer.ts で送信
        ├ RESEND_API_KEY があれば Resend API
        └ SMTP_* があれば SMTP（Gmailアプリパスワード等）
   ↓
[受信] CONTACT_TO_EMAIL（= iguchi0307@gmail.com）
```

- **送信先アドレスはフロントエンドに一切書かない。** 環境変数 `CONTACT_TO_EMAIL` で管理
- 件名：`【イグチソフトテニススクール】ホームページからのお問い合わせ`
- 本文（HTML + テキスト両方）に、送信日時／お名前／フリガナ／メール／電話／学年・年齢／経験／希望クラス／内容を整形して表示
- `Reply-To` に送信者のメールアドレスを設定し、そのまま返信可能
- `.env.example` に必要な変数を明記

## 11. スマートフォンUI

- **モバイルファースト**で実装（Tailwindのブレークポイントは上書き方式）
- ナビ：ハンバーガー → 全画面ドロワー、項目高さ 56px
- 下部スティッキーCTA（クラス／お問い合わせ）
- クラス：1列、画像は 4:3 で大きく表示
- 料金：横長テーブルを表示せず、**クラス別カード**に切替（`md:` 以上でテーブル）
- フォーム：入力欄 高さ48px以上、フォントサイズ16px（iOSの自動ズーム防止）、
  `inputMode` / `autoComplete` 最適化
- ボタン・リンクのタップ領域は最低 44×44px

## 12. 画像管理方法

- すべての画像パスは `data/*.ts` で指定（コンポーネント側に直書きしない）
- 配置場所は `public/images/` 配下（クラスは `public/images/classes/`）
- **画像が未配置でもレイアウトが崩れない**：`SmartImage` が読み込み失敗を検知して
  クラス名入りのグラデーションプレースホルダーを自動表示。あとから同じファイル名で
  画像を置くだけで自動的に差し替わる
- すべて `next/image` 経由で最適化（`object-fit: cover` ＋ アスペクト比固定）
- 推奨サイズ：ヒーロー 1920×1080 / クラス 1200×900 / 講師 1000×1250 / ギャラリー 1200×900

---

## 技術要件

Next.js (App Router) / TypeScript / Tailwind CSS / next/image による最適化 /
メタデータ・OGP・favicon・sitemap・robots・JSON-LD（LocalBusiness）対応 /
SEOキーワード：宮崎 ソフトテニス、宮崎 ソフトテニススクール、ソフトテニス 教室 宮崎、宮崎 ソフトテニス レッスン
