/**
 * @file Series.ts
 * @description 시리즈 관련 타입 정의
 */
import type { PostNavigationResponse } from "./Post";

/**
 * 시리즈 생성 요청 인터페이스
 */
export interface SeriesCreateRequest {
  /** 시리즈 제목 */
  title: string;
  /** 설명 */
  description: string;
}

/**
 * 시리즈 생성 응답 인터페이스
 */
export interface SeriesCreateResponse {
  /** 시리즈 ID */
  seriesId: number;
  /** 메시지 */
  message: string;
}

/**
 * 시리즈 목록 응답 인터페이스
 */
export interface SeriesResponse {
  /** 시리즈 ID */
  seriesId: number;
  /** 시리즈 제목 */
  title: string;
  /** 시리즈 설명 */
  description: string;
}

/**
 * 시리즈 상세 응답 인터페이스
 */
export interface SeriesDetailResponse {
  /** 시리즈 ID */
  seriesId: number;
  /** 시리즈 제목 */
  title: string;
  /** 시리즈 설명 */
  description: string;
  /** 시리즈에 속한 게시글 목록 (게시글 ID, 제목, 시리즈 내 순서 포함) */
  posts: PostNavigationResponse[];
}
