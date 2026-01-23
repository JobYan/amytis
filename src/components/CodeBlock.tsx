"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface CodeBlockProps {
  language: string;
  children: string;
  [key: string]: any;
}

export default function CodeBlock({ language, children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg border border-muted/20 bg-background/50 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-muted/10 bg-muted/5">
        <span className="text-xs font-mono text-muted uppercase tracking-wider">
          {language || 'text'}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-muted hover:text-accent transition-colors duration-200 flex items-center gap-1"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Copied</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        PreTag="div"
        useInlineStyles={false}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: 'transparent',
          fontSize: '0.9rem',
          lineHeight: '1.6',
        }}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
