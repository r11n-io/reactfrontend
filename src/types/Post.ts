/**
 * @file Post.ts
 * @description 게시글 관련 타입 정의
 */

/**
 * 게시글 인터페이스
 */
export interface Post {
  /** 게시글 ID */
  id: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  content: string;
  /** 게시글 생성일 (ISO 8601 형식 날짜 문자열) */
  createAt: string;
}

/**
 * 게시글 생성 요청 인터페이스
 */
export interface PostCreateRequest {
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  content: string;
  /** 게시글 카테고리 */
  category: string;
  /** 게시글 공개 여부 */
  isPrivate: boolean;
  /** 게시글에 포함된 태그 목록 */
  tags: string[];
  /** 게시글 시리즈 ID (null이면 시리즈에 속하지 않음) */
  seriesId: number | null;
  /** 게시글 시리즈 순서 (null이면 시리즈에 속하지 않음) */
  seriesOrder: number | null;
}

/**
 * 게시글 검색 조건 인터페이스
 */
export interface PostSearchCondition {
  /** 태그 이름 */
  tagName?: string;
  /** 카테고리 이름 */
  category?: string;
  /** 검색 키워드 */
  keyword?: string;
}

/**
 * 게시글 응답 인터페이스 (게시글 생성 후 반환되는 데이터 구조)
 */
export interface PostResponse {
  /** 게시글 ID */
  postId: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  message: string;
}

/**
 * 게시글 목록 응답 인터페이스
 */
export interface PostListResponse {
  /** 게시글 ID */
  postId: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  content: string;
  /** 게시글 카테고리 */
  category: string;
  /** 게시글 공개 여부 */
  isPrivate: boolean;
  /** 게시글 생성일 (ISO 8601 형식 날짜 문자열) */
  createAt: string;
  /** 태그 목록 */
  tags: string[];
  /** 시리즈 ID */
  seriesId: number;
  /** 시리즈 제목 */
  seriesTitle: string;
  /** 시리즈 내 게시글 순서 */
  seriesOrder: number;
}

/**
 * 게시글 상세 응답 인터페이스
 */
export interface PostDetailResponse {
  /** 게시글 ID */
  postId: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  content: string;
  /** 게시글 카테고리 */
  category: string;
  /** 게시글 공개 여부 */
  isPrivate: boolean;
  /** 게시글 생성일 (ISO 8601 형식 날짜 문자열) */
  createAt: string;
  /** 태그 목록 */
  tags: string[];
  /** 시리즈 ID */
  seriesId: number;
  /** 시리즈 제목 */
  seriesTitle: string;
  /** 시리즈 내 게시글 순서 */
  seriesOrder: number;
}

/**
 * 시리즈 게시글 네비게이션 응답 인터페이스
 */
export interface PostNavigationResponse {
  /** 게시글 ID */
  postId: number;
  /** 게시글 제목 */
  title: string;
  /** 시리즈 ID */
  seriesOrder: number;
}

/**
 * 게시글 업데이트 요청 인터페이스
 */
export interface PostUpdateRequest {
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  content: string;
  /** 게시글 카테고리 */
  category: string;
  /** 게시글 공개 여부 */
  isPrivate: boolean;
  /** 태그 목록 */
  tags: string[];
  /** 시리즈 ID (null이면 시리즈에 속하지 않음) */
  seriesId: number | null;
  /** 시리즈  순서 (null이면 시리즈에 속하지 않음) */
  seriesOrder: number | null;
}
