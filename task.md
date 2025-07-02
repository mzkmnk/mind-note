# Obsidianライクマークダウンメモアプリ 実装計画書

## プロジェクト概要

Next.js + TypeScript + Tailwind CSSを使用して、Obsidianのようなマークダウン形式でメモを作成・管理できるWebアプリケーションを開発する。

## 現在の環境

### フロントエンド
- **フレームワーク**: Next.js 13.5.1 (App Router)
- **言語**: TypeScript 5.2.2
- **スタイリング**: Tailwind CSS 3.3.3
- **ランタイム**: Node.js
- **ブランチ**: cursor/document-implementation-plan-for-markdown-notes-03b4

### バックエンド
- **API**: Hono (軽量高速Web フレームワーク)
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **デプロイ**: Vercel (Edge Functions)
- **ORM**: Drizzle ORM (TypeScript-first)

## 機能要件

### 1. 基本機能
- [ ] ユーザー登録・ログイン・ログアウト
- [ ] マークダウンファイルの作成・編集・削除
- [ ] リアルタイムプレビュー機能
- [ ] ファイル一覧表示（サイドバー）
- [ ] 検索機能
- [ ] ダークモード対応
- [ ] ユーザーごとのデータ分離

### 2. Obsidian風機能
- [ ] ウィキリンク記法（[[ファイル名]]）
- [ ] バックリンク表示
- [ ] グラフビュー（ノード間の関係性可視化）
- [ ] タグ機能（#tag）
- [ ] フォルダ階層管理

### 3. 高度な機能
- [ ] クラウドでのデータ永続化・同期
- [ ] エクスポート機能（MD、HTML、PDF）
- [ ] インポート機能
- [ ] ショートカットキー対応
- [ ] 全文検索
- [ ] リアルタイム共同編集
- [ ] 共有機能（読み取り専用リンク）
- [ ] バージョン履歴管理

## 技術設計

### 1. アーキテクチャ

#### フロントエンド構造
```
app/
├── components/           # 再利用可能なコンポーネント
│   ├── auth/            # 認証関連
│   ├── editor/          # エディタ関連
│   ├── sidebar/         # サイドバー関連
│   ├── preview/         # プレビュー関連
│   └── ui/              # UI基本コンポーネント
├── hooks/               # カスタムフック
├── lib/                 # ユーティリティ・ライブラリ
│   ├── supabase.ts      # Supabase クライアント
│   ├── auth.ts          # 認証ヘルパー
│   └── api.ts           # API クライアント
├── stores/              # 状態管理
├── types/               # TypeScript型定義
└── (pages)/             # ページコンポーネント
    ├── auth/            # 認証ページ
    ├── editor/          # エディタページ
    └── graph/           # グラフビューページ
```

#### バックエンド構造
```
api/
├── routes/              # API ルート
│   ├── auth.ts          # 認証関連API
│   ├── notes.ts         # ノート関連API
│   ├── folders.ts       # フォルダ関連API
│   ├── search.ts        # 検索API
│   └── share.ts         # 共有機能API
├── middleware/          # ミドルウェア
│   ├── auth.ts          # 認証ミドルウェア
│   ├── cors.ts          # CORS設定
│   └── logger.ts        # ログ
├── db/                  # データベース関連
│   ├── schema.ts        # Drizzle スキーマ定義
│   ├── migrations/      # マイグレーションファイル
│   └── connection.ts    # DB接続設定
├── services/            # ビジネスロジック
│   ├── noteService.ts   # ノート操作
│   ├── searchService.ts # 検索機能
│   └── linkService.ts   # リンク解析
└── utils/               # ユーティリティ
    ├── markdown.ts      # Markdown解析
    ├── validation.ts    # バリデーション
    └── encryption.ts    # 暗号化
```

### 2. 必要な追加パッケージ

