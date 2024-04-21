# ニューロナのオフィシャルサイト

Github Pagesとの連動
https://neurona.jp/

## 動かし方

### npmパッケージをインストールする

```
$ pnpm
```

### ローカルサーバーを立てて開発する

```
$ pnpm dev
```

### デプロイ用にビルドする

```
$ pnpm build
```

## GitHubワークフロー

### Format

PR時にコード整形します

### Lint

PR時にリントしreviewdogがレポートします

### Preview

PR時にCloud Runでプレビュー環境を作成します

デフォルトではすべてのブランチで実行しない、かつ、 `env.PROJECT` が空欄なので、利用する場合はコメントアウトされているイベントトリガーに差し替え `env.PROJECT` を設定してください
