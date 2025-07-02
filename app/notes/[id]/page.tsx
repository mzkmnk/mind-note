import { mockNotes } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { NoteHeader } from '@/components/note-header/NoteHeader';
import { MarkdownDisplay } from '@/components/note-viewer/MarkdownDisplay';

interface NotePageProps {
  params: {
    id: string;
  };
}

export default function NotePage({ params }: NotePageProps) {
  const note = mockNotes[params.id];

  if (!note) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-muted-foreground">ノートが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <NoteHeader note={note} />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-6">
          <MarkdownDisplay content={note.content} />
        </div>
      </div>
    </div>
  );
}