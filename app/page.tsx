import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container mx-auto p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">shadcn/ui テストページ</h1>
          <p className="text-muted-foreground text-lg">
            shadcn/uiコンポーネントの動作確認
          </p>
        </div>

        {/* ボタンのテスト */}
        <Card>
          <CardHeader>
            <CardTitle>Button コンポーネント</CardTitle>
            <CardDescription>
              様々なバリエーションのボタンをテストします
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button>デフォルト</Button>
              <Button variant="destructive">削除</Button>
              <Button variant="outline">アウトライン</Button>
              <Button variant="secondary">セカンダリ</Button>
              <Button variant="ghost">ゴースト</Button>
              <Button variant="link">リンク</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* カードのテスト */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>カード 1</CardTitle>
              <CardDescription>
                これは最初のテストカードです
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                shadcn/uiのCardコンポーネントが正しく動作していることを確認します。
                レスポンシブデザインも含めてテストしています。
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                詳細を見る
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>カード 2</CardTitle>
              <CardDescription>
                異なるスタイルのカードをテスト
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• TailwindCSSとの統合</li>
                <li>• ダークモード対応</li>
                <li>• レスポンシブデザイン</li>
                <li>• アクセシビリティ</li>
              </ul>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button size="sm">承認</Button>
              <Button variant="secondary" size="sm">
                キャンセル
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>カード 3</CardTitle>
              <CardDescription>
                最後のテストカード
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-2xl font-bold text-primary">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">
                  テスト完了率
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                リセット
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* 最終メッセージ */}
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold">
                🎉 shadcn/ui の導入が完了しました！
              </p>
              <p className="text-muted-foreground mt-2">
                すべてのコンポーネントが正常に動作しています。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
