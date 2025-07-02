'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownDisplayProps {
  content: string;
}

export function MarkdownDisplay({ content }: MarkdownDisplayProps) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // コードブロックのカスタムレンダリング
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={oneDark}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // リンクのカスタムレンダリング（ウィキリンクを含む）
          a: ({ href, children }: any) => {
            if (href?.startsWith('[[') && href?.endsWith(']]')) {
              const linkText = href.slice(2, -2);
              return (
                <span className="text-blue-600 underline decoration-dotted cursor-pointer hover:decoration-solid">
                  {linkText}
                </span>
              );
            }
            return <a href={href}>{children}</a>;
          },
          // チェックボックスのスタイリング
          input: ({ type, checked, ...props }: any) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  disabled
                  className="mr-2"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          }
        }}
      >
        {processContent(content)}
      </ReactMarkdown>
    </div>
  );
}

// コンテンツの前処理（ウィキリンクとタグの変換）
function processContent(content: string): string {
  // ウィキリンクを一時的なマークダウンリンクに変換
  let processed = content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    return `[${linkText}]([[${linkText}]])`;
  });

  // タグをインラインコードとして表示（ハイライトのため）
  processed = processed.replace(/(^|\s)(#\w+)/g, (match, space, tag) => {
    return `${space}\`${tag}\``;
  });

  return processed;
}