#### フロントエンド
```json
{
  "dependencies": {
    "react-markdown": "^8.0.7",           // Markdown レンダリング
    "remark-gfm": "^3.0.1",               // GitHub Flavored Markdown
    "remark-wiki-link": "^1.0.5",         // ウィキリンク対応
    "rehype-highlight": "^6.0.0",         // シンタックスハイライト
    "react-split-pane": "^0.1.92",        // 分割レイアウト
    "fuse.js": "^6.6.2",                  // 高速検索
    "zustand": "^4.4.1",                  // 軽量状態管理
    "lucide-react": "^0.279.0",           // アイコン
    "cmdk": "^0.2.0",                     // コマンドパレット
    "react-hotkeys-hook": "^4.4.1",       // ショートカット
    "d3": "^7.8.5",                       // グラフ可視化
    "@types/d3": "^7.4.0",                // D3型定義
    "@supabase/supabase-js": "^2.38.0",   // Supabase クライアント
    "@supabase/auth-helpers-nextjs": "^0.8.7", // Next.js認証ヘルパー
    "@supabase/auth-helpers-react": "^0.4.2",  // React認証ヘルパー
    "react-hook-form": "^7.47.0",         // フォーム管理
    "@hookform/resolvers": "^3.3.2",      // バリデーション
    "zod": "^3.22.4"                      // スキーマバリデーション
  }
}
```

#### バックエンド
```json
{
  "dependencies": {
    "hono": "^3.9.0",                     // Web フレームワーク
    "@hono/zod-validator": "^0.1.8",      // バリデーション
    "drizzle-orm": "^0.29.0",             // ORM
    "drizzle-kit": "^0.20.4",             // マイグレーションツール
    "postgres": "^3.4.3",                // PostgreSQL ドライバー
    "@supabase/supabase-js": "^2.38.0",   // Supabase サーバークライアント
    "jose": "^5.1.0",                     // JWT処理
    "bcryptjs": "^2.4.3",                 // パスワードハッシュ化
    "@types/bcryptjs": "^2.4.6",          // bcrypt型定義
    "zod": "^3.22.4",                     // スキーマバリデーション
    "winston": "^3.11.0",                 // ログ
    "cors": "^2.8.5",                     // CORS
    "@types/cors": "^2.8.17"              // CORS型定義
  }
}
```

### 3. データベーススキーマ

#### Drizzle ORM スキーマ定義

