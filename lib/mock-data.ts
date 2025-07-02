export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

export const mockNotes: Record<string, Note> = {
  '1': {
    id: '1',
    title: 'はじめに',
    content: `# MindNoteへようこそ

MindNoteは、[[Obsidian]]にインスパイアされたマークダウンメモアプリです。

## 主な機能

- マークダウン形式での記述
- [[ウィキリンク]]による相互接続
- #タグ による分類
- リアルタイムプレビュー

## コードブロックの例

\`\`\`javascript
function hello() {
  console.log("Hello, MindNote!");
}
\`\`\`

## 引用の例

> 知識は力なり - フランシス・ベーコン

#はじめに #チュートリアル`,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    isFavorite: true
  },
  '2': {
    id: '2',
    title: 'アイデア',
    content: `# 新しいアプリのアイデア

今日思いついた新しいアプリのアイデアをメモしておく。

## 概要

- ユーザーが日々の習慣を記録できるアプリ
- ゲーミフィケーション要素を取り入れる
- ソーシャル機能で友達と競争

## 必要な技術

1. **フロントエンド**: [[React Native]]
2. **バックエンド**: Node.js + Express
3. **データベース**: PostgreSQL

関連: [[習慣化の科学]] [[ゲーミフィケーション]]

#アイデア #アプリ開発 #習慣`,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    isFavorite: false
  },
  '3': {
    id: '3',
    title: 'TODOリスト',
    content: `# 今週のTODO

## 仕事
- [ ] プロジェクトAの設計書作成
- [x] ミーティング資料準備
- [ ] コードレビュー対応

## 個人
- [ ] [[読書リスト]]の本を1冊読む
- [ ] ジムに3回行く
- [x] 部屋の掃除

## 勉強
- [ ] TypeScriptの新機能について調べる
- [ ] [[React 18]]の新機能を試す

#TODO #今週 #タスク管理`,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
    isFavorite: true
  },
  '4': {
    id: '4',
    title: '議事録',
    content: `# 2024/01/15 定例会議

## 参加者
- 田中さん
- 佐藤さん
- 山田さん
- 自分

## アジェンダ

### 1. 先週の振り返り
- プロジェクトAが予定通り進行中
- バグ修正が完了

### 2. 今週の計画
- 新機能の実装開始
- テストケースの作成

### 3. 課題
- リソース不足の懸念あり
- 要スケジュール調整

## アクションアイテム
- [ ] 設計書の更新 (担当: 自分) - 1/17まで
- [ ] テスト環境の準備 (担当: 田中さん) - 1/18まで
- [ ] クライアントへの進捗報告 (担当: 佐藤さん) - 1/19まで

次回: 2024/01/22 10:00-

#議事録 #定例会議 #プロジェクトA`,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isFavorite: false
  },
  '5': {
    id: '5',
    title: 'Webアプリ開発',
    content: `# Webアプリ開発プロジェクト

## プロジェクト概要

新しいタスク管理Webアプリケーションの開発。

### 技術スタック

- **フロントエンド**
  - [[Next.js]] 14
  - [[TypeScript]]
  - [[Tailwind CSS]]
  - [[shadcn/ui]]

- **バックエンド**
  - [[Supabase]]
  - PostgreSQL
  - Edge Functions

### 機能要件

1. ユーザー認証
2. タスクのCRUD操作
3. カテゴリー管理
4. リアルタイム同期
5. ダークモード対応

### スケジュール

- **Phase 1** (1月): 基本設計・環境構築
- **Phase 2** (2月): 主要機能実装
- **Phase 3** (3月): テスト・リリース準備

### 参考リンク

- [設計ドキュメント](https://example.com/design)
- [GitHub リポジトリ](https://github.com/example/project)

#プロジェクト #Webアプリ #開発`,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-17'),
    isFavorite: true
  }
};