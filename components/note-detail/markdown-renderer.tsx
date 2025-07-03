"use client";

import { useEffect, useState } from 'react';
import markdownHtml from 'zenn-markdown-html';
import 'zenn-content-css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // zenn-embed-elementsをクライアントサイドで動的読み込み
    import('zenn-embed-elements');
  }, []);

  useEffect(() => {
    const convertMarkdown = async () => {
      setIsLoading(true);
      try {
        // zenn-markdown-htmlでMarkdownをHTMLに変換
        const html = markdownHtml(content);
        setHtmlContent(html);
      } catch (error) {
        console.error('Markdown conversion error:', error);
        setHtmlContent('<p>マークダウンの変換中にエラーが発生しました。</p>');
      } finally {
        setIsLoading(false);
      }
    };

    convertMarkdown();
  }, [content]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-500">マークダウンを変換中...</div>
      </div>
    );
  }

  return (
    <div
      className="znc prose max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}