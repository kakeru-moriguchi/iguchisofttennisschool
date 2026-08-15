# イグチソフトテニススクール 公式ホームページ

宮崎県宮崎市のソフトテニススクール「イグチソフトテニススクール」の公式サイトです。
Next.js（App Router）／ TypeScript ／ Tailwind CSS で制作しています。

- 設計の詳細は [DESIGN.md](./DESIGN.md) をご覧ください。
- 写真の入れ替え方は [public/images/README.md](./public/images/README.md) をご覧ください。

---

## 1. 起動方法

```bash
npm install          # 初回のみ
cp .env.example .env.local   # 初回のみ（メール設定）
npm run dev          # http://localhost:3000 で確認
```

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用にビルド |
| `npm start` | ビルドしたサイトを起動 |
| `npm run typecheck` | 型チェック |

---

## 2. よくある更新作業

**コードを触らずに、下の表のファイルだけを書き換えれば更新できます。**

| やりたいこと | 編集するファイル |
|---|---|
| キャッチコピーを変える | `data/site.ts` の `catchCopy` |
| 料金を変える | `data/prices.ts` |
| クラスの曜日・場所・時間・定員を変える | `data/classes.ts` |
| クラスを追加する | `data/classes.ts` の `classes` に追加 |
| 講師のメッセージ・経歴を変える | `data/instructors.ts` |
| 講師を追加する | `data/instructors.ts` の `instructors` に追加 |
| スクール紹介の文章を変える | `data/school.ts` |
| 写真を差し替える | `public/images/` に同じファイル名で置くだけ |
| SNSリンク・会場名を変える | `data/site.ts` |

### 例：上級クラスの料金を変える

`data/prices.ts` の該当行を書き換えるだけで、
料金表ページ・トップページ・クラスカードのすべてに反映されます。

```ts
{
  key: "advanced",
  className: "上級",
  monthly: 11000,   // ← ここを変更
  single: 3500,
  ticket4: 13000,
  ticket8: 24500,
},
```

### 例：写真を入れ替える

`public/images/classes/vip.jpg` を新しい写真（同じファイル名）で
上書きするだけです。**コードの修正は不要です。**

写真をまだ用意していない場所には、自動で仮のプレースホルダーが表示されます。

---

## 3. お問い合わせメールの設定

お問い合わせフォームの内容は、環境変数で指定したメールアドレスに届きます。
**送信先アドレスはサーバー側でのみ使用され、公開されるコードには含まれません。**

`.env.local` に以下を設定してください（`.env.example` をコピーして作成）。

```bash
CONTACT_TO_EMAIL=iguchi0307@gmail.com
```

そのうえで、送信方法を **どちらか一方** 設定します。

### 方法1：Resend（推奨・Vercel へのデプロイ向き）

1. <https://resend.com> に登録して API キーを発行
2. `.env.local` に `RESEND_API_KEY=re_xxxxx` を設定
3. 独自ドメインを認証した場合は `CONTACT_FROM_EMAIL` も設定

### 方法2：SMTP（Gmail など）

1. Google アカウントで「2段階認証」を有効にする
2. <https://myaccount.google.com/apppasswords> で「アプリパスワード」を発行
3. `.env.local` に以下を設定

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=iguchi0307@gmail.com
SMTP_PASS=（発行した16桁のアプリパスワード）
```

> 通常のログインパスワードでは送信できません。必ずアプリパスワードを使用してください。

### 受信するメールの内容

件名：`【イグチソフトテニススクール】ホームページからのお問い合わせ`

本文には、送信日時／お名前／フリガナ／メールアドレス／電話番号／学年・年齢／
ソフトテニス経験／希望クラス／お問い合わせ内容が表形式で表示されます。
**メールにそのまま返信すると、お問い合わせされた方へ返信できます**（Reply-To 設定済み）。

### 迷惑メール・連続送信への対策

以下をサーバー側で実装しています。

- 必須項目・メールアドレス形式・文字数のチェック（フロントとサーバーの両方）
- ハニーポット（人間には見えない入力欄）による bot 判定
- フォーム表示から3秒未満での送信をブロック
- 同一IPから10分間に3件までのレート制限
- 送信中のローディング表示と二重送信防止

---

## 4. デプロイ

[Vercel](https://vercel.com) へのデプロイを推奨します。

1. このリポジトリを Vercel に接続
2. Vercel の管理画面 → Settings → Environment Variables に
   `CONTACT_TO_EMAIL` と `RESEND_API_KEY`（または `SMTP_*`）を登録
3. デプロイ

デプロイ後、`data/site.ts` の `url` を実際の公開URLに変更してください。
（OGP画像・sitemap.xml で使用します）

---

## 5. ページ構成

| URL | 内容 |
|---|---|
| `/` | トップページ |
| `/school` | スクール紹介 |
| `/classes` | クラス（全8クラス） |
| `/prices` | 料金表 |
| `/instructors` | 講師紹介 |
| `/contact` | お問い合わせ |

## 6. ディレクトリ構成

```
app/          ページとAPI（お問い合わせ送信）
components/   画面パーツ
  layout/     ヘッダー・フッター・スマホ用CTAバー
  sections/   ヒーロー・クラスカード・料金表・フォームなど
  ui/         ボタン・画像・見出しなどの共通部品
data/         ★ 内容の書き換えはここ（クラス・料金・講師・スクール紹介）
lib/          メール送信・入力チェック・迷惑メール対策
public/images/ ★ 写真はここに置く
```
