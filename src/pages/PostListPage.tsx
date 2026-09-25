import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button, Pagination } from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { HiListBullet } from "react-icons/hi2";
import { Link, useSearchParams } from "react-router-dom";
import { getPosts, getPostsCount } from "../api/PostApi";
import { getTags } from "../api/TagApi";
import CategoryCard from "../components/ui/CategoryCard";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import PostCard from "../components/ui/PostCard";
import SeriesManageModal from "../components/ui/SeriesManageModal";
import TagCard from "../components/ui/TagCard";
import { useAuth } from "../hooks/useAuth";
import type { PostListResponse, PostSearchCondition } from "../types/Post";

const POSTS_PER_PAGE = 8;

/**
 * 게시글 목록 페이지 컴포넌트
 *
 * @returns 게시글 목록 페이지 JSX
 */
const PostListPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParam] = useSearchParams();
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false);

  const currentCondition: PostSearchCondition = useMemo(() => {
    return {
      tagName: searchParam.get("tagName") || undefined,
      category: searchParam.get("category") || undefined,
      keyword: searchParam.get("keyword") || undefined,
    };
  }, [searchParam]);

  // 검색 조건이 바뀌면 1페이지로
  useEffect(() => {
    setCurrentPage(1);

    // 게시판 구분 보여주기
    if (currentCondition.tagName) {
      setCurrentTitle(`#${currentCondition.tagName} 태그 게시글`);
    } else if (currentCondition.category) {
      setCurrentTitle(`${currentCondition.category} 게시글`);
    } else if (currentCondition.keyword) {
      setCurrentTitle(`'${currentCondition.keyword}' 검색 결과`);
    } else {
      setCurrentTitle("전체 게시글 목록");
    }
  }, [currentCondition]);

  // 게시글 목록 조회
  const { data: posts } = useQuery({
    queryKey: ["posts", currentCondition, currentPage],
    queryFn: () => getPosts(currentPage - 1, currentCondition),
    placeholderData: keepPreviousData,
  });

  // 게시글 총 건수 조회
  const { data: totalCount } = useQuery({
    queryKey: ["postsCount", currentCondition],
    queryFn: () => getPostsCount(currentCondition),
  });
  const totalPages = totalCount ? Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE)) : 1;

  // 게시글 태그 목록 조회
  const { data: allTags } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => setIsSeriesModalOpen(true);
  const handleCloseModal = () => setIsSeriesModalOpen(false);

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-5">
        {/* 좌측 게시글 영역 */}
        <aside className="flex flex-col gap-2 md:col-span-4">
          {/* 게시글 헤더 */}
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-primary-text text-2xl font-black tracking-tight">
              {currentTitle}
            </h2>
            {isAuthenticated && (
              <div className="hidden gap-2 xl:flex">
                <Button
                  onClick={handleOpenModal}
                  className="!bg-secondary-text/5 !text-secondary-text hover:!bg-secondary-text/10 border-none transition-all"
                >
                  <HiListBullet className="mr-2 h-4 w-4" />
                  시리즈 관리
                </Button>
                <Link to="write">
                  <Button className="!bg-accent hover:!bg-accent-hover !text-on-accent shadow-accent/20 border-none shadow-lg transition-all">
                    <HiPencil className="mr-2 h-4 w-4" />새 게시글 등록
                  </Button>
                </Link>
                {isSeriesModalOpen && (
                  <SeriesManageModal onClose={handleCloseModal} />
                )}
              </div>
            )}
          </div>

          <hr className="border-secondary-text/10 mb-8" />

          {/* 게시글 목록: 2열 그리드 */}

          {!posts ? (
            <LoadingSpinner size="lg" minHeight="80px" />
          ) : posts.length === 0 ? (
            <p className="text-secondary-text py-2 text-sm">
              등록된 게시물이 없습니다.
            </p>
          ) : (
            <div className="mb-2 grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((post: PostListResponse) => (
                <PostCard key={post.postId} post={post} />
              ))}
            </div>
          )}

          {/* 페이징 컴포넌트 자리: flowbite 컴포넌트 바로 쓰기 */}
          <div className="flex justify-center overflow-x-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
              nextLabel="다음"
              previousLabel="이전"
              theme={{
                pages: {
                  selector: {
                    base: "w-10 h-10 !bg-transparent !text-secondary-text hover:!bg-secondary-text/10 !border-none",
                    active: "!bg-accent/20 !text-accent !font-bold",
                  },
                },
              }}
            />
          </div>
        </aside>

        {/* 우측 카드 영역 */}
        <aside className="flex flex-col gap-4 md:col-span-1">
          <TagCard tags={allTags} />
          <div className="hidden xl:block">
            <CategoryCard />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostListPage;
