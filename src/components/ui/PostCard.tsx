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
          <Badge className="!bg-accent/40 !text-accent mr-2 px-3 py-1 text-xs font-semibold uppercase">
            {post.category}
          </Badge>
          {post.tags.map((tag) => (
            <Badge
              className="bg-accent hover:!bg-accent/80 text-tag-text rounded-md px-2 py-1 text-xs font-medium"
              key={tag}
            >
              #{tag}
            </Badge>
          ))}
        </div>
        <span className="text-secondary-text text-xs">
          {formatTimeAgo(post.createAt)}
        </span>
      </div>

      <Link to={`/posts/${post.postId}`}>
        <h5 className="text-primary-text hover:text-accent mb-2 line-clamp-1 text-xl font-bold tracking-tight transition-colors">
          {post.title}
        </h5>
      </Link>

      <p className="text-secondary-text line-clamp-1 text-base font-normal tracking-tight">
        {stripMarkdown(post.content)}
      </p>

      <hr className="border-secondary-text/20 mt-4" />
    </div>
  );
};

export default PostCard;
