/**
 * @file Auth.ts
 * @description 인증 관련 타입 정의
 */

/**
 * 로그인 요청 인터페이스
 */
export interface LoginRequest {
  /** 사용자 이메일 */
  email: string;
  /** 사용자 비밀번호 */
  password: string;
}

/**
 * 토큰 응답 인터페이스
 */
export interface TokenResponse {
  /** 인증 토큰 (JWT) */
  accessToken: string;
  /** 토큰 만료 시간 (ISO 8601 형식) */
  userId: number;
}

/**
 * 인증 상태 인터페이스
 */
export interface AuthState {
  /** 로그인 여부 */
  isLoggedIn: boolean;
  /** 사용자 정보 (로그인한 경우) */
  user: {
    email: string;
    role: "USER" | "ADMIN" | "GUEST";
  } | null;
  /** 인증 처리 중 여부 */
  isLoading: boolean;
}
