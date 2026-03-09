import type { ToastStatus } from "../types/ToastTypes";

let addToastFunction: ((message: string, status: ToastStatus) => void) | null =
  null;

/**
 * 토스트 메시지 등록 함수
 * @param func - 토스트 메시지 추가 함수
 */
export const registerToastFunction = (
  func: (message: string, status: ToastStatus) => void,
) => {
  addToastFunction = func;
};

/**
 * 토스트 메시지 표시 함수
 * @param {string} message - 표시할 메시지
 * @param {ToastStatus} status - 메시지 상태 (success, error, info)
 */
export const showToast = (message: string, status: ToastStatus) => {
  if (addToastFunction) {
    addToastFunction(message, status);
  } else {
    console.warn(`ToastProvider가 등록되지 않았습니다.`);
  }
};
