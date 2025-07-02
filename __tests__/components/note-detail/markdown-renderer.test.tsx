/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { MarkdownRenderer } from '@/components/note-detail/markdown-renderer';

describe('MarkdownRenderer', () => {
  test('見出しが正しくレンダリングされる', () => {
    const content = `# 大見出し
## 中見出し  
### 小見出し`;
    
    render(<MarkdownRenderer content={content} />);
    
    // HTML要素ではなく、テキストコンテンツで確認
    expect(screen.getByText('大見出し')).toBeInTheDocument();
    expect(screen.getByText('中見出し')).toBeInTheDocument();
    expect(screen.getByText('小見出し')).toBeInTheDocument();
  });

  test('太字と斜体が正しく変換される', () => {
    const content = '**太字** と *斜体* のテスト';
    
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByText('太字')).toBeInTheDocument();
    expect(screen.getByText('斜体')).toBeInTheDocument();
  });

  test('インラインコードが正しく変換される', () => {
    const content = 'これは `console.log()` のテストです';
    
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByText('console.log()')).toBeInTheDocument();
  });

  test('ウィキリンク記法が正しく変換される', () => {
    const content = '[[はじめに]] を参照してください';
    
    render(<MarkdownRenderer content={content} />);
    
    const link = screen.getByText('はじめに');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/notes/はじめに');
  });

  test('チェックボックスリストが正しく変換される', () => {
    const content = `- [ ] 未完了タスク
- [x] 完了タスク`;
    
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByText('未完了タスク')).toBeInTheDocument();
    expect(screen.getByText('完了タスク')).toBeInTheDocument();
    
    // チェックボックスの状態を確認
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  test('外部リンクが正しく変換される', () => {
    const content = '[Google](https://google.com) をご覧ください';
    
    render(<MarkdownRenderer content={content} />);
    
    const link = screen.getByText('Google');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://google.com');
    expect(link.closest('a')).toHaveAttribute('target', '_blank');
  });

  test('空のコンテンツが正しく処理される', () => {
    render(<MarkdownRenderer content="" />);
    
    // エラーが発生しないことを確認
    expect(document.querySelector('.prose')).toBeInTheDocument();
  });
});