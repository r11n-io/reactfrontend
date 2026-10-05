import "katex/dist/katex.min.css";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { PluggableList } from "unified";

interface MarkdownContentProps {
  content: string;
  /** 헤딩을 앵커 링크로 감쌀지 여부 (미리보기에서는 URL 해시 변경 방지를 위해 끔) */
  linkHeadings?: boolean;
}

/**
 * 게시글 본문 마크다운 렌더링 컴포넌트
 * - 상세 페이지와 글쓰기 미리보기에서 동일한 렌더링 결과를 보장하기 위해 공용으로 사용
 *
 * @param props.content 마크다운 원문
 * @param props.linkHeadings 헤딩 앵커 링크 적용 여부 (기본값 true)
 * @returns 마크다운 본문 JSX
 */
const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  linkHeadings = true,
}) => {
  const rehypePlugins: PluggableList = linkHeadings
    ? [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypeKatex]
    : [rehypeSlug, rehypeKatex];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        width: "100%",
        overflowX: "hidden",
      }}
      className="prose dark:prose-invert prose-lg w-full max-w-full min-w-0 overflow-x-hidden"
    >
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={rehypePlugins}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isCodeBlock = !!match;

            return isCodeBlock ? (
              <SyntaxHighlighter
                language={match[1]}
                style={vscDarkPlus}
                PreTag="div"
                codeTagProps={{
                  style: {
                    padding: "0",
                    display: "inline",
                  },
                }}
                customStyle={{
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  borderRadius: "0.5rem",
                  margin: "1rem 0",
                  padding: "1rem",
                  backgroundColor: "#1e1e1e",
                  maxWidth: "100%",
                  width: "100%",
                  overflowX: "auto",
                  display: "block",
                  border: "none",
                }}
              >
                {String(children as string).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="rounded bg-gray-200 px-1.5 py-0.5 text-sm font-semibold text-red-500 dark:bg-gray-700 dark:text-red-400"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkdownContent;
