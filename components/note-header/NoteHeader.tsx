import { Note } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Star, Edit, Trash2, Share2 } from 'lucide-react';

interface NoteHeaderProps {
  note: Note;
}

export function NoteHeader({ note }: NoteHeaderProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  return (
    <header className="flex shrink-0 items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">{note.title}</h1>
        {note.isFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="text-yellow-500"
            aria-label="お気に入り"
          >
            <Star className="h-5 w-5 fill-current" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          <span>作成日: {formatDate(note.createdAt)}</span>
          <span className="mx-2">|</span>
          <span>更新日: {formatDate(note.updatedAt)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="編集">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="削除">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="共有">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}