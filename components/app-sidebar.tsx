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

const fileTree = [
  {
    name: "Welcome",
    icon: BookOpen,
    children: [
      { name: "はじめに", icon: FileText },
      { name: "クイックスタート", icon: FileText },
    ],
  },
  {
    name: "メモ",
    icon: FolderOpen,
    children: [
      { name: "アイデア", icon: FileText },
      { name: "TODOリスト", icon: FileText },
      { name: "議事録", icon: FileText },
    ],
  },
  {
    name: "プロジェクト",
    icon: FolderOpen,
    children: [
      { name: "Webアプリ開発", icon: FileText },
      { name: "ブログ記事", icon: FileText },
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
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-lg font-semibold">MindNote</h2>
          <Button size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="ノートを検索..." className="pl-8" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* ナビゲーション */}
        <SidebarGroup>
          <SidebarGroupLabel>ナビゲーション</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Network className="h-4 w-4" />
                  <span>グラフビュー</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Star className="h-4 w-4" />
                  <span>お気に入り</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Trash2 className="h-4 w-4" />
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
                          <SidebarMenuSubButton>
                            <file.icon className="h-4 w-4" />
                            <span>{file.name}</span>
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
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}