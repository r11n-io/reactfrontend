/**
 * @file ToastTypes.ts
 * @description 토스트 메시지 관련 타입 정의
 */

/**
 * 토스트 메시지 상태 타입
 */
export type ToastStatus = "success" | "error" | "warning" | "info";

/**
 * 토스트 메시지 인터페이스
 */
export interface ToastMessage {
  /** 고유 ID */
  id: number;
  /** 메시지 내용 */
  message: string;
  /** 상태 */
  status: ToastStatus;
}
