import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar, Clock, Hash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg animate-pulse">
            <FileText className="h-4 w-4 text-primary/50" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
        
        {/* ヘッダーアクション スケルトン */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-6 space-y-6">
          
          {/* ノートヘッダー スケルトン */}
          <div className="glass p-6 rounded-2xl border">
            <Skeleton className="h-10 w-80 mb-4" />
            
            {/* メタ情報カード スケルトン */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600/50 dark:text-blue-400/50" />
                </div>
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                  <Clock className="h-4 w-4 text-green-600/50 dark:text-green-400/50" />
                </div>
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                  <Hash className="h-4 w-4 text-purple-600/50 dark:text-purple-400/50" />
                </div>
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
            
            {/* タグ スケルトン */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
          
          {/* コンテンツエリア スケルトン */}
          <div className="glass p-8 rounded-2xl border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded">
                  <FileText className="h-3 w-3 text-orange-600/50 dark:text-orange-400/50" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
            
            {/* マークダウンコンテンツ スケルトン */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/5" />
              <div className="my-6">
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-2/3" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-3/5" />
            </div>
          </div>
          
          {/* フッターアクション スケルトン */}
          <div className="flex items-center justify-between glass p-4 rounded-xl border">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground/50" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}