/**
 * @file Tag.ts
 * @description 태그 관련 타입 정의
 */

/**
 * 태그 응답 인터페이스
 */
export interface TagResponse {
  /** 태그 ID */
  tagId: number;
  /** 태그 이름 */
  name: string;
}
