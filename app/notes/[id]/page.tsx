import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import { findNoteById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/note-detail/markdown-renderer";

interface PageProps {
  params: { id: string };
}

export default function NotePage({ params }: PageProps) {
  const { id } = params;
  
  // useEffectを使わず、直接データを取得（TDD原則に従い最小限の実装）
  const note = findNoteById(id);
  
  // ノートが見つからない場合は404を表示
  if (!note) {
    return (
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <h1 className="font-semibold">ノートが見つかりません</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-3xl font-bold">ノートが見つかりません</h1>
            <p className="text-muted-foreground">
              指定されたノートは存在しないか、削除された可能性があります。
            </p>
          </div>
        </main>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <h1 className="font-semibold">{note.title}</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>作成: {note.createdAt.toLocaleDateString('ja-JP')}</span>
              <span>更新: {note.updatedAt.toLocaleDateString('ja-JP')}</span>
              {note.tags.length > 0 && (
                <div className="flex gap-1">
                  {note.tags.map(tag => (
                    <span key={tag} className="bg-muted px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* useEffectを使わないマークダウンレンダリング */}
          <MarkdownRenderer content={note.content} />
        </div>
      </main>
    </SidebarInset>
  );
}