```typescript
// db/schema.ts
import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ユーザーテーブル
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}));

// ワークスペーステーブル
export const workspaces = pgTable('workspaces', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isPublic: boolean('is_public').default(false).notNull(),
}, (table) => ({
  ownerIdx: index('workspaces_owner_idx').on(table.ownerId),
}));

// フォルダテーブル
export const folders = pgTable('folders', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  path: text('path').notNull(),
  parentId: uuid('parent_id').references(() => folders.id),
  workspaceId: uuid('workspace_id').references(() => workspaces.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  color: varchar('color', { length: 7 }), // HEXカラー
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  pathIdx: index('folders_path_idx').on(table.path),
  userWorkspaceIdx: index('folders_user_workspace_idx').on(table.userId, table.workspaceId),
}));

// ノートテーブル
export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 500 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'), // 検索用の抜粋
  slug: varchar('slug', { length: 500 }),
  folderId: uuid('folder_id').references(() => folders.id),
  workspaceId: uuid('workspace_id').references(() => workspaces.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  tags: jsonb('tags').$type<string[]>().default([]),
  metadata: jsonb('metadata').$type<Record<string, any>>().default({}),
  isPublished: boolean('is_published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  version: varchar('version', { length: 50 }).default('1.0.0').notNull(),
}, (table) => ({
  titleIdx: index('notes_title_idx').on(table.title),
  userWorkspaceIdx: index('notes_user_workspace_idx').on(table.userId, table.workspaceId),
  tagsIdx: index('notes_tags_idx').on(table.tags),
  slugIdx: index('notes_slug_idx').on(table.slug),
}));

// ノート間リンクテーブル
export const noteLinks = pgTable('note_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  sourceNoteId: uuid('source_note_id').references(() => notes.id).notNull(),
  targetNoteId: uuid('target_note_id').references(() => notes.id).notNull(),
  linkType: varchar('link_type', { length: 50 }).default('wiki').notNull(), // wiki, mention, reference
  linkText: text('link_text'), // リンクのテキスト
  contextBefore: text('context_before'), // リンク前のコンテキスト
  contextAfter: text('context_after'), // リンク後のコンテキスト
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  sourceTargetIdx: index('note_links_source_target_idx').on(table.sourceNoteId, table.targetNoteId),
  targetIdx: index('note_links_target_idx').on(table.targetNoteId),
}));

// ノート履歴テーブル
export const noteVersions = pgTable('note_versions', {
  id: uuid('id').primaryKey().defaultRandom(),
  noteId: uuid('note_id').references(() => notes.id).notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  content: text('content').notNull(),
  version: varchar('version', { length: 50 }).notNull(),
  changeType: varchar('change_type', { length: 50 }).notNull(), // create, update, delete
  changeDescription: text('change_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
}, (table) => ({
  noteVersionIdx: index('note_versions_note_version_idx').on(table.noteId, table.version),
}));

// 共有設定テーブル
export const shareSettings = pgTable('share_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  noteId: uuid('note_id').references(() => notes.id).notNull(),
  shareToken: varchar('share_token', { length: 255 }).notNull().unique(),
  isPublic: boolean('is_public').default(false).notNull(),
  allowComments: boolean('allow_comments').default(false).notNull(),
  expiresAt: timestamp('expires_at'),
  password: varchar('password', { length: 255 }), // ハッシュ化されたパスワード
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
}, (table) => ({
  tokenIdx: index('share_settings_token_idx').on(table.shareToken),
  noteIdx: index('share_settings_note_idx').on(table.noteId),
}));

// ワークスペースメンバーテーブル
export const workspaceMembers = pgTable('workspace_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').references(() => workspaces.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: varchar('role', { length: 50 }).default('member').notNull(), // owner, admin, member, viewer
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  invitedBy: uuid('invited_by').references(() => users.id),
}, (table) => ({
  workspaceUserIdx: index('workspace_members_workspace_user_idx').on(table.workspaceId, table.userId),
}));

// リレーション定義
export const usersRelations = relations(users, ({ many }) => ({
  workspaces: many(workspaces),
  notes: many(notes),
  folders: many(folders),
  workspaceMembers: many(workspaceMembers),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, { fields: [workspaces.ownerId], references: [users.id] }),
  notes: many(notes),
  folders: many(folders),
  members: many(workspaceMembers),
}));

export const foldersRelations = relations(folders, ({ one, many }) => ({
  parent: one(folders, { fields: [folders.parentId], references: [folders.id] }),
  children: many(folders),
  notes: many(notes),
  workspace: one(workspaces, { fields: [folders.workspaceId], references: [workspaces.id] }),
  user: one(users, { fields: [folders.userId], references: [users.id] }),
}));

export const notesRelations = relations(notes, ({ one, many }) => ({
  folder: one(folders, { fields: [notes.folderId], references: [folders.id] }),
  workspace: one(workspaces, { fields: [notes.workspaceId], references: [workspaces.id] }),
  user: one(users, { fields: [notes.userId], references: [users.id] }),
  outgoingLinks: many(noteLinks, { relationName: 'sourceLinks' }),
  incomingLinks: many(noteLinks, { relationName: 'targetLinks' }),
  versions: many(noteVersions),
  shareSettings: many(shareSettings),
}));

export const noteLinksRelations = relations(noteLinks, ({ one }) => ({
  sourceNote: one(notes, { fields: [noteLinks.sourceNoteId], references: [notes.id], relationName: 'sourceLinks' }),
  targetNote: one(notes, { fields: [noteLinks.targetNoteId], references: [notes.id], relationName: 'targetLinks' }),
}));
```

#### TypeScript 型定義

