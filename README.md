# ニューロナのオフィシャルサイト

Github Pagesとの連動
https://neurona.jp/

## 必要な環境

- Node.js v24 LTS
- pnpm (パッケージマネージャー)

## Astroプロジェクトのセットアップ

### 1. Node.jsのバージョン設定

このプロジェクトはNode.js v24 LTSを使用します。`.nvmrc`ファイルが含まれているため、nvmを使用している場合は以下のコマンドで自動的に切り替わります：

```bash
nvm use
```

### 2. pnpmのインストール

pnpmがインストールされていない場合は、以下のコマンドでインストールしてください：

```bash
npm install -g pnpm
```

### 3. 依存パッケージのインストール

```bash
pnpm install
```

### 4. 開発サーバーの起動（Astro）

Astroの開発サーバーを起動します：

```bash
pnpm astro:dev
```

ブラウザで `http://localhost:4321` にアクセスして確認できます。

### 5. 本番ビルド（Astro）

```bash
pnpm astro:build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### 6. プレビュー（Astro）

ビルド後のファイルをプレビューする場合：

```bash
pnpm astro:preview
```

## 11ty（レガシー）の動かし方

既存の11tyプロジェクトも並行して動作します：

### npmパッケージをインストールする

```
pnpm install
```

### ローカルサーバーを立てて開発する

```
pnpm dev
```

### デプロイ用にビルドする

```
pnpm build
```

## プロジェクト構成

### Astroプロジェクト
- `astro-src/` - Astroのソースファイル
  - `pages/` - ページファイル（.astro）
  - `layouts/` - レイアウトコンポーネント
  - `components/` - 再利用可能なコンポーネント
  - `styles/` - グローバルCSSファイル
    - `main.css` - メインCSSファイル（Tailwind + カスタムスタイル）
    - `lightgallery-bundle.min.css` - ライトギャラリーCSS
- `public/` - 静的アセット
- `dist/` - Astroビルド出力（.gitignoreに含まれる）

### 11ty（レガシー）
- `src/` - 11tyのソースファイル
- `docs/` - 11tyビルド出力（.gitignoreに含まれる）

## CSS構成

このプロジェクトは **SCSS を廃止** し、**モダンなCSS + Tailwind CSS v3** の構成に移行しました。

### 主な特徴

- ✅ SCSS完全廃止（`_variables.scss`, `_base.scss`, `_mixins.scss` などを削除）
- ✅ モダンCSS機能を活用（CSSネスト、CSS変数、@layer）
- ✅ Tailwind CSS v4 への移行準備が整っています
- ✅ `astro-src/styles/main.css` で集中管理

### スタイルの読み込み

すべてのページで `RootLayout.astro` を通じて自動的にスタイルが読み込まれます：

```typescript
import '@/styles/main.css';
```

### カスタムスタイルの追加

カスタムコンポーネントスタイルは `main.css` の `@layer components` に追加してください：

```css
@layer components {
  .your-custom-class {
    /* スタイル定義 */
  }
}
```

## 技術スタック（Astro）

- **Astro** 5.x - 静的サイトジェネレーター
- **TypeScript** - 型安全な開発（strictモード有効）
- **Tailwind CSS** 3.x - ユーティリティファーストCSSフレームワーク
- **fetch API** - API通信（axiosは使用しない）
- **pnpm** - パッケージマネージャー

## API通信について

このプロジェクトでは、microCMSやその他の外部APIとの通信に**fetch API**を使用しています。axiosは使用していません。

例：
```typescript
const response = await fetch('https://api.example.com/data');
const data = await response.json();
```

## GitHubワークフロー

### Format

PR時にコード整形します

### Lint

PR時にリントしreviewdogがレポートします

### Preview

PR時にCloud Runでプレビュー環境を作成します

デフォルトではすべてのブランチで実行しない、かつ、 `env.PROJECT` が空欄なので、利用する場合はコメントアウトされているイベントトリガーに差し替え `env.PROJECT` を設定してください

## 注意事項

- 既存の11tyファイル（`.eleventy.js`等）は移行完了まで保持されます
- Tailwind CSS v4への新構文移行は別のIssueで対応予定です
- Node.js v24未満では動作しない可能性があります
