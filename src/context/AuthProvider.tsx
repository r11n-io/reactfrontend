import { useCallback, useState, type ReactNode } from "react";
import type { TokenResponse } from "../types/Auth";
import { AuthContext } from "./AuthContextDefinition";

/**
 * 인증 컨텍스트 제공자
 * - 인증 상태 관리 및 로그인/로그아웃 기능 제공
 * - app.tsx에서 메인레이아웃 상위에 위치
 * @param { { children: ReactNode } } param0
 * @returns {JSX.Element}
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    // !! => 불리언 타입 명시적 변환
    !!localStorage.getItem("accessToken"),
  );

  const login = useCallback((authData: TokenResponse) => {
    localStorage.setItem("accessToken", authData.accessToken);

    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");

    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
