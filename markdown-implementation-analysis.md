# マークダウン対応 現状分析・修正実装計画書

## 📋 現状分析

### 実装済み機能（components/note-detail/markdown-renderer.tsx）

現在は **正規表現ベースの簡易マークダウンパーサー** を使用しており、以下の記法に対応：

✅ **対応済み記法**
1. 見出し (`# ## ###`)
2. 太字 (`**text**`)
3. 斜体 (`*text*`)
4. インラインコード (`` `code` ``)
5. 外部リンク (`[text](url)`)
6. ウィキリンク (`[[link]]`)
7. 基本リスト項目 (`- item`)
8. チェックボックス (`- [ ]` と `- [x]`)
9. 基本的な改行処理

### 未対応機能（lib/mock-data.tsで実際に使用されている記法）

❌ **未対応記法**
1. **コードブロック** (` ```language ... ``` `)
2. **引用** (`> text`)
3. **テーブル記法** (`| col1 | col2 |`)
4. **水平線** (`---`)
5. **ネストしたリスト** （多階層リスト）
6. **順序付きリスト** (`1. item`)
7. **エスケープ文字** (`\*` など)
8. **複数段落の適切な処理**
9. **GitHub Flavored Markdown** 記法全般
10. **タスクリストの高度な機能**

## 🚨 主要な問題点

### 1. 実装方針の不整合
- **計画書（task.md）**: `react-markdown` + `remark-gfm` の使用を想定
- **実装**: 自作の正規表現ベース簡易パーサー
- **依存関係**: 本格的なマークダウンライブラリが未インストール

### 2. データと実装の乖離
- **モックデータ**: 高度なマークダウン記法を多用
- **レンダラー**: 基本記法のみ対応
- **結果**: 多くの記法が正しく表示されない

### 3. 拡張性の問題
- 正規表現ベースは保守性が低い
- 新しい記法の追加が困難
- エッジケースの処理が不十分

## 🎯 修正・実装計画

### Phase 1: 本格的なマークダウンライブラリの導入（高優先度）

#### 1.1 必要パッケージのインストール
```bash
npm install react-markdown remark-gfm remark-wiki-link rehype-highlight rehype-raw
npm install --save-dev @types/react-markdown
```

#### 1.2 MarkdownRendererの完全リライト
```typescript
// components/note-detail/markdown-renderer.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkWikiLink from 'remark-wiki-link';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          [remarkWikiLink, {
            pageResolver: (name: string) => [name.replace(/ /g, '-').toLowerCase()],
            hrefTemplate: (permalink: string) => `/notes/${permalink}`,
            aliasDivider: '|'
          }]
        ]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeRaw
        ]}
        components={{
          // カスタムコンポーネント設定
          a: ({ href, children, ...props }) => (
            <a 
              href={href}
              className={href?.startsWith('/notes/') 
                ? "text-purple-600 hover:underline" 
                : "text-blue-600 hover:underline"
              }
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          // その他のカスタムコンポーネント...
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

### Phase 2: 追加記法対応（中優先度）

#### 2.1 対応予定の記法
1. **コードブロック** - シンタックスハイライト付き
2. **テーブル** - 完全なGFM準拠
3. **引用** - ネスト対応
4. **タスクリスト** - インタラクティブ機能
5. **数式** - KaTeX対応（将来的に）
6. **図表** - Mermaid対応（将来的に）

#### 2.2 ウィキリンク機能の強化
```typescript
// 存在しないノートへのリンクの処理
// バックリンク機能の実装
// リンクプレビュー機能
```

### Phase 3: パフォーマンス最適化（低優先度）

#### 3.1 レンダリング最適化
- 大きなドキュメントの仮想化
- メモ化の最適化
- 遅延レンダリング

#### 3.2 プラグイン設定の最適化
- 必要なプラグインのみロード
- 設定の外部化

## 📝 実装手順

### Step 1: 環境準備（30分）
1. 必要パッケージのインストール
2. 型定義の追加
3. テスト環境の調整

### Step 2: 基本実装（2時間）
1. MarkdownRendererの完全リライト
2. 基本的なプラグイン設定
3. スタイリングの調整

### Step 3: 高度な機能実装（3時間）
1. ウィキリンク機能の強化
2. コードハイライト機能
3. テーブル記法対応
4. タスクリスト機能

### Step 4: テスト更新（1時間）
1. 既存テストの修正
2. 新機能のテスト追加
3. エッジケースのテスト

### Step 5: 統合テスト（30分）
1. 全体動作確認
2. パフォーマンステスト
3. レスポンシブ確認

## 🧪 テスト計画

### 新しいテストケース
```typescript
describe('Enhanced MarkdownRenderer', () => {
  test('コードブロックがシンタックスハイライト付きで表示される', () => {
    // JavaScript, TypeScript, Python等のテスト
  });
  
  test('テーブル記法が正しくレンダリングされる', () => {
    // GFMテーブルのテスト
  });
  
  test('引用が正しくネスト表示される', () => {
    // 多階層引用のテスト
  });
  
  test('タスクリストが正しく機能する', () => {
    // チェックボックスの状態管理テスト
  });
  
  test('ウィキリンクが適切にリンクされる', () => {
    // 存在するノート・存在しないノートのテスト
  });
});
```

## 📦 必要な依存関係

```json
{
  "dependencies": {
    "react-markdown": "^9.0.1",
    "remark-gfm": "^4.0.0",
    "remark-wiki-link": "^1.0.5",
    "rehype-highlight": "^7.0.0",
    "rehype-raw": "^7.0.0",
    "highlight.js": "^11.9.0"
  },
  "devDependencies": {
    "@types/react-markdown": "^8.0.7"
  }
}
```

## ⚠️ リスク・注意事項

### 技術的リスク
1. **パフォーマンス**: 大きなドキュメントでの動作速度
2. **互換性**: 既存のスタイリングとの整合性
3. **サイズ**: バンドルサイズの増加

### 対策
1. 段階的な移行
2. A/Bテストでの検証
3. パフォーマンス監視

## 🎯 完了条件

### 必須条件
- [ ] 全ての基本マークダウン記法が正しく表示される
- [ ] lib/mock-data.tsの全コンテンツが適切にレンダリングされる
- [ ] 既存テストが全て通る
- [ ] 新しいテストケースが追加され、通る
- [ ] ウィキリンク機能が正常に動作する

### 推奨条件
- [ ] コードシンタックスハイライトが動作する
- [ ] テーブルが美しく表示される
- [ ] レスポンシブデザインが維持される
- [ ] ダークモード対応が継続される

## 📈 想定工数

- **総工数**: 約7時間
- **緊急度**: 高（ユーザー体験に直接影響）
- **難易度**: 中（ライブラリ移行のため）
- **担当者**: フロントエンド開発者1名

## 🚀 後続タスク

1. **エディタ機能の実装** - リアルタイムプレビュー
2. **検索機能の強化** - マークダウン内容を考慮した検索
3. **エクスポート機能** - PDF/HTML出力
4. **数式・図表対応** - KaTeX、Mermaid統合

---

**実装開始の許可をお待ちしています。準備が完了次第、Phase 1から順次実装を開始します。**