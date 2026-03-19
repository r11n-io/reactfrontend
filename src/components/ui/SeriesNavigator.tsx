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
    <Card className="!bg-surface !border-secondary-text/10 shadow-none">
      <div className="mb-3 flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <h3 className="text-primary-text truncate text-lg font-bold tracking-tight">
            <Tooltip content={seriesTitle} placement="top" style="light">
              {seriesTitle}
            </Tooltip>
          </h3>

          <span className="text-secondary-text shrink-0 text-sm font-normal">
            {" "}
            ({seriesPosts.length}건)
          </span>

          <Tooltip content={seriesDescription} placement="top" style="light">
            <HiInformationCircle className="text-secondary-text hover:text-accent h-5 w-5 cursor-pointer transition-colors" />
          </Tooltip>
        </div>
      </div>

      <div className="custom-scrollbar border-secondary-text/10 bg-main/30 h-[250px] overflow-y-auto rounded-lg border">
        <ListGroup className="!border-none !bg-transparent">
          {seriesPosts.map((post) => {
            const isCurrent = post.postId === currentPostId;

            return (
              <div key={post.postId} ref={isCurrent ? currentItemRef : null}>
                <ListGroupItem
                  href={`/posts/${post.postId}`}
                  className={`!border-none !p-3 transition-all duration-200 ${
                    isCurrent
                      ? "!bg-accent/15 !text-accent font-bold shadow-inner"
                      : "!text-primary-text hover:!bg-main hover:!pl-5"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate pr-2 text-sm">
                      {post.seriesOrder}. {post.title}
                    </span>
                    {isCurrent && (
                      <span className="text-accent ml-2 text-[10px] font-bold tracking-widest uppercase">
                        READING
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
