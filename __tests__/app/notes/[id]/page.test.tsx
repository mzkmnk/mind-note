import { render, screen } from '@testing-library/react';
import { mockNotes } from '@/lib/mock-data';
import NotePage from '@/app/notes/[id]/page';

// Next.jsのuseParamsをモック
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'welcome' }),
}));

describe('ノート詳細ページ', () => {
  test('有効なノートIDが渡されたときページが表示される', () => {
    // Red: 失敗するテストを書く
    const mockParams = { params: { id: 'welcome' } };
    
    render(<NotePage {...mockParams} />);
    
    // ノートのタイトルが表示されることを確認
    expect(screen.getByText('はじめに')).toBeInTheDocument();
    
    // ノートの内容の一部が表示されることを確認
    expect(screen.getByText(/MindNoteへようこそ/)).toBeInTheDocument();
  });

  test('無効なノートIDの場合は404が表示される', () => {
    // Red: 失敗するテストを書く
    const mockParams = { params: { id: 'nonexistent' } };
    
    render(<NotePage {...mockParams} />);
    
    // 404メッセージが表示されることを確認
    expect(screen.getByText(/ノートが見つかりません/)).toBeInTheDocument();
  });

  test('パンくずナビゲーションが表示される', () => {
    // Red: 失敗するテストを書く
    const mockParams = { params: { id: 'welcome' } };
    
    render(<NotePage {...mockParams} />);
    
    // パンくずナビゲーションの要素が表示されることを確認
    expect(screen.getByText('はじめに')).toBeInTheDocument();
  });
});