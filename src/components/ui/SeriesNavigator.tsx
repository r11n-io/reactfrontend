import { Card, ListGroup, ListGroupItem, Tooltip } from "flowbite-react";
import type React from "react";
import { useRef } from "react";
import { HiInformationCircle } from "react-icons/hi";

interface SeriesPostItem {
  postId: number;
  title: string;
  seriesOrder: number;
}

interface SeriesNavigatorProps {
  seriesTitle: string;
  seriesPosts: SeriesPostItem[];
  currentPostId: number;
  seriesDescription: string;
}

/**
 * 시리즈 내비게이터 컴포넌트
 *
 * @param props.seriesTitle 시리즈 제목
 * @param props.seriesPosts 시리즈에 포함된 게시글 목록
 * @param props.currentPostId 현재 보고 있는 게시글 ID
 * @param props.seriesDescription 시리즈 설명 (툴팁으로 표시)
 * @returns 시리즈 내비게이터 JSX
 */
const SeriesNavigator: React.FC<SeriesNavigatorProps> = ({
  seriesTitle,
  seriesPosts,
  currentPostId,
  seriesDescription,
}) => {
  const currentItemRef = useRef<HTMLDivElement>(null);

  return (
    <Card>
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        {seriesTitle} ({seriesPosts.length}건)
        <Tooltip content={seriesDescription} placement="top" style="light">
          <HiInformationCircle className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
        </Tooltip>
      </h3>
      <div className="h-[250px] overflow-y-auto rounded-lg border dark:border-gray-700">
        <ListGroup>
          {seriesPosts.map((post) => {
            const isCurrent = post.postId === currentPostId;

            return (
              <div key={post.postId} ref={isCurrent ? currentItemRef : null}>
                <ListGroupItem
                  href={`/posts/${post.postId}`}
                  className={`!p-3 ${
                    isCurrent
                      ? "bg-blue-100 font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate">
                      {post.seriesOrder}. {post.title}
                    </span>
                    {isCurrent && (
                      <span className="ml-2 text-xs text-blue-700 dark:text-blue-200">
                        (now)
                      </span>
                    )}
                  </div>
                </ListGroupItem>
              </div>
            );
          })}
        </ListGroup>
      </div>
    </Card>
  );
};

export default SeriesNavigator;
