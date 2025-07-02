import Link from "next/link";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { FileX, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <FileX className="h-4 w-4" />
          <h1 className="font-semibold">ノートが見つかりません</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <FileX className="h-24 w-24 text-muted-foreground mb-6" />
            
            <h1 className="text-4xl font-bold mb-4">ノートが見つかりません</h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              指定されたノートは存在しないか、削除された可能性があります。
              サイドバーから他のノートを選択するか、ホームページに戻ってください。
            </p>

            <div className="flex gap-4">
              <Button asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  ホームに戻る
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link href="/search">
                  <Search className="h-4 w-4 mr-2" />
                  ノートを検索
                </Link>
              </Button>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
              <p>ヒント: サイドバーから既存のノートを選択できます</p>
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}