import axios from "axios";
import type { LoginRequest, TokenResponse } from "../types/Auth";

const BASE_PATH = "/api/auth";

/**
 * 로그인 요청
 * @param {LoginRequest} credentials - 로그인 요청 타입
 * @returns {Promise<TokenResponse>} - 로그인 성공 시 토큰 정보
 */
export const login = async (
  credentials: LoginRequest,
): Promise<TokenResponse> => {
  try {
    const response = await axios.post<TokenResponse>(
      `${import.meta.env.VITE_API_BASE_URL}${BASE_PATH}/login`,
      credentials,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "로그인에 실패했습니다.");
    }
    throw new Error("서버와 통신할 수 없습니다.");
  }
};

/**
 * 액세스 토큰 갱신
 * @returns {Promise<void>} - 토큰 갱신 완료 후 반환
 * @throws {Error} - 토큰 갱신 실패 시 발생하는 오류
 */
export const refreshAccessToken = async () => {
  const response = await axios.post<TokenResponse>(
    `${import.meta.env.VITE_API_BASE_URL}${BASE_PATH}/refresh`,
    {},
    { withCredentials: true },
  );

  localStorage.setItem("accessToken", response.data.accessToken);
};
