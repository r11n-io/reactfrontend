import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition";

/**
 * 인증 컨텍스트 훅
 * @returns {AuthContextType} - 인증 관련 상태 및 함수
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth는 반드시 AuthProvider 내부에서 사용되어야 합니다.",
    );
  }

  return context;
};
