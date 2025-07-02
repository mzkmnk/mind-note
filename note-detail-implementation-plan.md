# ノート詳細画面 実装計画書

## 概要

サイドバーが実装済みのObsidianライクマークダウンメモアプリに、ノート詳細表示画面を追加実装します。本実装ではt-wadaが推奨するTDD（テスト駆動開発）手法を採用し、useEffectの多用を避けたReactのベストプラクティスに従います。

## 実装方針

### 1. useEffectの使用制限について

調査した記事（https://zenn.dev/uhyo/articles/useeffect-taught-by-extremist）に基づき、以下の方針を適用します：

#### useEffectを避けるべき場面と代替手段
- **データの変換・計算**: `useEffect` + `setState` → `useMemo`で派生値として計算
- **親コンポーネントとの通信**: `useEffect`でのコールバック実行 → イベントハンドラーでの直接実行
- **外部ストアとの同期**: `useEffect`での購読 → `useSyncExternalStore`を使用
- **グローバル初期化**: `useEffect`での初期化 → 直接関数実行
- **データフェッチング**: `useEffect`でのAPI呼び出し → 今回はモックデータのため不要

#### useEffectを使用する正当な理由
- 外部システムとの同期（DOM操作、タイマー、ブラウザAPI等）
- クリーンアップが必要な副作用
- **今回の実装では最小限に制限**

### 2. TDD実装方針（t-wada推奨手法）

#### Red-Green-Refactorサイクル
1. **Red**: 失敗するテストを書く
2. **Green**: テストが通る最小限のコードを書く
3. **Refactor**: テストが通ったままコードをリファクタリング

#### テストの質（F.I.R.S.T原則）
- **Fast**: 高速に実行される
- **Independent**: テスト間で独立している
- **Repeatable**: 繰り返し実行可能
- **Self-Validating**: 成功/失敗が明確
- **Timely**: 適切なタイミングで書かれる

#### 実装の進め方
- 小さなステップで段階的に実装
- テストファーストで進める
- 即座のフィードバックを重視
- リファクタリングを必ず実行

## 技術要件

### 現在の技術スタック
- Next.js 13.5.1 (App Router)
- TypeScript 5.2.2
- Tailwind CSS 3.3.3
- Jest + React Testing Library（テスト環境設定済み）

### 追加する機能範囲
- ✅ ノート詳細表示
- ✅ マークダウンレンダリング
- ✅ パンくずナビゲーション
- ❌ ノート編集機能（別PR）
- ❌ ノート作成機能（別PR）
- ❌ リアルタイムデータ連携（モックデータ使用）

## 実装計画

### Phase 1: テスト環境とモックデータの準備（30分）

#### 1.1 モックデータの作成
```typescript
// lib/mock-data.ts
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
  // サンプルノートデータ
];
```

#### 1.2 テスト用のヘルパー関数作成
```typescript
// __tests__/test-utils.tsx
import { render } from '@testing-library/react';
// テストレンダリング用のラッパー関数
```

### Phase 2: ノート詳細ページの基本構造（TDD）（1時間）

#### 2.1 ルーティングの実装
- `app/notes/[id]/page.tsx` の作成
- テストファーストでページコンポーネントの骨格実装

#### Test Case 2.1
```typescript
// __tests__/app/notes/[id]/page.test.tsx
describe('ノート詳細ページ', () => {
  test('ノートIDが渡されたときページが表示される', () => {
    // Red: 失敗するテストを書く
  });
});
```

#### 2.2 基本レイアウトの実装
- ヘッダー（パンくずナビゲーション）
- メインコンテンツエリア
- SidebarInsetとの連携

### Phase 3: ノートデータの取得と表示（TDD）（1時間）

#### 3.1 ノートデータ取得機能
useStateとuseMemoを使用した実装：

```typescript
// components/note-detail/note-content.tsx
function NoteContent({ noteId }: { noteId: string }) {
  const [allNotes] = useState(mockNotes); // データソース
  
  // useEffectではなくuseMemoで派生値として計算
  const note = useMemo(() => 
    allNotes.find(n => n.id === noteId), 
    [allNotes, noteId]
  );
  
  if (!note) return <NoteNotFound />;
  return <NoteDisplay note={note} />;
}
```

#### Test Case 3.1
```typescript
describe('ノートコンテンツ', () => {
  test('有効なIDのノートが表示される', () => {
    // Red-Green-Refactorサイクル
  });
  
  test('無効なIDの場合は404表示', () => {
    // Red-Green-Refactorサイクル
  });
});
```

### Phase 4: マークダウンレンダリング（TDD）（1時間）

#### 4.1 マークダウンレンダリングコンポーネント
```typescript
// components/note-detail/markdown-renderer.tsx
interface MarkdownRendererProps {
  content: string;
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // useEffectを使わず、propsの変更に応じて自動的に再レンダリング
  const renderedHtml = useMemo(() => 
    markdownToHtml(content), 
    [content]
  );
  
  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
}
```

