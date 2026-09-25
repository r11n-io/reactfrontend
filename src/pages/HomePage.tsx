import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/PostApi";
import { getTags } from "../api/TagApi";
import CategoryCard from "../components/ui/CategoryCard";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import PostCard from "../components/ui/PostCard";
import TagCard from "../components/ui/TagCard";

/**
 * 홈페이지 컴포넌트
 *
 * @returns 홈페이지 컴포넌트 JSX
 */
const HomePage: React.FC = () => {
  const { data: latestPosts } = useQuery({
    queryKey: ["posts", "latest"],
    queryFn: async () => {
      const posts = await getPosts();

      return posts.slice(0, 4);
    },
  });

  const { data: allTags } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  // 화면
  return (
    <div className="mx-auto px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* 메인 3열 그리드 컨테이너 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        {/* 좌측 카드 영역 */}
        <aside className="hidden flex-col xl:col-span-1 xl:flex">
          <CategoryCard />
        </aside>

        {/* 중앙 게시글 목록 영역 */}
        <main className="col-span-1 xl:col-span-3">
          <hr className="!border-secondary-text/10" />

          {!latestPosts ? (
            <p className="text-secondary-text my-2">조회 중..</p>
          ) : (
            <p className="text-secondary-text my-2">
              최근 게시 총 <b>{latestPosts.length}</b> 건
            </p>
          )}

          <hr className="!border-secondary-text/10 mb-4" />

          {!latestPosts ? (
            <LoadingSpinner size="lg" minHeight="80px" />
          ) : latestPosts.length === 0 ? (
            <p className="text-secondary-text py-2 text-sm">
              등록된 게시물이 없습니다.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {latestPosts.map((post) => (
                <div key={post.postId}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </main>

        {/* 우측 구분 영역 */}
        <aside className="order-last col-span-1 xl:order-none xl:col-span-1">
          <TagCard tags={allTags} />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
