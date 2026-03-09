/**
 * @file ProblemDetail.ts
 * @description API 오류 응답을 표준화하기 위한 ProblemDetail 인터페이스 정의
 * - RFC 7807에 기반한 오류 응답 구조를 정의.
 * - API에서 발생하는 오류를 일관된 형식으로 클라이언트에 전달하기 위해 사용.
 */

/**
 * API 오류 응답 인터페이스
 */
export interface ProblemDetail {
  /** 오류 제목 */
  title: string;
  /** HTTP 상태 코드 */
  status: number;
  /** 오류 상세 설명 */
  detail: string;
  /** 필드별 오류 메시지 */
  errors: Record<string, string>;
  /** 추가적인 메타데이터 */
  [key: string]: unknown;
}

/**
 * 표준화된 오류 객체 인터페이스
 */
export interface StandardizeError extends Error {
  /** HTTP 상태 코드 */
  status: number;
  /** 오류 제목 */
  title?: string;
  /** 오류 상세 설명 */
  errors?: Record<string, string>;
}
