import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="ja">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