```typescript
// types/index.ts
export type User = {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type Workspace = {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
};

export type Folder = {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  workspaceId: string;
  userId: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
  children?: (Folder | Note)[];
};

export type Note = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  folderId?: string;
  workspaceId: string;
  userId: string;
  tags: string[];
  metadata: Record<string, any>;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  links?: NoteLink[];
  backlinks?: NoteLink[];
};

export type NoteLink = {
  id: string;
  sourceNoteId: string;
  targetNoteId: string;
  linkType: 'wiki' | 'mention' | 'reference';
  linkText?: string;
  contextBefore?: string;
  contextAfter?: string;
  createdAt: Date;
};

export type ShareSetting = {
  id: string;
  noteId: string;
  shareToken: string;
  isPublic: boolean;
  allowComments: boolean;
  expiresAt?: Date;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type WorkspaceMember = {
  id: string;
  workspaceId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
  invitedBy?: string;
};
```

## 実装フェーズ

### Phase 1: 基盤構築（Week 1）
1. **プロジェクト初期設定**
   - 必要パッケージのインストール
   - 基本的なディレクトリ構造作成
   - TypeScript型定義

2. **バックエンド基盤**
   - Supabase プロジェクト作成・設定
   - Drizzle ORM スキーマ定義
   - データベースマイグレーション実行
   - Hono API セットアップ

3. **認証システム**
   - Supabase Auth 設定
   - JWT トークン検証ミドルウェア
   - 認証状態管理（Zustand）
   - ログイン・サインアップページ

4. **レイアウト実装**
   - サイドバー + メインエリアのレイアウト
   - レスポンシブ対応
   - ダークモード切り替え

5. **状態管理セットアップ**
   - Zustandストア作成
   - ノート管理ストア
   - UI状態管理ストア
   - 認証ストア

### Phase 2: 基本機能実装（Week 2）
1. **API エンドポイント実装**
   - ノートCRUD API（Hono）
   - フォルダ管理 API
   - ワークスペース管理 API
   - 認証ミドルウェア統合

2. **マークダウンエディタ**
   - テキストエディタコンポーネント
   - リアルタイムプレビュー
   - 分割表示切り替え
   - 自動保存機能

3. **ファイル管理**
   - ノート作成・削除機能
   - サイドバーでのファイル一覧
   - クラウドデータベース連携
   - フォルダ階層表示

4. **基本的な検索機能**
   - タイトル検索
   - 簡単なフィルタリング
   - PostgreSQL 全文検索

### Phase 3: Obsidian風機能実装（Week 3）
1. **ウィキリンク機能**
   - [[記法]]の解析
   - ノート間リンク生成
   - 存在しないノートの自動作成提案

2. **バックリンク表示**
   - 各ノートへの参照一覧
   - リンク関係の双方向管理

3. **タグ機能**
   - #tag記法の解析
   - タグベースのフィルタリング
   - タグクラウド表示

### Phase 4: 高度な機能実装（Week 4）
1. **グラフビュー**
   - D3.jsを使用したノード関係図
   - インタラクティブな操作
   - フィルタリング機能

2. **全文検索**
   - Fuse.jsを使用した高速検索
   - ハイライト表示
   - 検索結果のランキング

3. **エクスポート・インポート**
   - Markdown形式でのエクスポート
   - 複数ファイルの一括処理

### Phase 5: UX改善・最適化（Week 5）
1. **ショートカットキー**
   - 一般的なエディタショートカット
   - 独自のナビゲーションキー

2. **パフォーマンス最適化**
   - 大量ファイル処理の最適化
   - 検索パフォーマンス向上
   - レンダリング最適化

3. **UI/UX改善**
   - アニメーション追加
   - ローディング状態改善
   - エラーハンドリング強化

## 開発方針・プロセス

### 1. テスト駆動開発（TDD）の採用

本プロジェクトでは、**テスト駆動開発（Test-Driven Development, TDD）** を基本的な開発手法として採用します。TDDは「動作するきれいなコード」を目標とし、高品質なソフトウェアの継続的な開発を可能にします。

#### TDDの基本サイクル（Red-Green-Refactor）

