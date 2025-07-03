# ZennやGitHub同等のマークダウンライブラリ調査結果

## 🎯 調査目的

独自実装ではなく、ZennやGitHubと同じような動作をする既存の公開されているマークダウンライブラリの調査。テストや保守の手間を削減したい。

## 📊 調査結果 - 推奨ライブラリ

### 1. **Zenn公式ライブラリ** ⭐⭐⭐⭐⭐

**パッケージ**: `zenn-markdown-html` + `zenn-content-css`

```bash
npm install zenn-markdown-html zenn-content-css
```

**使用方法**:
```javascript
import markdownHtml from 'zenn-markdown-html';
import 'zenn-content-css';

// Markdown → HTML変換
const html = markdownHtml(markdown);

// Reactでの使用例
<div className="znc" dangerouslySetInnerHTML={{ __html: html }} />
```

**特徴**:
- ✅ **Zennと完全に同一**の動作保証
- ✅ 埋め込み記法（Tweet、Mermaid、数式等）サポート
- ✅ Node.js専用（サーバーサイドレンダリング対応）
- ✅ 公式メンテナンス・継続的アップデート
- ✅ 日本語ドキュメント完備

**対応記法**:
- 基本的なMarkdown（CommonMark準拠）
- コードブロック（シンタックスハイライト）
- テーブル
- 数式記法（KaTeX）
- メッセージボックス記法
- 埋め込み記法（Twitter、YouTube、GitHub等）

---

### 2. **GitHub Flavored Markdown** ⭐⭐⭐⭐

**パッケージ**: `react-markdown` + `remark-gfm`

```bash
npm install react-markdown remark-gfm rehype-highlight
```

**使用方法**:
```javascript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeHighlight]}
>
  {markdownContent}
</ReactMarkdown>
```

**特徴**:
- ✅ **GitHub完全準拠**のGFMサポート
- ✅ クライアント・サーバー両対応
- ✅ 豊富なプラグインエコシステム
- ✅ TypeScript完全対応
- ✅ 高い拡張性とカスタマイズ性

**対応記法**:
- GitHub Flavored Markdown 完全準拠
- テーブル、チェックボックス、打ち消し線
- コードブロック（シンタックスハイライト）
- オートリンク
- 脚注サポート

---

### 3. **高速WASM版** ⭐⭐⭐⭐

**パッケージ**: `md4w`

```bash
npm install md4w
```

**使用方法**:
```javascript
import { init, mdToHtml } from "md4w";

await init();
const html = mdToHtml(markdown);
```

**特徴**:
- ✅ **CommonMark 0.31完全準拠**
- ✅ **2.5倍高速**（markdown-it比）
- ✅ 軽量（28KB gzipped）
- ✅ WebAssembly使用
- ✅ ストリーミングAPI対応

**対応記法**:
- CommonMark完全準拠
- GitHub風テーブル
- タスクリスト
- 打ち消し線
- Wiki風リンク
- 数式記法

---

### 4. **独自カスタマイズ型** ⭐⭐⭐

**パッケージ**: `Yozora`

```bash
npm install @yozora/react-markdown
```

**特徴**:
- ✅ 高度なカスタマイズ性
- ✅ 拡張記法サポート
- ✅ プラグインシステム
- ❌ 学習コストが高い

---

## 🏆 **最終推奨**

### **第1位: Zenn公式ライブラリ**
- **使用場面**: Zennライクなマークダウン体験を提供したい場合
- **メリット**: 完全な動作保証、日本語環境最適化
- **注意点**: Node.js専用

### **第2位: GitHub Flavored Markdown**
- **使用場面**: GitHub互換性が重要な場合
- **メリット**: 業界標準、豊富な資料、幅広い対応
- **注意点**: 設定が複雑になる場合がある

### **第3位: md4w**
- **使用場面**: パフォーマンスが最重要な場合
- **メリット**: 最高速度、軽量
- **注意点**: 機能はやや限定的

## 💡 **実装推奨手順**

### Option A: Zenn方式採用
```bash
npm install zenn-markdown-html zenn-content-css
```

### Option B: GitHub方式採用  
```bash
npm install react-markdown remark-gfm rehype-highlight
```

### Option C: 高性能重視
```bash
npm install md4w
```

## 📚 **参考リソース**

- [Zenn公式エディタリポジトリ](https://github.com/zenn-dev/zenn-editor)
- [react-markdown公式ドキュメント](https://github.com/remarkjs/react-markdown)
- [md4w公式リポジトリ](https://github.com/ije/md4w)
- [GitHub Flavored Markdown仕様](https://github.github.com/gfm/)

## ✅ **結論**

独自実装する必要はありません。特に**Zenn公式ライブラリ**または**GitHub Flavored Markdown**の組み合わせを使用することで、テストや保守の手間を大幅に削減しながら、高品質なマークダウン体験を提供できます。

プロジェクトの要件に応じて：
- **日本語重視・Zennライク** → `zenn-markdown-html`
- **GitHub互換性重視** → `react-markdown` + `remark-gfm`  
- **パフォーマンス重視** → `md4w`

を選択することを強く推奨します。