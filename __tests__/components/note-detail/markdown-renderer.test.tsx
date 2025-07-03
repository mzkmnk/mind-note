/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import MarkdownRenderer from '@/components/note-detail/markdown-renderer';

describe('MarkdownRenderer (Zenn公式ライブラリ)', () => {
  test('見出しが正しくレンダリングされる', async () => {
    const content = `# 大見出し
## 中見出し  
### 小見出し`;
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      expect(screen.getByText('大見出し')).toBeInTheDocument();
      expect(screen.getByText('中見出し')).toBeInTheDocument();
      expect(screen.getByText('小見出し')).toBeInTheDocument();
    });
  });

  test('太字と斜体が正しく変換される', async () => {
    const content = '**太字** と *斜体* のテスト';
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      expect(screen.getByText('太字')).toBeInTheDocument();
      expect(screen.getByText('斜体')).toBeInTheDocument();
    });
  });

  test('インラインコードが正しく変換される', async () => {
    const content = 'これは `console.log()` のテストです';
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      expect(screen.getByText('console.log()')).toBeInTheDocument();
    });
  });

  test('コードブロックが正しく変換される', async () => {
    const content = `\`\`\`javascript
console.log('Hello World');
\`\`\``;
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      expect(screen.getByText("console.log('Hello World');")).toBeInTheDocument();
    });
  });

  test('リストが正しく変換される', async () => {
    const content = `- アイテム1
- アイテム2
- アイテム3`;
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      expect(screen.getByText('アイテム1')).toBeInTheDocument();
      expect(screen.getByText('アイテム2')).toBeInTheDocument();
      expect(screen.getByText('アイテム3')).toBeInTheDocument();
    });
  });

  test('外部リンクが正しく変換される', async () => {
    const content = '[Google](https://google.com) をご覧ください';
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      const link = screen.getByText('Google');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', 'https://google.com');
    });
  });

  test('引用が正しく変換される', async () => {
    const content = '> これは引用文です';
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      expect(screen.getByText('これは引用文です')).toBeInTheDocument();
    });
  });

  test('テーブルが正しく変換される', async () => {
    const content = `| 列1 | 列2 |
|-----|-----|
| データ1 | データ2 |`;
    
    render(<MarkdownRenderer content={content} />);
    
    await waitFor(() => {
      expect(screen.getByText('列1')).toBeInTheDocument();
      expect(screen.getByText('列2')).toBeInTheDocument();
      expect(screen.getByText('データ1')).toBeInTheDocument();
      expect(screen.getByText('データ2')).toBeInTheDocument();
    });
  });

  test('空のコンテンツが正しく処理される', async () => {
    render(<MarkdownRenderer content="" />);
    
    await waitFor(() => {
      // znnクラスが適用されているか確認
      expect(document.querySelector('.znc')).toBeInTheDocument();
    });
  });

  test('ローディング状態が表示される', () => {
    render(<MarkdownRenderer content="# テスト" />);
    
    // 初期状態でローディングメッセージが表示される
    expect(screen.getByText('マークダウンを変換中...')).toBeInTheDocument();
  });
});