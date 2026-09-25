let sessionExpiredHandler: (() => void) | null = null;

/**
 * 세션 만료 처리 함수 등록
 * @param handler - 세션 만료 시 호출할 함수
 */
export const registerSessionExpiredHandler = (handler: () => void) => {
  sessionExpiredHandler = handler;
};

/**
 * 세션 만료 알림
 * - 토큰 리프레시 실패 시 axios 인터셉터(React 트리 밖)에서 호출
 */
export const notifySessionExpired = () => {
  if (sessionExpiredHandler) {
    sessionExpiredHandler();
  } else {
    console.warn("AuthProvider가 등록되지 않았습니다.");
  }
};