```
1. Red（失敗するテストを書く）
   ↓
2. Green（テストを通すための最小限のコードを書く）
   ↓
3. Refactor（動作を維持しながらコードを改善する）
   ↓
   繰り返し
```

#### 1.1 TDD実践のメリット

- **即座のフィードバック**: 変更による影響を素早く検知
- **リファクタリングの安全性**: テストがあることで安心してコード改善が可能
- **設計の改善**: テストしやすいコードは自然と良い設計になる
- **ドキュメント効果**: テストコードが仕様書の役割を果たす
- **デバッグ時間の短縮**: 問題の早期発見により修正コストを削減
- **開発速度の向上**: 長期的には開発とメンテナンスが効率化

#### 1.2 プロジェクトでのTDD適用指針

##### フロントエンド（Next.js + TypeScript）
```typescript
// Jest + React Testing Library を使用

// 例: コンポーネントのテスト
import { render, screen } from '@testing-library/react';
import { NoteEditor } from '@/components/editor/NoteEditor';

describe('NoteEditor', () => {
  it('should render empty editor initially', () => {
    render(<NoteEditor />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should update content when typing', async () => {
    const user = userEvent.setup();
    render(<NoteEditor />);
    
    const editor = screen.getByRole('textbox');
    await user.type(editor, '# Hello World');
    
    expect(editor).toHaveValue('# Hello World');
  });
});
```

##### バックエンド（Hono + Drizzle ORM）
```typescript
// Vitest を使用

// 例: API エンドポイントのテスト
import { testClient } from 'hono/testing';
import { app } from '@/api/app';

describe('Notes API', () => {
  it('should create new note', async () => {
    const res = await testClient(app).notes.$post({
      json: {
        title: 'Test Note',
        content: 'This is a test note',
      },
    });

    expect(res.status).toBe(201);
    const note = await res.json();
    expect(note.title).toBe('Test Note');
  });
});
```

#### 1.3 テストカテゴリとピラミッド構造

本プロジェクトでは以下のテスト戦略を採用します：

```
        /\
       /  \
      / E2E \     ← 少数（重要なユーザーフロー）
     /______\
    /        \
   /Integration\ ← 中程度（API、コンポーネント間）
  /__________\
 /            \
/   Unit Tests  \ ← 多数（関数、メソッド、コンポーネント）
/________________\
```

##### ユニットテスト（最多）
- **対象**: 個別の関数、メソッド、コンポーネント
- **ツール**: Jest, Vitest, React Testing Library
- **実行速度**: 高速（< 1秒）
- **カバレッジ**: 80%以上を目標

##### インテグレーションテスト（中程度）
- **対象**: APIエンドポイント、データベース連携、コンポーネント間
- **ツール**: Supertest, MSW (Mock Service Worker)
- **実行速度**: 中程度（< 10秒）

##### E2Eテスト（少数）
- **対象**: 重要なユーザーフロー（ログイン、ノート作成、共有など）
- **ツール**: Playwright
- **実行速度**: 低速（分単位）

#### 1.4 TDD実装のガイドライン

##### テスト作成の原則
1. **FIRST原則**
   - **F**ast: 高速に実行される
   - **I**ndependent: 他のテストに依存しない
   - **R**epeatable: 繰り返し実行可能
   - **S**elf-Validating: 自己検証する（Pass/Failが明確）
   - **T**imely: 適切なタイミングで作成

2. **テスト名の命名規則**
```typescript
// Good: 具体的で理解しやすい
it('should return 401 when user is not authenticated', () => {});
it('should create wiki link when typing [[note-title]]', () => {});

// Bad: 抽象的で何をテストしているか不明
it('should work correctly', () => {});
it('test login', () => {});
```

3. **Given-When-Then パターン**
```typescript
describe('Note creation', () => {
  it('should save note with generated slug', async () => {
    // Given: 前提条件
    const userData = { id: 'user-1', email: 'test@example.com' };
    
    // When: 実行する動作
    const note = await createNote({
      title: 'My First Note',
      content: 'Hello World',
      userId: userData.id,
    });
    
    // Then: 期待する結果
    expect(note.slug).toBe('my-first-note');
    expect(note.title).toBe('My First Note');
  });
});
```

