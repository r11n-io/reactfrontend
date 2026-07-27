import { Badge, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import type { TagResponse } from "../../types/Tag";
import { LoadingSpinner } from "./LoadingSpinner";

interface TagCardProps {
  tags?: TagResponse[] | undefined;
}

/**
 * 해시태그 카드 컴포넌트
 *
 * @param props.tags 표시할 해시태그 목록
 * @returns 해시태그 카드 JSX
 */
const TagCard: React.FC<TagCardProps> = ({ tags }) => (
  <Card className="bg-surface border-secondary-text/10 shadow-none">
    <h5 className="text-primary-text text-xl font-bold tracking-normal">
      해시태그
    </h5>

    {!tags ? (
      <LoadingSpinner size="md" minHeight="80px" />
    ) : tags.length === 0 ? (
      <p className="text-secondary-text py-2 text-sm">
        등록된 태그가 없습니다.
      </p>
    ) : (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const params = new URLSearchParams();
          params.set("tagName", tag.name);
          const targetTo = `/posts?${params.toString()}`;

          return (
            <Link to={targetTo} key={tag.name}>
              <Badge className="bg-accent hover:!bg-accent/80 text-tag-text rounded-lg px-3 py-1 font-medium transition-opacity hover:opacity-80">
                #{tag.name}
              </Badge>
            </Link>
          );
        })}
      </div>
    )}
  </Card>
);

export default TagCard;
