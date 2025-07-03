import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Sparkles, 
  Link2, 
  Share2, 
  Hash, 
  Search, 
  Cloud, 
  PlusCircle,
  BookOpen,
  Zap,
  Target,
  Lightbulb,
  ArrowRight,
  Github,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: "リアルタイムプレビュー",
      description: "マークダウンをリアルタイムで美しくレンダリング",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Link2,
      title: "ウィキリンク機能",
      description: "[[ノート名]] でノート間を簡単に接続",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "グラフビュー",
      description: "知識の関係性を視覚的に表示",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Hash,
      title: "タグシステム",
      description: "ハッシュタグでコンテンツを整理",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Search,
      title: "高速検索",
      description: "瞬時に目的のノートを発見",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Cloud,
      title: "クラウド同期",
      description: "デバイス間でシームレスに同期",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const quickActions = [
    {
      icon: PlusCircle,
      title: "新しいノート",
      description: "空白のノートから始める",
      shortcut: "Ctrl + N"
    },
    {
      icon: BookOpen,
      title: "テンプレート",
      description: "定型フォーマットを使用",
      shortcut: "Ctrl + T"
    },
    {
      icon: Search,
      title: "検索",
      description: "既存のノートを探す",
      shortcut: "Ctrl + K"
    }
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            はじめに
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          
          {/* Hero Section */}
          <div className="text-center space-y-4 py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl mb-6 shadow-xl">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              MindNote
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              アイデアを整理し、知識を体系化し、創造的な思考を促進する
              <br />
              <span className="font-medium text-foreground">モダンなマークダウンメモアプリ</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-6 card-hover group glass"
                asChild
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                      {action.shortcut}
                    </code>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Features Grid */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <Target className="h-8 w-8 text-primary" />
                主な機能
              </h2>
              <p className="text-muted-foreground">
                効率的な思考整理をサポートする充実した機能群
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group card-hover"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity rounded-xl blur-xl"
                       style={{background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}
                  />
                  <div className="relative glass p-6 rounded-xl border">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl mb-4 shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div className="glass p-8 rounded-2xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold">はじめ方</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">ノートを作成</h4>
                    <p className="text-sm text-muted-foreground">サイドバーの「+」ボタンから新しいノートを作成しましょう</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">マークダウン記述</h4>
                    <p className="text-sm text-muted-foreground">Markdown形式で自由に記述できます</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">ノートを接続</h4>
                    <p className="text-sm text-muted-foreground">[[ノート名]] でノート間をリンクしましょう</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">タグで整理</h4>
                    <p className="text-sm text-muted-foreground">#タグ でノートを分類・整理できます</p>
                  </div>
                </div>
              </div>
              
              <div className="code-block">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Markdown例</span>
                  <Github className="h-4 w-4 text-muted-foreground" />
                </div>
                <pre className="text-sm text-muted-foreground">
{`# プロジェクトアイデア

## Webアプリ開発
- [[React]] を使用
- [[TypeScript]] で型安全に
- #開発 #プログラミング

> 💡 **アイデア**: リアルタイム
> コラボレーション機能を追加`}
                </pre>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <Coffee className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  プロティップス
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </h3>
                <p className="text-muted-foreground">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+K</kbd> (Mac: <kbd className="px-2 py-1 bg-muted rounded text-xs">Cmd+K</kbd>) 
                  でクイック検索を開き、素早くノート間を移動できます。
                  また、<kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+/</kbd> でショートカット一覧を表示できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}
