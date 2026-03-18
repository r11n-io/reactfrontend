import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import type { PostListResponse } from "../../types/Post";
import { formatTimeAgo } from "../../utils/time";

interface PostCardProps {
  post: PostListResponse;
}

const stripMarkdown = (content: string): string => {
  return content
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`(.+?)`/g, "$1")
    .replace(/[#*`>_-]/g, "")
    .replace(/[|:-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * 게시글 카드 컴포넌트
 *
 * @param props.post 게시글 데이터
 * @returns 게시글 카드 JSX
 */
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border-0 bg-transparent shadow-none">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
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
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatTimeAgo(post.createAt)}
        </span>
      </div>

      <Link to={`/posts/${post.postId}`}>
        <h5 className="mb-2 line-clamp-1 text-xl font-bold tracking-tight text-gray-900 hover:underline dark:text-white">
          {post.title}
        </h5>
      </Link>

      <p className="line-clamp-1 text-base font-normal tracking-tight text-gray-700 dark:text-gray-400">
        {stripMarkdown(post.content)}
      </p>

      <hr className="mt-4 border-gray-200 dark:border-gray-700" />
    </div>
  );
};

export default PostCard;