#### 1.5 TDD導入戦略

##### フェーズ1: 基盤構築
- [ ] テスト環境のセットアップ（Jest, Vitest, React Testing Library）
- [ ] CI/CDパイプラインにテスト実行を組み込み
- [ ] チームでのTDD基本トレーニング

##### フェーズ2: 段階的適用
- [ ] 新機能開発時に必ずTDDで実装
- [ ] 既存コードのリファクタリング時にテスト追加
- [ ] コードレビューでテストの品質チェック

##### フェーズ3: 文化醸成
- [ ] TDD実践の成功事例共有
- [ ] テストカバレッジの可視化
- [ ] 継続的な改善とベストプラクティス更新

#### 1.6 テスト関連パッケージ

```json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/user-event": "^14.5.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "vitest": "^0.34.6",
    "@vitest/ui": "^0.34.6",
    "playwright": "^1.39.0",
    "@playwright/test": "^1.39.0",
    "msw": "^2.0.0",
    "supertest": "^6.3.3",
    "@types/supertest": "^2.0.15"
  }
}
```

#### 1.7 テスト実行設定

##### package.json スクリプト
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:api": "vitest run api",
    "test:api:watch": "vitest api",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

##### CI/CD での自動テスト
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:api
      - run: npm run test:e2e
```

### 2. コード品質管理

#### 2.1 静的解析ツール
- **ESLint**: コーディング規約の自動チェック
- **Prettier**: コードフォーマットの統一
- **TypeScript**: 型安全性の確保

#### 2.2 コードレビュー指針
- すべてのプルリクエストで必須
- テストコードの品質も重点的にレビュー
- TDDサイクルに従った開発プロセスの確認

#### 2.3 継続的インテグレーション
- プッシュ時の自動テスト実行
- テストカバレッジの監視
- 品質ゲートの設定

## 技術的考慮事項

### 1. パフォーマンス
- 大量のノート（1000+）でも快適に動作するよう最適化
- 仮想化によるリスト表示最適化
- 検索インデックスのメモリ効率化

### 2. データ永続化
- Supabase PostgreSQL でのクラウド保存
- リアルタイム同期機能
- 自動バックアップ・復元機能
- オフライン対応（Service Worker）

### 3. 拡張性
- プラグインシステムの基盤設計
- カスタムマークダウン記法への対応
- テーマシステム

### 4. アクセシビリティ
- キーボードナビゲーション対応
- スクリーンリーダー対応
- 色覚多様性への配慮

## 成功指標

- [ ] 100個以上のノートでも快適に動作
- [ ] 検索レスポンス時間 < 100ms
- [ ] モバイル対応（レスポンシブ）
- [ ] ダークモード完全対応
- [ ] ウィキリンク機能の完全実装
- [ ] グラフビューの実装
- [ ] エクスポート機能の実装

## リスク要因と対策

### リスク
1. **パフォーマンス問題**
   - 大量データでの動作不良
   - 対策: 仮想化、ページネーション実装

2. **ブラウザ制限**
   - ローカルストレージ容量制限
   - 対策: IndexedDBへの移行検討

3. **複雑性の増大**
   - グラフビュー実装の複雑さ
   - 対策: 段階的実装、シンプルなMVPから開始

### 対策
- 各フェーズ終了時の動作確認
- パフォーマンステストの実施
- ユーザビリティテストの実施

## 今後の拡張計画

### 短期（6ヶ月以内）
- [ ] リアルタイム共同編集（Supabase Realtime）
- [ ] モバイルアプリ（PWA化）
- [ ] API Rate Limiting
- [ ] 監査ログ機能

### 長期（1年以内）
- [ ] プラグインシステム
- [ ] AI機能統合（要約、関連ノート提案）
- [ ] 高度な可視化機能
- [ ] マルチテナント対応
- [ ] エンタープライズ機能（SSO、RBAC）

## バックエンドAPI設計

### API エンドポイント一覧

#### 認証関連
```
POST /api/auth/signup          # ユーザー登録
POST /api/auth/signin          # ログイン
POST /api/auth/signout         # ログアウト
POST /api/auth/refresh         # トークンリフレッシュ
GET  /api/auth/me              # 現在のユーザー情報
```

#### ワークスペース管理
```
GET    /api/workspaces         # ワークスペース一覧
POST   /api/workspaces         # ワークスペース作成
GET    /api/workspaces/:id     # ワークスペース詳細
PUT    /api/workspaces/:id     # ワークスペース更新
DELETE /api/workspaces/:id     # ワークスペース削除
GET    /api/workspaces/:id/members    # メンバー一覧
POST   /api/workspaces/:id/members    # メンバー招待
DELETE /api/workspaces/:id/members/:userId # メンバー削除
```

#### フォルダ管理
```
GET    /api/folders            # フォルダ一覧
POST   /api/folders            # フォルダ作成
PUT    /api/folders/:id        # フォルダ更新
DELETE /api/folders/:id        # フォルダ削除
GET    /api/folders/:id/tree   # フォルダツリー
```

#### ノート管理
```
GET    /api/notes              # ノート一覧（ページネーション）
POST   /api/notes              # ノート作成
GET    /api/notes/:id          # ノート詳細
PUT    /api/notes/:id          # ノート更新
DELETE /api/notes/:id          # ノート削除
GET    /api/notes/:id/versions # ノートバージョン履歴
POST   /api/notes/:id/versions # 新バージョン作成
GET    /api/notes/:id/links    # ノートリンク情報
PUT    /api/notes/:id/links    # リンク情報更新
```

#### 検索機能
```
GET    /api/search             # 全文検索
GET    /api/search/suggestions # 検索候補
POST   /api/search/index       # 検索インデックス更新
```

#### 共有機能
```
POST   /api/notes/:id/share    # 共有設定作成
GET    /api/notes/:id/share    # 共有設定取得
PUT    /api/notes/:id/share    # 共有設定更新
DELETE /api/notes/:id/share    # 共有解除
GET    /api/shared/:token      # 共有ノート表示（認証不要）
```

### 環境設定ファイル

#### Vercel Environment Variables
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api

# Optional: Rate Limiting
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

#### Drizzle 設定（drizzle.config.ts）
```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './api/db/schema.ts',
  out: './api/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
