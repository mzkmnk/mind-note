import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});
const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  variable: "--font-noto-sans-jp"
});

export const metadata: Metadata = {
  title: "MindNote - Obsidianライクマークダウンメモアプリ",
  description: "マークダウン形式でメモを作成・管理できるWebアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.variable} ${notoSansJP.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
