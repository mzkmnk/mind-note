import Link from "next/link";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { 
  FileX, 
  Home, 
  Search, 
  ArrowLeft,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg">
            <FileX className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="font-semibold text-muted-foreground">ノートが見つかりません</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-6">
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
            
            {/* エラーイラストレーション */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl transform scale-150"></div>
              <div className="relative flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full border-2 border-red-500/20">
                <FileX className="h-16 w-16 text-red-500" />
              </div>
            </div>
            
            {/* メインメッセージ */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                ノートが見つかりません
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                お探しのノートは存在しないか、削除された可能性があります。
                <br />
                別のノートをお探しください。
              </p>
            </div>

            {/* アクションカード */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
              <Button 
                asChild 
                className="h-auto p-6 card-hover glass group bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 border-primary/20"
              >
                <Link href="/" className="flex flex-col items-center space-y-3 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">ホームに戻る</h3>
                    <p className="text-xs text-muted-foreground">メインページを表示</p>
                  </div>
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="h-auto p-6 card-hover glass group bg-gradient-to-br from-green-500/5 to-emerald-500/5 hover:from-green-500/10 hover:to-emerald-500/10 border-green-500/20"
              >
                <Link href="/search" className="flex flex-col items-center space-y-3 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">ノートを検索</h3>
                    <p className="text-xs text-muted-foreground">既存のノートを探す</p>
                  </div>
                </Link>
              </Button>

              <Button 
                asChild 
                variant="outline" 
                className="h-auto p-6 card-hover glass group bg-gradient-to-br from-blue-500/5 to-cyan-500/5 hover:from-blue-500/10 hover:to-cyan-500/10 border-blue-500/20"
              >
                <div className="flex flex-col items-center space-y-3 text-center cursor-pointer">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl group-hover:scale-110 transition-transform">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">サイドバーを確認</h3>
                    <p className="text-xs text-muted-foreground">既存のノート一覧</p>
                  </div>
                </div>
              </Button>
            </div>

            {/* ヘルプセクション */}
            <div className="glass p-6 rounded-2xl border w-full max-w-2xl">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-lg flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-2">お困りですか？</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• サイドバーから既存のノートを選択してください</li>
                    <li>• 検索機能 (<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+K</kbd>) を使ってノートを探せます</li>
                    <li>• 新しいノートを作成するには「+」ボタンをクリックしてください</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 戻るボタン */}
            <Button 
              variant="ghost" 
              className="card-hover"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              前のページに戻る
            </Button>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}