```

#### Supabase 設定（supabase/config.toml）
```toml
[api]
enabled = true
port = 54321
schemas = ["public", "graphql_public"]
extra_search_path = ["public", "extensions"]
max_rows = 1000

[db]
port = 54322

[studio]
enabled = true
port = 54323

[auth]
enabled = true
site_url = "http://localhost:3000"
additional_redirect_urls = ["https://your-app.vercel.app"]
jwt_expiry = 3600
```

### デプロイメント設定

#### Vercel Functions 設定（vercel.json）
```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node@18"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

### セキュリティ考慮事項

1. **認証・認可**
   - JWT トークンの適切な検証
   - Row Level Security (RLS) の実装
   - API Rate Limiting

2. **データ保護**
   - 入力値のサニタイズ
   - SQL インジェクション対策
   - XSS 対策

3. **CORS 設定**
   - 適切なオリジン制限
   - プリフライトリクエスト対応

4. **監査ログ**
   - ユーザーアクション記録
   - エラーログ管理
   - パフォーマンス監視

### パフォーマンス最適化

1. **データベース**
   - 適切なインデックス設計
   - クエリ最適化
   - 接続プーリング

2. **API**
   - レスポンスキャッシュ
   - ページネーション実装
   - 圧縮設定

3. **リアルタイム機能**
   - Supabase Realtime 活用
   - WebSocket 接続管理
   - イベント最適化

---

**作成日**: 2024年現在  
**最終更新**: バックエンド設計追加後  
**担当者**: 開発チーム