import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Editor } from "codemirror";
import type { Options } from "easymde";
import "easymde/dist/easymde.min.css";
import {
  Button,
  Card,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { HiOutlineCheck, HiOutlineRefresh } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMdeEditor from "react-simplemde-editor";
import { uploadImage } from "../api/ImageApi";
import { createPost, getPost, updatePost } from "../api/PostApi";
import { getAllSeries } from "../api/SeriesApi";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import MarkdownContent from "../components/ui/MarkdownContent";
import { handleError, handleSuccess } from "../utils/notifier";

const customInputTheme = {
  field: {
    input: {
      base: "!bg-main/50 !text-primary-text !border-secondary-text/20 block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-lg transition-all",
      colors: {
        gray: "focus:!border-accent focus:!ring-accent/30",
      },
    },
  },
};

const customSelectTheme = {
  field: {
    select: {
      base: "block w-full transition-all duration-200",
      colors: {
        gray: "!bg-surface !text-primary-text border-2 !border-secondary-text/20 focus:!border-accent focus:!ring-4 focus:!ring-accent/10 rounded-xl py-2.5",
      },
    },
  },
};

/**
 * 게시글 작성/수정 페이지 컴포넌트
 *
 * @returns 게시글 작성/수정 페이지 JSX
 */
const PostWritePage: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const isEditMode = useMemo(() => {
    const id = Number(postId);
    return !!postId && !isNaN(id) && id > 0;
  }, [postId]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("개발");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [seriesId, setSeriesId] = useState<number | null>(null);
  const [seriesOrder, setSeriesOrder] = useState<number | null>(null);
  // 미리보기는 버튼을 눌렀을 때만 갱신 (긴 글 입력 시 렌더링 부하 방지)
  const [previewContent, setPreviewContent] = useState("");
  const [codemirror, setCodemirror] = useState<Editor | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 시리즈 목록 조회
  const { data: allSeries = [] } = useQuery({
    queryKey: ["series", "all"],
    queryFn: getAllSeries,
  });

  // 수정 모드일 경우 기존 게시글 조회
  const { data: existingPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", postId ? Number(postId) : null],
    queryFn: () => getPost(Number(postId)),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (!existingPost) return;

    setTitle(existingPost.title);
    setContent(existingPost.content);
    setPreviewContent(existingPost.content);
    setCategory(existingPost.category);
    setTags(existingPost.tags.join(", "));
    setIsPrivate(existingPost.isPrivate);
    setSeriesId(existingPost.seriesId);
    setSeriesOrder(existingPost.seriesOrder);
  }, [existingPost]);

  // 에디터 스크롤 비율에 맞춰 미리보기 스크롤 동기화
  useEffect(() => {
    if (!codemirror) return;

    const handleScroll = () => {
      const preview = previewRef.current;
      if (!preview) return;

      const { top, height, clientHeight } = codemirror.getScrollInfo();
      const ratio = height > clientHeight ? top / (height - clientHeight) : 0;

      preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);
    };

    codemirror.on("scroll", handleScroll);

    return () => {
      codemirror.off("scroll", handleScroll);
    };
  }, [codemirror]);

  // 에디터 옵션
  const mdeOptions: Options = useMemo(() => {
    return {
      spellChecker: false,
      status: false,
      maxHeight: "65vh",
      toolbar: [
        "heading",
        "bold",
        "italic",
        "link",
        "image",
        "|",
        "table",
        "unordered-list",
        "ordered-list",
        "quote",
      ],
      // 미리보기는 별도 영역에서 제공하므로 내장 미리보기/전체화면 단축키 비활성화
      shortcuts: {
        togglePreview: null,
        toggleSideBySide: null,
        toggleFullScreen: null,
      },
      readOnly: false,
      placeholder: "여기에 내용을 작성하세요...",
      autofocus: true,
      uploadImage: true,
      imageAccept: "image/*",
      imageUploadText: "이미지 업로드 중...",
      imageErrorText: "이미지 업로드 실패",
      imageUploadFunction: async (
        file: File,
        onSuccess: (url: string) => void,
        onError: (error: string) => void,
      ) => {
        try {
          const imageUrl = await uploadImage(file);

          onSuccess(imageUrl);
        } catch (err) {
          console.error("업로드 에러:", err);
          onError("이미지 업로드에 실패했습니다.");

          handleError(err);
        }
      },
      codeMirror: {
        flattenSpans: false,
      },
    };
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const submitMutation = useMutation({
    mutationFn: () => {
      const savePost = {
        title,
        content,
        category,
        isPrivate,
        tags: tags.split(","),
        seriesId,
        seriesOrder,
      };

      return isEditMode
        ? updatePost(savePost, Number(postId))
        : createPost(savePost);
    },
    onSuccess: (savedPost) => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });

      if (isEditMode) {
        void queryClient.invalidateQueries({
          queryKey: ["post", Number(postId)],
        });
      }

      handleSuccess(`게시글 작성완료 [${savedPost.postId}]`, () =>
        void navigate("/posts"),
      );
    },
    onError: handleError,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    submitMutation.mutate();
  };

  const handleSyncPreview = () => {
    setPreviewContent(content);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    void navigate("/posts");
  };

  if (isEditMode && isLoadingPost) {
    return <LoadingSpinner size="lg" minHeight="200px" />;
  }

  return (
    <div className="mx-auto max-w-[2000px] px-4 py-10">
      <header className="border-secondary-text/10 mb-6 flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:items-end">
        <h1 className="text-primary-text text-4xl font-black tracking-tighter">
          새 글 작성
        </h1>
      </header>

      <Card className="!bg-surface !border-secondary-text/10 top-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-24 shrink-0">
            <Label
              htmlFor="title"
              className="text-secondary-text text-sm font-medium"
            >
              제목
            </Label>
          </div>
          <div className="flex-1">
            <TextInput
              id="title"
              type="text"
              placeholder="게시글 제목을 입력하세요."
              value={title}
              onChange={handleTitleChange}
              required
              theme={customInputTheme}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label
                htmlFor="category"
                className="text-secondary-text text-sm font-medium"
              >
                카테고리
              </Label>
            </div>
            <div className="flex-1">
              <Select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                theme={customSelectTheme}
              >
                <option>개발</option>
                <option>외국어</option>
                <option>독서</option>
                <option>영상 시청</option>
                <option>게임</option>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label
                htmlFor="isPrivate"
                className="text-secondary-text text-sm font-medium"
              >
                비밀글 여부
              </Label>
            </div>
            <div className="flex flex-1 items-center">
              <ToggleSwitch
                id="isPrivate"
                checked={isPrivate}
                onChange={setIsPrivate}
                label={isPrivate ? "비밀글 (Private)" : "공개글 (Public)"}
                theme={{
                  root: {
                    base: "flex items-center gap-3 cursor-pointer group",
                    active: {
                      on: "cursor-pointer",
                      off: "cursor-pointer",
                    },
                    label:
                      "text-sm font-bold text-secondary-text group-hover:text-primary-text transition-colors",
                  },
                  toggle: {
                    base: "relative rounded-full border border-secondary-text/20 transition-all duration-300",
                    checked: {
                      on: "!bg-accent !border-accent shadow-sm shadow-accent/20",
                      off: "!bg-secondary-text/10 !border-secondary-text/10",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label
                htmlFor="series-select"
                className="text-secondary-text text-sm font-medium"
              >
                시리즈
              </Label>
            </div>
            <div className="flex-1">
              <Select
                id="series-select"
                value={seriesId ?? ""}
                onChange={(e) =>
                  setSeriesId(e.target.value ? Number(e.target.value) : null)
                }
                required={false}
                theme={customSelectTheme}
              >
                <option value="">-- 선택 안 함 --</option>
                {allSeries.map((series) => (
                  <option key={series.seriesId} value={series.seriesId}>
                    {series.title}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label
                htmlFor="series-order"
                className="text-secondary-text text-sm font-medium"
              >
                시리즈 순서
              </Label>
            </div>
            <TextInput
              id="series-order"
              type="number"
              min="1"
              placeholder="시리즈 내 순서 (예: 1)"
              value={seriesOrder ?? ""}
              onChange={(e) => setSeriesOrder(Number(e.target.value))}
              disabled={seriesId === null}
              theme={customInputTheme}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-30 shrink-0">
            <Label
              htmlFor="tags"
              className="text-secondary-text text-sm font-medium"
            >
              태그 (쉼표로 구분)
            </Label>
          </div>
          <div className="flex-1">
            <TextInput
              id="tags"
              type="text"
              placeholder="예: Spring Boot, JWT, 성능 최적화"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              theme={customInputTheme}
            />
          </div>
        </div>

        <div className="mb-2 grid grid-cols-2 gap-x-6 gap-y-3">
          <div className="flex items-center">
            <Label
              htmlFor="content"
              className="text-secondary-text text-sm font-medium"
            >
              본문 내용 (Markdown)
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-secondary-text text-sm font-medium">
              미리보기
              {content !== previewContent && (
                <span className="text-accent ml-2 text-xs">변경사항 있음</span>
              )}
            </span>
            <Button
              size="xs"
              onClick={handleSyncPreview}
              className="!bg-accent hover:!bg-accent-hover !text-on-accent border-none"
            >
              <HiOutlineRefresh className="mr-1 h-4 w-4" />
              미리보기 갱신
            </Button>
          </div>

          <SimpleMdeEditor
            value={content}
            onChange={handleContentChange}
            options={mdeOptions}
            getCodemirrorInstance={setCodemirror}
            className="markdown-editor-simplemde min-w-0"
          />
          {/* 에디터 높이에 맞춰 늘어나고, 내용은 내부 스크롤 */}
          <div className="border-secondary-text/10 bg-main/50 relative min-w-0 rounded-lg border">
            <div
              ref={previewRef}
              className="custom-scrollbar absolute inset-0 overflow-y-auto px-6 py-4"
            >
              <MarkdownContent content={previewContent} linkHeadings={false} />
            </div>
          </div>
        </div>
      </Card>

      <div className="border-secondary-text/5 mt-3 flex justify-end gap-3 border-t">
        <Button
          onClick={handleCancel}
          className="!text-secondary-text hover:!bg-secondary-text/5 !border-secondary-text/20 !bg-transparent transition-all duration-200"
        >
          <span className="font-medium">취소</span>
        </Button>

        <Button
          onClick={handleSubmit}
          className="!bg-accent hover:!bg-accent/90 shadow-accent/20 border-none px-6 !text-white shadow-lg transition-all duration-300"
        >
          <HiOutlineCheck className="mr-2 h-5 w-5" />
          <span className="font-bold">등록</span>
        </Button>
      </div>
    </div>
  );
};

export default PostWritePage;
