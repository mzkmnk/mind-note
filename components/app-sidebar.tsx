"use client"

import * as React from "react"
import {
  BookOpen,
  ChevronRight,
  FileText,
  FolderOpen,
  Hash,
  Network,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import Link from "next/link"

const fileTree = [
  {
    name: "Welcome",
    icon: BookOpen,
    children: [
      { name: "はじめに", icon: FileText, id: "welcome" },
      { name: "クイックスタート", icon: FileText, id: "quickstart" },
    ],
  },
  {
    name: "メモ",
    icon: FolderOpen,
    children: [
      { name: "アイデア", icon: FileText, id: "project-ideas" },
      { name: "TODOリスト", icon: FileText, id: "todo-list" },
      { name: "議事録", icon: FileText, id: "meeting-notes" },
    ],
  },
  {
    name: "プロジェクト",
    icon: FolderOpen,
    children: [
      { name: "Webアプリ開発", icon: FileText, id: "web-app-dev" },
      { name: "ブログ記事", icon: FileText, id: "blog-article" },
    ],
  },
]

const tags = [
  { name: "重要", count: 5 },
  { name: "アイデア", count: 12 },
  { name: "TODO", count: 8 },
  { name: "プロジェクト", count: 3 },
  { name: "メモ", count: 15 },
]

export function AppSidebar() {
  const [expandedFolders, setExpandedFolders] = React.useState<string[]>([])

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((name) => name !== folderName)
        : [...prev, folderName]
    )
  }

  return (
    <Sidebar className="glass">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MindNote
            </h2>
          </div>
          <Button size="icon" variant="ghost" className="card-hover w-8 h-8 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border-0">
            <Plus className="h-4 w-4 text-primary" />
          </Button>
        </div>
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="ノートを検索..." 
              className="pl-9 glass border-primary/20 focus:border-primary/40 placeholder:text-muted-foreground/70" 
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* ナビゲーション */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
            ナビゲーション
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="group card-hover rounded-lg">
                  <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 group-hover:from-green-500/20 group-hover:to-emerald-500/20 rounded transition-all">
                    <Network className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span>グラフビュー</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="group card-hover rounded-lg">
                  <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 group-hover:from-yellow-500/20 group-hover:to-orange-500/20 rounded transition-all">
                    <Star className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span>お気に入り</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="group card-hover rounded-lg">
                  <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-red-500/10 to-pink-500/10 group-hover:from-red-500/20 group-hover:to-pink-500/20 rounded transition-all">
                    <Trash2 className="h-3 w-3 text-red-600 dark:text-red-400" />
                  </div>
                  <span>ゴミ箱</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* ファイルエクスプローラー */}
        <SidebarGroup>
          <SidebarGroupLabel>ファイル</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {fileTree.map((folder) => (
                <SidebarMenuItem key={folder.name}>
                  <SidebarMenuButton
                    onClick={() => toggleFolder(folder.name)}
                  >
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        expandedFolders.includes(folder.name)
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                    <folder.icon className="h-4 w-4" />
                    <span>{folder.name}</span>
                  </SidebarMenuButton>
                  {expandedFolders.includes(folder.name) && (
                    <SidebarMenuSub>
                      {folder.children.map((file) => (
                        <SidebarMenuSubItem key={file.name}>
                          <SidebarMenuSubButton asChild>
                            <Link href={`/notes/${file.id}`}>
                              <file.icon className="h-4 w-4" />
                              <span>{file.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* タグ */}
        <SidebarGroup>
          <SidebarGroupLabel>タグ</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map((tag) => (
                <SidebarMenuItem key={tag.name}>
                  <SidebarMenuButton>
                    <Hash className="h-4 w-4" />
                    <span className="flex-1">{tag.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {tag.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>設定</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-sm text-muted-foreground">テーマ</span>
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}