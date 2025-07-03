import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Calendar, 
  Clock, 
  Hash,
  Edit3,
  Share2,
  Bookmark,
  Eye,
  Copy
} from "lucide-react";
import { findNoteById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/note-detail/markdown-renderer";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { id: string };
}

export default function NotePage({ params }: PageProps) {
  const { id } = params;
  
  // useEffectを使わず、直接データを取得（TDD原則に従い最小限の実装）
  const note = findNoteById(id);
  
  // ノートが見つからない場合は404を表示
  if (!note) {
    notFound();
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
            {note.title}
          </h1>
        </div>
        
        {/* ヘッダーアクション */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="card-hover w-8 h-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="card-hover w-8 h-8 p-0">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="card-hover w-8 h-8 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="card-hover w-8 h-8 p-0">
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-6 space-y-6">
          
          {/* ノートヘッダー */}
          <div className="glass p-6 rounded-2xl border">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {note.title}
            </h1>
            
            {/* メタ情報カード */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">作成日</p>
                  <p className="text-sm font-medium">{note.createdAt.toLocaleDateString('ja-JP')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                  <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">更新日</p>
                  <p className="text-sm font-medium">{note.updatedAt.toLocaleDateString('ja-JP')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                  <Hash className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">タグ数</p>
                  <p className="text-sm font-medium">{note.tags.length} tags</p>
                </div>
              </div>
            </div>
            
            {/* タグ */}
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center gap-1 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 rounded-full text-xs font-medium card-hover cursor-pointer"
                  >
                    <Hash className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* コンテンツエリア */}
          <div className="glass p-8 rounded-2xl border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded">
                  <FileText className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">ノート内容</span>
              </div>
              <Button size="sm" variant="ghost" className="card-hover text-xs">
                <Copy className="h-3 w-3 mr-1" />
                コピー
              </Button>
            </div>
            
            {/* マークダウンコンテンツ */}
            <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
              <MarkdownRenderer content={note.content} />
            </div>
          </div>
          
          {/* フッターアクション */}
          <div className="flex items-center justify-between glass p-4 rounded-xl border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              最終更新: {note.updatedAt.toLocaleString('ja-JP')}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="card-hover">
                <Share2 className="h-4 w-4 mr-2" />
                共有
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent card-hover">
                <Edit3 className="h-4 w-4 mr-2" />
                編集
              </Button>
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}