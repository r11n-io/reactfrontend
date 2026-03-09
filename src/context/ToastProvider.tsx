import { useCallback, useEffect, useState, type ReactNode } from "react";
import ToastContainer from "../components/ui/ToastContainer";
import { ToastContext } from "../hooks/useToast";
import { registerToastFunction } from "../services/ToastService";
import type { ToastMessage, ToastStatus } from "../types/ToastTypes";

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * 토스트 컨텍스트 제공자
 * - 토스트 메시지 상태 관리 및 추가/제거 기능 제공
 * - app.tsx에서 메인레이아웃 상위에 위치
 * @param {ToastProviderProps} param0
 * @returns {JSX.Element}
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (message: string, status: ToastStatus) => {
      const newToast: ToastMessage = {
        id: Date.now(),
        message,
        status,
      };

      setMessages((prev) => [...prev, newToast]);
    },
    [setMessages],
  );

  const removeToast = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  useEffect(() => {
    registerToastFunction(addToast);
  }, [addToast]);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastContainer messages={messages} onClose={removeToast} />
    </ToastContext.Provider>
  );
};
