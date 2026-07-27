import { Badge, Button, Card } from "flowbite-react";
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  HiArrowDown,
  HiArrowLeft,
  HiArrowUp,
  HiCalendar,
  HiClock,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { deletePost, getPost } from "../api/PostApi";
import { getSeriesWithPosts } from "../api/SeriesApi";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import SeriesNavigator from "../components/ui/SeriesNavigator";
import { useAuth } from "../hooks/useAuth";
import type { PostDetailResponse } from "../types/Post";
import type { SeriesDetailResponse } from "../types/Series";
import { handleError, handleSuccess } from "../utils/notifier";
import { formatTimeAgo } from "../utils/time";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
  depth?: string;
}

/**
 * 게시글 상세 페이지 컴포넌트
 *
 * @returns 게시글 상세 페이지 JSX
 */
const PostDetailPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { postId } = useParams<{ postId: string }>();
  const postIdNumber = postId ? parseInt(postId, 10) : null;
  const [post, setPost] = useState<PostDetailResponse | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [seriesDetail, setSeriesDetail] = useState<SeriesDetailResponse | null>(
    null,
  );
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 최초 조회
  useEffect(() => {
    if (postIdNumber === null) return;

    // 게시글 조회
    const fetchPost = async () => {
      try {
        const data = await getPost(postIdNumber);

        setPost(data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchPost();
  }, [postIdNumber]);

  // 게시글 조회 완료 후
  useEffect(() => {
    // 본문 제목 태그 목차 생성
    const headings = document.querySelectorAll<HTMLHeadingElement>(
      ".prose h2, .prose h3, .prose h4, .prose h5, .prose h6",
    );
    const tocItems: TableOfContentsItem[] = [];
    const sectionNumbers: number[] = [0, 0, 0, 0, 0];

    headings.forEach((heading) => {
      if (!heading.id) return;

      const index = parseInt(heading.tagName.substring(1), 10) - 2;
      sectionNumbers[index] += 1;
      for (let i = index + 1; i < sectionNumbers.length; i++) {
        sectionNumbers[i] = 0;
      }
      const sectionNumber = sectionNumbers
        .slice(0, index + 1)
        .filter((num) => num > 0)
        .join(".");

      tocItems.push({
        id: heading.id,
        text: heading.innerText,
        level: parseInt(heading.tagName.substring(1), 10),
        depth: sectionNumber,
      });
    });

    setToc(tocItems);

    // 시리즈 아이디 있을 경우 조회
    if (post?.seriesId) {
      const fetchSeriesDetail = async () => {
        try {
          const data = await getSeriesWithPosts(post.seriesId);
          setSeriesDetail(data);
        } catch (error) {
          handleError(error);
        }
      };
      fetchSeriesDetail();
    }

    // 스크롤 이벤트
    const handleScroll = () => {
      const currentScrollPost = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setShowScrollTop(currentScrollPost > 300);
      setShowScrollBottom(currentScrollPost < maxScroll * 0.7);
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [post]);

  // 시리즈 조회 훅
  // useEffect(() => {}, [seriesDetail]);

  const handleGoback = () => {
    navigate(-1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    if (!mainContentRef.current) return;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const targetY = documentHeight - windowHeight - 80;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const handleModify = (e: FormEvent) => {
    e.preventDefault();

    if (window.confirm("이 게시글을 수정하시겠습니까?")) {
      navigate(`/posts/write/${postIdNumber}`);
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deletePost(postIdNumber!);

        handleSuccess("게시글이 성공적으로 삭제되었습니다.");
        navigate("/posts");
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="relative">
      <div
        ref={mainContentRef}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-12"
      >
        {post ? (
          // 게시글 정상 조회 시 렌더링
          <div className="flex min-w-0 flex-col items-start gap-8 lg:flex-row">
            {/* 상세 본문 영역 */}
            <main className="w-full min-w-0 flex-1">
              {/* 본문 2단 */}
              <div className="w-full min-w-0 lg:mx-auto lg:max-w-[970px]">
                <article className="w-full min-w-0 overflow-x-hidden break-words">
                  <Button
                    size="sm"
                    className="!text-secondary-text hover:!text-primary-text hover:!bg-secondary-text/10 group mb-6 border-none !bg-transparent transition-all duration-300"
                    onClick={handleGoback}
                  >
                    <HiArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-medium">이전 화면으로</span>
                  </Button>

                  {/* 포스트 제목 및 메타데이터 영역 */}
                  <header className="bg-surface border-secondary-text/5 mb-10 rounded-2xl border p-6 shadow-sm">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge
                        color="info"
                        className="!bg-accent/40 !text-accent mr-2 px-3 py-1 text-xs font-semibold uppercase"
                      >
                        {post.category}
                      </Badge>
                      {post.tags.map((tag) => (
                        <Badge
                          color="blue"
                          className="bg-accent hover:!bg-accent/80 text-tag-text rounded-md px-2 py-1 text-xs font-medium"
                          key={tag}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <h1 className="text-primary-text mb-4 text-2xl leading-tight font-black tracking-tight sm:text-4xl">
                      {post.title}
                    </h1>

                    <div className="text-secondary-text/60 border-secondary-text/5 mt-4 flex items-center gap-3 border-t pt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <HiCalendar className="h-4 w-4 opacity-70" />
                        <span>
                          {new Date(post.createAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="text-secondary-text/20">•</span>
                      <div className="flex items-center gap-1">
                        <HiClock className="h-4 w-4 opacity-70" />
                        <span>{`${formatTimeAgo(post.createAt)}`}</span>
                      </div>
                    </div>
                  </header>

                  {/* 마크다운 콘텐츠 영역 */}
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
                      children={post.content}
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                        [rehypeKatex],
                      ]}
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
                              {String(children).replace(/\n$/, "")}
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

                  <footer className="mt-4 border-t border-gray-300 p-4 dark:border-gray-700">
                    <Button
                      size="sm"
                      className="!text-secondary-text hover:!text-primary-text hover:!bg-secondary-text/10 group mb-6 border-none !bg-transparent transition-all duration-300"
                      onClick={handleGoback}
                    >
                      <HiArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      <span className="font-medium">이전 화면으로</span>
                    </Button>
                  </footer>
                </article>
              </div>
            </main>

            {/* 사이드바 영역 */}
            <aside className="sticky top-24 hidden w-[350px] shrink-0 xl:block">
              <div
                className="custom-scrollbar overflow-y-auto pr-2"
                style={{
                  height: "calc(100vh - 120px)",
                }}
              >
                <div className="space-y-6">
                  {/* 게시글 관리 영역 */}
                  {isAuthenticated && (
                    <Card className="!bg-surface !border-secondary-text/10 overflow-hidden shadow-sm">
                      <div className="border-secondary-text/5 flex items-center gap-2 border-b pb-3">
                        <div className="bg-accent h-4 w-1 rounded-full" />
                        <h6 className="text-primary-text font-bold tracking-tight">
                          게시글 관리
                        </h6>
                      </div>

                      <div className="flex flex-row gap-2">
                        <Button
                          size="sm"
                          onClick={handleModify}
                          className="!bg-accent/10 !text-accent hover:!bg-accent hover:shadow-accent/20 flex-1 border-none shadow-none transition-all duration-300 hover:!text-white hover:shadow-lg"
                        >
                          <HiOutlinePencil className="mr-2 h-4 w-4" />
                          <span className="text-sm font-semibold">수정</span>
                        </Button>

                        <Button
                          size="sm"
                          onClick={handleDelete}
                          className="flex-1 border-none !bg-red-500/5 !text-red-500 transition-all duration-300 hover:!bg-red-500 hover:!text-white"
                        >
                          <HiOutlineTrash className="mr-2 h-4 w-4" />
                          <span className="font-semibold">삭제</span>
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* 목차 영역 */}
                  {toc.length != 0 && (
                    <Card className="!bg-surface !border-secondary-text/10 top-6 shadow-sm">
                      <div className="border-secondary-text/5 mb-4 flex items-center gap-2 border-b pb-2">
                        <div className="bg-accent h-4 w-1 rounded-full" />
                        <h3 className="text-primary-text font-bold tracking-tight uppercase">
                          목차
                        </h3>
                      </div>

                      <ul className="mt-2 space-y-1">
                        {toc.map((item) => {
                          const getStyleByLevel = (level: number) => {
                            switch (level) {
                              case 2:
                                return "text-primary-text font-bold ml-0 py-1";
                              case 3:
                                return "text-secondary-text font-medium ml-3 text-[0.85rem] py-0.5";
                              case 4:
                                return "text-secondary-text/70 ml-6 text-[0.8rem] py-0.5";
                              default:
                                return "text-secondary-text/50 ml-9 text-[0.75rem] py-0.5";
                            }
                          };

                          return (
                            <li key={item.id} className="leading-tight">
                              <a
                                href={`#${item.id}`}
                                className={` ${getStyleByLevel(item.level)} hover:text-accent group relative block transition-all duration-200 hover:pl-2`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const target = document.getElementById(
                                    item.id,
                                  );
                                  if (target) {
                                    const headerOffset = 80;
                                    const elementPosition =
                                      target.getBoundingClientRect().top;
                                    const offsetPosition =
                                      elementPosition +
                                      window.pageYOffset -
                                      headerOffset;

                                    window.scrollTo({
                                      top: offsetPosition,
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                              >
                                <div className="bg-accent absolute top-1/2 left-[-8px] h-0 w-[2px] -translate-y-1/2 transition-all duration-300 group-hover:h-3/4" />

                                <span className="mr-3 inline-block w-4 text-center font-mono text-[0.75em] opacity-40">
                                  {item.depth}
                                </span>

                                <span className="decoration-accent/30 break-words underline-offset-4 hover:underline">
                                  {item.text}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </Card>
                  )}

                  {/* 시리즈 영역 */}
                  {post && post.seriesId && seriesDetail && (
                    <SeriesNavigator
                      seriesTitle={seriesDetail.title}
                      seriesPosts={seriesDetail.posts}
                      currentPostId={post.postId}
                      seriesDescription={seriesDetail.description}
                    />
                  )}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <LoadingSpinner size="lg" minHeight="80px" />
        )}
      </div>

      {/* 플로팅 버튼 그룹 */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col space-y-1">
        {showScrollTop && (
          <Button
            color="dark"
            pill
            size="lg"
            onClick={scrollToTop}
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            <HiArrowUp className="h-6 w-6" />
          </Button>
        )}

        {showScrollBottom && (
          <Button
            color="dark"
            pill
            size="lg"
            onClick={scrollToBottom}
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            <HiArrowDown className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
