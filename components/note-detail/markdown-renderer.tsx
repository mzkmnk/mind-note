"use client";

import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

// 簡単なマークダウン→HTML変換関数（後でライブラリに置き換え可能）
function markdownToHtml(markdown: string): string {
  return markdown
    // 見出し
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')
    // 太字・斜体
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // インラインコード
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    // リンク（基本的なもの）
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // ウィキリンク記法
    .replace(/\[\[([^\]]+)\]\]/g, '<a href="/notes/$1" class="text-purple-600 hover:underline">$1</a>')
    // リスト項目
    .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
    .replace(/^- \[ \] (.*$)/gim, '<li class="ml-4"><input type="checkbox" class="mr-2" disabled> $1</li>')
    .replace(/^- \[x\] (.*$)/gim, '<li class="ml-4"><input type="checkbox" class="mr-2" checked disabled> $1</li>')
    // 改行
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br>');
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // useEffectを使わず、propsの変更に応じて自動的に再計算される派生値
  const renderedHtml = useMemo(() => {
    const html = markdownToHtml(content);
    // 段落タグで囲む
    return `<p class="mb-4">${html}</p>`;
  }, [content]);

  return (
    <div 
      className="prose prose-gray max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}