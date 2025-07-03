"use client";

import { useMemo } from 'react';
import markdownHtml from 'zenn-markdown-html';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Zennの公式markdownパッケージを使用してHTML変換
  const renderedHtml = useMemo(() => {
    return markdownHtml(content);
  }, [content]);

  return (
    <div 
      className="znc" // Zennのスタイルを適用するために必要なクラス名
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}