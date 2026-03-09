/**
 * @file Image.ts
 * @description 이미지 업로드 및 응답 관련 타입 정의
 */

/**
 * 이미지 업로드 요청 인터페이스
 */
export interface ImageResponse {
  /** 이미지 URL */
  url: string;
  /** 원본 파일 이름 */
  originalName: string;
}
