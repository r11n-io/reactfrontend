/**
 * @fileoverview API 요청 결과에 따른 사용자 알림 및 에러 처리 유틸리티
 */
import { showToast } from "../services/ToastService";
import type { StandardizeError } from "../types/ProblemDetail";

/**
 * 성공적인 API 요청 처리
 * @param {string} message 사용자에게 보여줄 성공 메시지
 * @param {() => void} [natigationHandler] 추가적인 네비게이션 처리 함수
 */
export const handleSuccess = (
  message: string,
  natigationHandler?: () => void,
) => {
  showToast(message, "success");
  if (natigationHandler) {
    natigationHandler();
  }
};

/**
 * API 요청 실패 처리
 * @param {unknown} error API 요청 중 발생한 에러 객체
 * @returns {StandardizeError} 표준화된 에러 객체
 */
export const handleError = (error: unknown) => {
  const err = error as StandardizeError;
  let displayMessage = "알 수 없는 시스템 오류가 발생했습니다.";

  if (err.status) {
    switch (err.status) {
      case 400:
        displayMessage = "입력 양식을 확인해 주세요.";
        break;
      case 404:
        displayMessage = "요청하신 정보를 찾을 수 없습니다.";
        break;
      case 401:
        displayMessage = "로그인이 필요합니다.";
        break;
      case 500:
        displayMessage = "서버 처리 중 오류가 발생했습니다.";
        break;
      default:
        displayMessage = err.message || displayMessage;
    }
  } else {
    displayMessage = err.message || "네트워크 연결에 실패했습니다.";
  }

  showToast(displayMessage, "error");
  console.error("API Error Details :: ", error);

  return err;
};
