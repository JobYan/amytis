import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '@/components/Mermaid';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
  latex?: boolean;
}

export default function MarkdownRenderer({ content, latex = false }: MarkdownRendererProps) {
  const remarkPlugins: any[] = [remarkGfm];
  const rehypePlugins: any[] = [rehypeRaw];

  if (latex) {
    remarkPlugins.push(remarkMath);
    rehypePlugins.push(rehypeKatex);
  }

  return (
    <div className="prose prose-lg max-w-none text-foreground
          prose-headings:font-serif prose-headings:text-heading 
          prose-p:text-foreground prose-p:leading-loose
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-heading prose-strong:font-semibold
          prose-code:text-accent prose-code:bg-muted/10 prose-code:px-1 prose-code:rounded
          prose-code:before:content-none prose-code:after:content-none
          prose-blockquote:italic
          prose-th:text-heading prose-td:text-foreground
          dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          // Use 'div' instead of 'p' to avoid hydration errors
          p: ({ children }) => <div className="mb-4 leading-relaxed text-foreground">{children}</div>,
          // Explicitly style lists to ensure contrast
          li: ({ children }) => <li className="text-foreground">{children}</li>,
          // Explicitly style blockquotes
          blockquote: ({ children }) => <blockquote className="text-foreground border-l-accent italic">{children}</blockquote>,
          // Explicitly style bold text
          strong: ({ children }) => <strong className="text-heading font-semibold">{children}</strong>,
          // Render 'pre' as a 'div' to allow block-level children
          pre: ({ children }) => <div className="not-prose">{children}</div>,
          // Style links individually to avoid hover-all issue
          a: (props) => <a {...props} className="text-accent no-underline hover:underline transition-colors duration-200" />,
          // Custom code renderer: handles 'mermaid' blocks and syntax highlighting
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isMultiLine = String(children).includes('\n');
            
            if (!inline && (match || isMultiLine)) {
              if (language === 'mermaid') {
                return <Mermaid chart={String(children).replace(/\n$/, '')} />;
              }
              return (
                <SyntaxHighlighter
                  style={oneLight}
                  language={language || 'text'}
                  PreTag="div"
                  customStyle={{
                    background: 'var(--background)',
                    border: '1px solid var(--muted)',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    padding: '1.5rem',
                    opacity: 0.9
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Ensure images are responsive and styled
          img: (props) => <img {...props} className="max-w-full h-auto rounded-lg my-4" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
