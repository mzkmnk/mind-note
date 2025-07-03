export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  folderId?: string;
}

export const mockNotes: Note[] = [
  {
    id: "welcome",
    title: "はじめに",
    content: `# MindNoteへようこそ

MindNoteは、Obsidianにインスパイアされたマークダウンメモアプリです。
アイデアを整理し、知識を体系化し、創造的な思考を促進します。

## 主な機能

- ✨ リアルタイムマークダウンプレビュー
- 🔗 ウィキリンク記法でノート間を接続
- 🕸️ グラフビューで知識の関係性を可視化
- 🏷️ タグ機能で整理整頓
- 🔍 高速な全文検索
- ☁️ クラウド同期でどこからでもアクセス

## はじめ方

1. サイドバーの「+」ボタンをクリックして新しいノートを作成
2. マークダウン形式で自由に記述
3. \`[ノート名](/notes/ノート名)\` でノート間をリンク
4. \`#タグ\` でノートを分類

:::message
💡 **ヒント**: Ctrl+K（Mac: Cmd+K）でクイック検索を開き、素早くノート間を移動できます。
:::`,
    createdAt: new Date('2024-01-15T09:00:00Z'),
    updatedAt: new Date('2024-01-15T09:00:00Z'),
    tags: ['重要', 'ガイド'],
    folderId: 'welcome'
  },
  {
    id: "quickstart",
    title: "クイックスタート",
    content: `# クイックスタート

MindNoteをすぐに使い始めるための簡単なガイドです。

## ステップ1: 最初のノートを作成

1. サイドバーの **「+」ボタン** をクリック
2. ノートのタイトルを入力
3. マークダウン形式で内容を記述

## ステップ2: リンクでノートを繋げる

\`[ノート名](/notes/ノート名)\` の形式でノート間をリンクできます。

例: [はじめに](/notes/welcome) や [プロジェクト計画](/notes/project-planning)

## ステップ3: タグで整理

\`#タグ名\` でノートを分類できます。

例: #アイデア #TODO #プロジェクト

## ステップ4: マークダウン記法を活用

### 見出し
\`# 大見出し\`
\`## 中見出し\`
\`### 小見出し\`

### リスト
- 箇条書き
- [ ] チェックボックス
- [x] 完了したタスク

### 強調
**太字** や *斜体* で重要な部分を強調

### コード
\`inline code\` や

\`\`\`javascript
// コードブロック
console.log('Hello, MindNote!');
\`\`\`

で技術的な内容も整理できます。`,
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-16T14:20:00Z'),
    tags: ['ガイド', 'マークダウン'],
    folderId: 'welcome'
  },
  {
    id: "project-ideas",
    title: "アイデア",
    content: `# プロジェクトアイデア集

新しいプロジェクトのアイデアをまとめています。

## Webアプリケーション

### 1. タスク管理アプリ
- [ ] ユーザー認証機能
- [ ] プロジェクト管理
- [ ] チーム共有機能
- [ ] 進捗可視化

**技術スタック候補**
- フロントエンド: React, Next.js
- バックエンド: Node.js, Express
- データベース: PostgreSQL
- デプロイ: Vercel

### 2. 学習管理システム
オンライン学習プラットフォームのアイデア。

**主要機能**
- 動画コンテンツ配信
- 進捗トラッキング
- クイズ・テスト機能
- 証明書発行

## モバイルアプリ

### 習慣トラッカー
日々の習慣を記録・分析するアプリ。

**特徴**
- シンプルなUI/UX
- 統計・グラフ表示
- リマインダー機能
- データエクスポート

## 参考リンク
- [技術調査メモ](/notes/tech-research)
- [競合分析](/notes/competitive-analysis)

:::message
関連タグ: #アイデア #プロジェクト #TODO
:::`,
    createdAt: new Date('2024-01-20T16:45:00Z'),
    updatedAt: new Date('2024-01-25T11:30:00Z'),
    tags: ['アイデア', 'プロジェクト'],
    folderId: 'memo'
  },
  {
    id: "todo-list",
    title: "TODOリスト",
    content: `# 今週のTODO

## 🔥 緊急・重要

- [x] プレゼン資料の作成
- [x] クライアントとの打ち合わせ準備
- [ ] 月次レポートの提出
- [ ] バグ修正 (#123, #124)

## 📋 重要・非緊急

- [ ] 新機能の設計書作成
- [ ] チームメンバーの1on1実施
- [ ] 技術書の読書（週3章目標）
- [ ] ブログ記事の執筆

## ⚡ 緊急・非重要

- [x] メールの返信
- [ ] 会議室の予約
- [ ] 備品の注文

## 📚 非緊急・非重要

- [ ] 新しいツールの調査
- [ ] 勉強会への参加申し込み
- [ ] サイドプロジェクトの企画

---

## 完了したタスク（今週）

- [x] 週次ミーティングの司会
- [x] コードレビューの実施
- [x] テストケースの追加
- [x] CI/CDパイプラインの改善

## 来週以降

- [ ] 新メンバーのオンボーディング計画
- [ ] 四半期目標の見直し
- [ ] チーム行事の企画

## 関連ノート
- [プロジェクト管理](/notes/project-management)
- [時間管理のコツ](/notes/time-management-tips)

:::message
関連タグ: #TODO #管理 #プロジェクト
:::`,
    createdAt: new Date('2024-01-22T08:15:00Z'),
    updatedAt: new Date('2024-01-26T17:45:00Z'),
    tags: ['TODO', '管理'],
    folderId: 'memo'
  },
  {
    id: "meeting-notes",
    title: "議事録",
    content: `# プロジェクト定例会議 議事録

**日時**: 2024年1月25日（木）14:00-15:00  
**参加者**: 田中（PM）、佐藤（開発）、山田（デザイン）、鈴木（QA）  
**議題**: Sprint 12の振り返りとSprint 13の計画

## 📋 アジェンダ

1. Sprint 12の振り返り
2. Sprint 13の計画
3. リスク管理
4. その他

## 🔍 Sprint 12 振り返り

### 完了した項目
- ✅ ユーザー認証機能
- ✅ プロフィール編集機能
- ✅ パスワードリセット機能
- ✅ 単体テストの追加

### 未完了項目
- ❌ 管理者ダッシュボード（50%完了）
- ❌ 通知機能（技術的課題により延期）

### KPT振り返り

#### Keep（良かったこと）
- コードレビューの品質が向上
- テストカバレッジが90%を達成
- チーム間のコミュニケーションが活発

#### Problem（課題）
- 要件の変更が多く、スケジュールに影響
- 外部APIの仕様変更への対応が遅れた

#### Try（次に試すこと）
- 要件定義の段階でより詳細な調査を実施
- 外部依存の監視体制を強化

## 📅 Sprint 13 計画

### 優先度高
1. 管理者ダッシュボードの完了
2. 通知機能の代替案実装
3. パフォーマンス改善

### 優先度中
1. モバイル対応の改善
2. ログ機能の追加
3. ヘルプドキュメントの更新

### リソース配分
- 開発: 3人（佐藤、新メンバー2名）
- デザイン: 1人（山田）
- QA: 1人（鈴木）

## ⚠️ リスクと対策

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|----------|------|
| 外部API停止 | 高 | 中 | フォールバック機能の実装 |
| 新メンバーの習熟度 | 中 | 高 | メンタリング体制の強化 |
| サーバー負荷増加 | 中 | 中 | 負荷テストの実施 |

## 📝 アクションアイテム

- [ ] 管理者ダッシュボードの技術調査（佐藤、1/26まで）
- [ ] 通知機能の代替案検討（田中、1/27まで）
- [ ] 新メンバーのオンボーディング計画（全員、1/29まで）
- [ ] 負荷テスト計画書作成（鈴木、2/1まで）

## 次回会議

**日程**: 2024年2月1日（木）14:00-15:00  
**場所**: 会議室A / オンライン併用

## 関連ドキュメント
- [プロジェクト計画](/notes/project-planning)
- [Sprint管理](/notes/sprint-management)

:::message
関連タグ: #議事録 #プロジェクト #管理
:::`,
    createdAt: new Date('2024-01-25T15:30:00Z'),
    updatedAt: new Date('2024-01-25T15:30:00Z'),
    tags: ['議事録', 'プロジェクト'],
    folderId: 'memo'
  },
  {
    id: "web-app-dev",
    title: "Webアプリ開発",
    content: `# Webアプリケーション開発ガイド

現代的なWebアプリケーション開発のベストプラクティスをまとめています。

## 🏗️ アーキテクチャ設計

### フロントエンド
- **React + Next.js**: モダンなReactフレームワーク
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: ユーティリティファーストCSS
- **Zustand**: 軽量な状態管理

### バックエンド
- **Node.js + Express**: 高速なAPIサーバー
- **PostgreSQL**: 信頼性の高いRDB
- **Redis**: キャッシュとセッション管理
- **Docker**: コンテナ化とデプロイ

## 🧪 開発手法

### テスト駆動開発（TDD）
1. **Red**: 失敗するテストを書く
2. **Green**: テストを通す最小限のコードを実装
3. **Refactor**: コードを改善

### テストピラミッド
- **Unit Tests**: コンポーネント・関数レベル
- **Integration Tests**: APIエンドポイント
- **E2E Tests**: ユーザーシナリオ

## 📦 プロジェクト構成

\`\`\`
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   ├── tests/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   └── middleware/
│   ├── tests/
│   └── package.json
└── docker-compose.yml
\`\`\`

## 🚀 CI/CD パイプライン

### GitHub Actions設定例
\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test:ci
      - name: Build
        run: npm run build
\`\`\`

## 🔧 開発ツール

### 必須ツール
- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマット
- **Husky**: Git フック
- **Jest**: テストフレームワーク

### 推奨ツール
- **Storybook**: コンポーネント開発
- **Figma**: デザインシステム
- **Postman**: API テスト

## 📚 学習リソース

### 書籍
- Clean Code (Robert C. Martin)
- Refactoring (Martin Fowler)
- Design Patterns (Gang of Four)

### オンライン
- [MDN Web Docs](https://developer.mozilla.org/)
- [React公式ドキュメント](https://react.dev/)
- [Next.js公式ガイド](https://nextjs.org/docs)

## 関連リソース
- [技術スタック比較](/notes/tech-stack-comparison)
- [パフォーマンス最適化](/notes/performance-optimization)

:::message
関連タグ: #プロジェクト #開発 #ガイド
:::`,
    createdAt: new Date('2024-01-18T13:20:00Z'),
    updatedAt: new Date('2024-01-24T16:15:00Z'),
    tags: ['プロジェクト', '開発'],
    folderId: 'project'
  },
  {
    id: "zenn-markdown-test",
    title: "Zenn Markdown テスト",
    content: `# Zenn Markdown 機能テスト

Zennの公式markdownパッケージのテストページです。

## 基本的なMarkdown

### 見出し
- # 見出し1
- ## 見出し2  
- ### 見出し3

### リスト
- 箇条書きリスト
- [ ] チェックボックス（未完了）
- [x] チェックボックス（完了）

### 強調とリンク
**太字**、*イタリック*、~~取り消し線~~

[外部リンク](https://zenn.dev)

## コードブロック

### JavaScript
\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
  return \`こんにちは、\${name}さん！\`;
}

hello('Zenn');
\`\`\`

### TypeScript
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Taro Yamada',
  email: 'taro@example.com'
};
\`\`\`

### Python
\`\`\`python
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

print(calculate_fibonacci(10))
\`\`\`

## 表（テーブル）

| 項目 | 説明 | 優先度 |
|------|------|--------|
| React | フロントエンドライブラリ | 高 |
| Next.js | Reactフレームワーク | 高 |
| TypeScript | 型安全な JavaScript | 中 |
| Tailwind CSS | ユーティリティCSS | 中 |

## 引用

> これはZennの公式markdownパッケージのテストです。
> 
> 複数行の引用も正しく表示されるかテストしています。

## 水平線

---

## インラインコード

\`npm install zenn-markdown-html\` でZennのmarkdownパッケージをインストールできます。

変数 \`userName\` や関数 \`getUserInfo()\` などのコードを文中に含めることができます。

## 数式 (KaTeX)

インライン数式: $E = mc^2$

ブロック数式:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## 脚注

これは脚注のテストです[^1]。

複数の脚注も使用できます[^2]。

[^1]: これは最初の脚注です。
[^2]: これは2番目の脚注です。

## まとめ

このテストページでZennの公式markdownパッケージが正しく動作していることを確認できます。

- シンタックスハイライト
- 表の表示
- 数式レンダリング
- 脚注機能
- その他のMarkdown機能

すべて正常に表示されていれば、統合は成功です！

## 関連ガイド
- [マークダウン記法ガイド](/notes/markdown-guide)
- [Zenn執筆Tips](/notes/zenn-writing-tips)

:::message
関連タグ: #test #zenn #markdown
:::`,
    createdAt: new Date('2024-01-26T10:00:00Z'),
    updatedAt: new Date('2024-01-26T10:00:00Z'),
    tags: ['test', 'zenn', 'markdown'],
    folderId: 'memo'
  },
  {
    id: "blog-article",
    title: "ブログ記事",
    content: `# ブログ記事アイデアと下書き

技術ブログやSNSで発信するコンテンツのアイデアをまとめています。

## 📝 記事アイデア

### React関連
1. **useEffectの適切な使い方**
   - useEffectのアンチパターン
   - パフォーマンスへの影響
   - 代替手段の紹介

2. **TypeScriptのジェネリクス入門**
   - 基本的な使い方
   - 実践的な活用例
   - 型推論の理解

3. **Next.js App Routerの移行ガイド**
   - Pages RouterからApp Routerへ
   - ベストプラクティス
   - パフォーマンス比較

### 開発手法
1. **TDD（テスト駆動開発）のススメ**
   - TDDのメリット・デメリット
   - 実際の開発フロー
   - チーム導入のコツ

2. **コードレビューの効果的な進め方**
   - レビューのポイント
   - 建設的なフィードバック
   - ツール活用法

## 📋 執筆予定

### 高優先度
- [ ] 「useEffectを使わないReact開発」（80%完了）
- [ ] 「TypeScript型安全なAPI設計」（企画中）

### 中優先度
- [ ] 「フロントエンド開発の最新トレンド2024」
- [ ] 「チーム開発でのGit運用ベストプラクティス」

### 低優先度
- [ ] 「個人開発におけるツール選定」
- [ ] 「エンジニア向け英語学習法」

## ✍️ 下書き: useEffectを使わないReact開発

### 概要
React開発でuseEffectを多用することのデメリットと、より良い代替手段について解説する記事。

### 目次案
1. useEffectの問題点
   - パフォーマンスへの影響
   - デバッグの困難さ
   - メンテナンス性の低下

2. 代替手段の紹介
   - useMemoによる派生値の計算
   - イベントハンドラーでの直接処理
   - カスタムフックでの抽象化

3. 実践例
   - データフェッチング
   - フォームバリデーション
   - 条件付きレンダリング

4. まとめ
   - 適切な使い分け
   - パフォーマンス向上のコツ

### 参考資料
- React公式ドキュメント
- Dan Abramovのブログ記事
- 海外の技術記事

### 公開予定
**媒体**: Zenn / Qiita  
**公開予定日**: 2024年2月15日  
**想定文字数**: 3,000-4,000字

## 📊 記事分析

### 過去の人気記事
1. 「Next.js 13入門ガイド」- 1,200 view
2. 「TypeScript Tips集」- 800 view
3. 「CSS Grid完全ガイド」- 650 view

### 改善点
- タイトルをより具体的に
- 実践的なコード例を増やす
- 図解・画像を効果的に活用

## 関連記事
- [技術調査メモ](/notes/tech-research)
- [SNS発信戦略](/notes/sns-strategy)

:::message
関連タグ: #ブログ #執筆 #技術発信
:::`,
    createdAt: new Date('2024-01-21T19:30:00Z'),
    updatedAt: new Date('2024-01-26T20:15:00Z'),
    tags: ['ブログ', '執筆'],
    folderId: 'project'
  }
];

// ノートをIDで検索する関数
export const findNoteById = (id: string): Note | undefined => {
  return mockNotes.find(note => note.id === id);
};

// フォルダごとのノートを取得する関数
export const getNotesByFolder = (folderId: string): Note[] => {
  return mockNotes.filter(note => note.folderId === folderId);
};

// タグでノートを検索する関数
export const getNotesByTag = (tag: string): Note[] => {
  return mockNotes.filter(note => note.tags.includes(tag));
};

// 全てのタグを取得する関数
export const getAllTags = (): { name: string; count: number }[] => {
  const tagCounts = mockNotes.reduce<Record<string, number>>((acc, note) => {
    note.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};