import { Card } from "flowbite-react";
import { FaGamepad } from "react-icons/fa";
import {
  HiArrowRight,
  HiBookOpen,
  HiCode,
  HiPlay,
  HiTranslate,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Category {
  icon: React.ReactNode;
  label: string;
  isPrivate: boolean;
}

/**
 * 카테고리 카드 컴포넌트
 *
 * @returns 카테고리 카드 JSX
 */
const defaultCategories: Category[] = [
  {
    icon: <HiCode className="h-5 w-5" />,
    label: "개발",
    isPrivate: false,
  },
  {
    icon: <HiTranslate className="h-5 w-5" />,
    label: "외국어",
    isPrivate: false,
  },
  {
    icon: <HiBookOpen className="h-5 w-5" />,
    label: "독서",
    isPrivate: false,
  },
  {
    icon: <HiPlay className="h-5 w-5" />,
    label: "영상 시청",
    isPrivate: true,
  },
  {
    icon: <FaGamepad className="h-5 w-5" />,
    label: "게임",
    isPrivate: true,
  },
];

interface CategoryCardProps {
  categories?: Category[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categories = defaultCategories,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Card>
      <h5 className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
        카테고리 바로가기
      </h5>
      <div className="flex flex-col gap-1">
        {categories.map((cat) => {
          if (cat.isPrivate && !isAuthenticated) {
            return null;
          }

          const targetTo = `/posts?category=${encodeURIComponent(cat.label)}`;

          return (
            <Link
              to={targetTo}
              className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              key={cat.label}
            >
              <div className="flex items-center gap-3">
                {cat.icon}
                <span className="text-gray-900 dark:text-white">
                  {cat.label}
                </span>
              </div>
              <HiArrowRight className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default CategoryCard;
