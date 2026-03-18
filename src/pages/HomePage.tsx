import { useEffect, useState } from "react";
import { getPosts } from "../api/PostApi";
import { getTags } from "../api/TagApi";
import CategoryCard from "../components/ui/CategoryCard";
import PostCard from "../components/ui/PostCard";
import TagCard from "../components/ui/TagCard";
import type { PostListResponse } from "../types/Post";
import type { TagResponse } from "../types/Tag";

/**
 * 홈페이지 컴포넌트
 *
 * @returns 홈페이지 컴포넌트 JSX
 */
const HomePage: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<PostListResponse[]>([]);
  const [allTags, setAllTags] = useState<TagResponse[]>([]);

  useEffect(() => {
    // 최신 게시물 조회
    const fetchLatestPosts = async () => {
      // TODO: 홈페이지용 API 추가해서 변경: 최신 3개만 조회+전체 글 갯수
      const post = await getPosts();

      setLatestPosts(post.slice(0, 4));
    };
    fetchLatestPosts();

    // 게시글 태그 목록 조회
    const fetchAllTags = async () => {
      const tags = await getTags();

      setAllTags(tags);
    };
    fetchAllTags();
  }, []);

  // 화면
  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* 메인 3열 그리드 컨테이너 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-5">
        {/* 좌측 카드 영역 */}
        <aside className="flex flex-col gap-4 md:col-span-1">
          <CategoryCard />
        </aside>

        {/* 중앙 게시글 목록 영역 */}
        <main className="md:col-span-3">
          <hr className="!border-secondary-text/10" />

          <p className="text-secondary-text my-4">
            최근 게시 총 <b>{latestPosts.length}</b> 건
          </p>

          <hr className="!border-secondary-text/10 mb-4" />

          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
              <div key={post.postId}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </main>

        {/* 우측 구분 영역 */}
        <aside className="md:col-span-1">
          <TagCard tags={allTags} />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
