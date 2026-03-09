import { createContext } from "react";
import type { TokenResponse } from "../types/Auth";

/**
 * 인증 컨텍스트 타입 정의
 */
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (authData: TokenResponse) => void;
  logout: () => void;
}

/**
 * 인증 컨텍스트 생성
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
