import { Badge, Button, Card } from "flowbite-react";
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  HiArrowDown,
  HiArrowUp,
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
        className="mx-auto max-w-[1440px] px-6 lg:px-12"
      >
        {post ? (
          // 게시글 정상 조회 시 렌더링
          <div className="flex flex-col items-start gap-8 lg:flex-row">
            <main className="min-w-0 flex-1">
              <div className="max-w-[970px]">
                <Button
                  color="light"
                  size="sm"
                  className="mb-4"
                  onClick={handleGoback}
                >
                  이전 화면으로
                </Button>
                {/* 포스트 제목 및 메타데이터 영역 */}
                <header className="mb-6 rounded-lg bg-gray-200 p-4 pb-4 dark:bg-gray-800">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge
                      color="info"
                      className="mr-2 px-3 py-1 text-xs font-semibold uppercase"
                    >
                      {post.category}
                    </Badge>
                    {post.tags.map((tag) => (
                      <Badge
                        color="blue"
                        className="rounded-md px-2 py-1 text-xs font-medium"
                        key={tag}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="mb-2 text-2xl font-bold">{post.title}</h1>
                  <div className="mt-2 flex items-center text-sm text-gray-400 dark:text-gray-500">
                    <span>{new Date(post.createAt).toLocaleDateString()}</span>
                    <span className="mx-2">|</span>
                    <span>{`${formatTimeAgo(post.createAt)}`}</span>
                  </div>
                </header>

                {/* 마크다운 콘텐츠 영역 */}
                <div className="prose dark:prose-invert prose-lg max-w-none p-4">
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
                            customStyle={{
                              fontSize: "1rem",
                              lineHeight: "1.5",
                              borderRadius: "0.5rem",
                              margin: "1.5rem 0",
                              backgroundColor: "#1e1e1e",
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
                    color="light"
                    size="sm"
                    className="mb-4"
                    onClick={handleGoback}
                  >
                    이전 화면으로
                  </Button>
                </footer>
              </div>
            </main>

            <aside className="sticky top-24 hidden w-[350px] shrink-0 lg:block">
              <div
                className="custom-scrollbar overflow-y-auto pr-2"
                style={{
                  height: "calc(100vh - 120px)",
                }}
              >
                <div className="space-y-6">
                  {/* 게시글 관리 영역 */}
                  {isAuthenticated ? (
                    <Card>
                      <h6 className="text-lg font-bold tracking-normal text-gray-900 dark:text-white">
                        게시글 관리
                      </h6>
                      <div className="flex flex-row gap-2">
                        <Button color="blue" size="sm" onClick={handleModify}>
                          <HiOutlinePencil className="mr-2 h-5 w-5" />
                          수정
                        </Button>
                        <Button color="red" size="sm" onClick={handleDelete}>
                          <HiOutlineTrash className="mr-2 h-5 w-5" />
                          삭제
                        </Button>
                      </div>
                    </Card>
                  ) : null}

                  {/* 목차 영역 */}
                  {toc.length != 0 && (
                    <Card>
                      <h3 className="mb-3 text-lg font-semibold">목차</h3>
                      <ul className="mt-2 space-y-2">
                        {toc.map((item) => {
                          const getStyleByLevel = (level: number) => {
                            switch (level) {
                              case 2:
                                return "text-[0.95rem] font-bold ml-0";
                              case 3:
                                return "text-[0.85rem] font-medium ml-3";
                              case 4:
                                return "text-[0.8rem] text-gray-500 ml-6";
                              default:
                                return "text-[0.75rem] text-gray-400 ml-9";
                            }
                          };

                          return (
                            <li key={item.id} className="leading-tight">
                              <a
                                href={`#${item.id}`}
                                className={`${getStyleByLevel(item.level)} block transition-colors hover:text-blue-600 hover:underline dark:hover:text-blue-400`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const target = document.getElementById(
                                    item.id,
                                  );
                                  if (target) {
                                    target.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }}
                              >
                                <span className="mr-1.5 font-mono text-[0.8em] opacity-70">
                                  {item.depth}
                                </span>
                                {item.text}
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
          "조회 중.."
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