#### Test Case 4.1
```typescript
describe('マークダウンレンダリング', () => {
  test('マークダウンがHTMLに変換される', () => {
    // Markdown → HTML変換のテスト
  });
  
  test('ウィキリンク記法が認識される', () => {
    // [[リンク]]の処理テスト
  });
});
```

### Phase 5: UIコンポーネントの完成（TDD）（1時間）

#### 5.1 ノートヘッダーコンポーネント
```typescript
// components/note-detail/note-header.tsx
interface NoteHeaderProps {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  onBack?: () => void; // useEffectではなくイベントハンドラー
}
```

#### 5.2 タグ表示コンポーネント
```typescript
// components/note-detail/note-tags.tsx
interface NoteTagsProps {
  tags: string[];
  onTagClick?: (tag: string) => void; // イベントハンドラーでの処理
}
```

#### Test Case 5.1-5.2
```typescript
describe('ノートヘッダー', () => {
  test('タイトルと日付が表示される', () => {});
  test('タグクリックでコールバックが実行される', () => {});
});
```

### Phase 6: サイドバー連携（TDD）（30分）

#### 6.1 サイドバーからの遷移
- 既存のAppSidebarとの連携
- ナビゲーション処理をイベントハンドラーで実装（useEffectを避ける）

```typescript
// components/app-sidebar.tsx への修正
function AppSidebar() {
  const handleNoteClick = useCallback((noteId: string) => {
    // useEffectではなく、直接的なナビゲーション処理
    router.push(`/notes/${noteId}`);
  }, [router]);
  
  // ...
}
```

### Phase 7: エラーハンドリングとローディング状態（TDD）（30分）

#### 7.1 エラーバウンダリ
```typescript
// components/note-detail/note-error-boundary.tsx
// エラー状態の表示
```

#### 7.2 ローディング状態
```typescript
// app/notes/[id]/loading.tsx
// Next.js App Routerのローディング状態
```

### Phase 8: リファクタリングと最適化（30分）

#### 8.1 コンポーネントの分割と再利用性向上
#### 8.2 パフォーマンス検証
#### 8.3 アクセシビリティの確認

## テスト戦略

### 単体テスト
- 各コンポーネントの独立したテスト
- モックデータを使用した純粋関数のテスト
- イベントハンドラーの動作テスト

### 統合テスト
- ページ全体の動作テスト
- サイドバーからノート詳細への遷移テスト
- URL直接アクセスのテスト

### テストカバレッジ目標
- 関数カバレッジ: 90%以上
- 行カバレッジ: 85%以上
- 分岐カバレッジ: 80%以上

## ディレクトリ構造

```
app/
├── notes/
│   └── [id]/
│       ├── page.tsx          # ノート詳細ページ
│       ├── loading.tsx       # ローディング状態
│       └── not-found.tsx     # 404ページ
components/
├── note-detail/
│   ├── note-content.tsx      # メインコンテンツ
│   ├── note-header.tsx       # ヘッダー部分
│   ├── markdown-renderer.tsx # Markdownレンダリング
│   ├── note-tags.tsx         # タグ表示
│   └── note-error-boundary.tsx # エラーハンドリング
lib/
├── mock-data.ts              # モックデータ
└── markdown-utils.ts         # Markdown処理ユーティリティ
__tests__/
├── app/notes/[id]/
│   └── page.test.tsx
├── components/note-detail/
│   ├── note-content.test.tsx
│   ├── note-header.test.tsx
│   ├── markdown-renderer.test.tsx
│   └── note-tags.test.tsx
└── test-utils.tsx
```

## 実装時の注意事項

### useEffect使用の判断基準
以下の場合にのみuseEffectを使用：
1. DOM操作が必要な場合
2. タイマーやintervalの設定
3. ブラウザAPIとの連携
4. **データ取得、状態計算、イベント処理では使用しない**

### コーディング規約
1. TypeScriptの厳密な型定義
2. コンポーネントの単一責任原則
3. プロップドリリングの回避（必要に応じてContext使用）
4. カスタムフックでのロジック抽出

### パフォーマンス考慮事項
1. useMemoとuseCallbackの適切な使用
2. 不要な再レンダリングの防止
3. コンポーネントの遅延読み込み（今回は対象外）

## 完了条件

1. ✅ 全テストが通ること
2. ✅ ビルドが成功すること
3. ✅ useEffectの使用箇所が正当化されること
4. ✅ ノート詳細が正しく表示されること
5. ✅ サイドバーからの遷移が機能すること
6. ✅ エラー状態が適切に処理されること
7. ✅ レスポンシブデザインが機能すること

## 想定所要時間

- **総作業時間**: 約6時間
- **TDD実装**: 4.5時間
- **リファクタリング**: 1時間
- **テスト調整**: 0.5時間

## 後続タスク（別PR）

1. ノート編集機能の実装
2. ノート作成機能の実装
3. リアルタイムデータ連携
4. 検索機能の強化
5. ウィキリンク機能の実装

---

**実装開始前に必ずこの計画書の承認を得てから進めてください。**