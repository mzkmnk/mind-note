import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export default function Home() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <h1 className="font-semibold">はじめに</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold">MindNoteへようこそ</h1>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="text-lg text-muted-foreground">
              MindNoteは、Obsidianにインスパイアされたマークダウンメモアプリです。
              アイデアを整理し、知識を体系化し、創造的な思考を促進します。
            </p>

            <h2 className="mt-8 text-2xl font-semibold">主な機能</h2>
            <ul className="mt-4 space-y-2">
              <li>✨ リアルタイムマークダウンプレビュー</li>
              <li>🔗 ウィキリンク記法でノート間を接続</li>
              <li>🕸️ グラフビューで知識の関係性を可視化</li>
              <li>🏷️ タグ機能で整理整頓</li>
              <li>🔍 高速な全文検索</li>
              <li>☁️ クラウド同期でどこからでもアクセス</li>
            </ul>

            <h2 className="mt-8 text-2xl font-semibold">はじめ方</h2>
            <ol className="mt-4 space-y-2">
              <li>
                1. サイドバーの「+」ボタンをクリックして新しいノートを作成
              </li>
              <li>2. マークダウン形式で自由に記述</li>
              <li>3. [[ノート名]] でノート間をリンク</li>
              <li>4. #タグ でノートを分類</li>
            </ol>

            <p className="mt-8 rounded-lg bg-muted p-4">
              💡 <strong>ヒント:</strong> Ctrl+K（Mac:
              Cmd+K）でクイック検索を開き、 素早くノート間を移動できます。
            </p>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}
