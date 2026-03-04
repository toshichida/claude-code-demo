# GitHub Actions ワークフロー設定ドキュメント

このドキュメントでは、`.github/workflows` 以下に定義されている GitHub Actions ワークフローの設定内容を説明します。

## 目次

- [claude.yml - Claude Code](#claudeyml---claude-code)
- [claude-code-review.yml - Claude Code Review](#claude-code-reviewyml---claude-code-review)
- [deploy.yml - Deploy to GitHub Pages](#deployyml---deploy-to-github-pages)

---

## claude.yml - Claude Code

**ファイル:** `.github/workflows/claude.yml`

### 概要

Issue やプルリクエストのコメントで `@claude` とメンションすることで、Claude AI に作業を依頼できるワークフローです。

### トリガー条件

以下のイベントが発生したときに実行されます：

| イベント | 条件 |
|---|---|
| `issue_comment` | コメントが新規作成されたとき |
| `pull_request_review_comment` | PRレビューコメントが新規作成されたとき |
| `issues` | Issueが新規作成またはアサインされたとき |
| `pull_request_review` | PRレビューが送信されたとき |

さらに、これらのイベントのうちコメント本文・Issue本文・タイトルに `@claude` が含まれている場合のみジョブが実行されます。

### 必要な権限

| 権限 | レベル |
|---|---|
| `contents` | read |
| `pull-requests` | read |
| `issues` | read |
| `id-token` | write |
| `actions` | read（CI結果の読み取りに使用） |

### 必要なシークレット

| シークレット名 | 説明 |
|---|---|
| `CLAUDE_CODE_OAUTH_TOKEN` | Claude Code の認証トークン |

### 使用方法

IssueやPRのコメントに `@claude` を含めてメンションするだけで、Claude が指示内容を解釈して作業を行います。

```
@claude このバグを修正してください
```

### カスタマイズ

`claude_args` パラメータを使用して Claude の動作をカスタマイズできます。また、`prompt` パラメータでデフォルトのプロンプトを上書きすることもできます。

---

## claude-code-review.yml - Claude Code Review

**ファイル:** `.github/workflows/claude-code-review.yml`

### 概要

プルリクエストが作成・更新されたときに、Claude AI が自動的にコードレビューを行うワークフローです。

### トリガー条件

以下のプルリクエストイベントで実行されます：

| イベントタイプ | 説明 |
|---|---|
| `opened` | PRが新規作成されたとき |
| `synchronize` | PRに新しいコミットがプッシュされたとき |
| `ready_for_review` | ドラフトPRがレビュー可能になったとき |
| `reopened` | クローズされたPRが再オープンされたとき |

### 必要な権限

| 権限 | レベル |
|---|---|
| `contents` | read |
| `pull-requests` | read |
| `issues` | read |
| `id-token` | write |

### 必要なシークレット

| シークレット名 | 説明 |
|---|---|
| `CLAUDE_CODE_OAUTH_TOKEN` | Claude Code の認証トークン |

### 動作

PR が作成・更新されると、Claude が自動的に変更内容を確認し、コードレビューのフィードバックをコメントします。`code-review` プラグインを使用してレビューを実行します。

### カスタマイズ

特定のユーザーのPRのみレビューするよう制限することもできます（設定ファイル内のコメントアウトされた `if` 条件を参照）：

```yaml
if: |
  github.event.pull_request.user.login == 'external-contributor' ||
  github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'
```

---

## deploy.yml - Deploy to GitHub Pages

**ファイル:** `.github/workflows/deploy.yml`

### 概要

`main` ブランチへのプッシュ時に、アプリケーションをビルドして GitHub Pages にデプロイするワークフローです。

### トリガー条件

| トリガー | 説明 |
|---|---|
| `push` (branches: main) | `main` ブランチにプッシュされたとき |
| `workflow_dispatch` | GitHub UI から手動で実行したとき |

### 必要な権限

| 権限 | レベル |
|---|---|
| `contents` | read |
| `pages` | write |
| `id-token` | write |

### 同時実行制御

`concurrency` 設定により、同じグループ（`pages`）で複数のデプロイが同時に実行されないよう制御されています。新しいデプロイが開始されると、進行中のデプロイはキャンセルされます。

### ジョブの流れ

```
push to main
    │
    ▼
┌─────────┐
│  build  │  Node.js 20 でビルド
│         │  - npm ci
│         │  - npm run build
│         │  - dist/ をアーティファクトとしてアップロード
└────┬────┘
     │
     ▼
┌──────────┐
│  deploy  │  GitHub Pages にデプロイ
│          │  - ビルドアーティファクトをデプロイ
└──────────┘
```

### ステップ詳細

**build ジョブ:**

1. リポジトリのチェックアウト（`actions/checkout@v4`）
2. Node.js 20 のセットアップ（npm キャッシュ有効）
3. 依存関係のインストール（`npm ci`）
4. ビルド実行（`npm run build`）
5. `dist/` ディレクトリをアーティファクトとしてアップロード

**deploy ジョブ:**

1. `build` ジョブの完了を待機
2. GitHub Pages へのデプロイ
3. デプロイ先の URL を出力

### デプロイ先

デプロイされたサイトの URL は GitHub Actions の実行結果から確認できます。また、リポジトリの Settings > Pages からも確認できます。
