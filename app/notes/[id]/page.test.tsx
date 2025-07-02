import { render, screen } from '@testing-library/react';
import NotePage from './page';
import { mockNotes } from '@/lib/mock-data';

// モックデータの準備
jest.mock('@/lib/mock-data', () => ({
  mockNotes: {
    '1': {
      id: '1',
      title: 'はじめに',
      content: '# MindNoteへようこそ\n\nこれはテストノートです。',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      isFavorite: true
    }
  }
}));

describe('NotePage', () => {
  it('should render note title', () => {
    render(<NotePage params={{ id: '1' }} />);
    expect(screen.getByText('はじめに')).toBeInTheDocument();
  });

  it('should render note content as markdown', () => {
    render(<NotePage params={{ id: '1' }} />);
    expect(screen.getByRole('heading', { level: 1, name: 'MindNoteへようこそ' })).toBeInTheDocument();
    expect(screen.getByText('これはテストノートです。')).toBeInTheDocument();
  });

  it('should display created and updated dates', () => {
    render(<NotePage params={{ id: '1' }} />);
    expect(screen.getByText(/作成日: 2024\/01\/01/)).toBeInTheDocument();
    expect(screen.getByText(/更新日: 2024\/01\/15/)).toBeInTheDocument();
  });

  it('should show favorite icon when note is favorited', () => {
    render(<NotePage params={{ id: '1' }} />);
    expect(screen.getByRole('button', { name: /お気に入り/ })).toBeInTheDocument();
  });

  it('should render action buttons', () => {
    render(<NotePage params={{ id: '1' }} />);
    expect(screen.getByRole('button', { name: /編集/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /削除/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /共有/ })).toBeInTheDocument();
  });

  it('should show 404 message for non-existent note', () => {
    render(<NotePage params={{ id: 'non-existent' }} />);
    expect(screen.getByText('ノートが見つかりません')).toBeInTheDocument();
  });
});