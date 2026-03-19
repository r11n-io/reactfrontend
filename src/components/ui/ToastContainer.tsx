import { Toast, ToastToggle } from "flowbite-react";
import { useEffect } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import type { ToastMessage } from "../../types/ToastTypes";

interface ToastContainerProps {
  messages: ToastMessage[];
  onClose: (id: number) => void;
}

const statusIcon = {
  success: { icon: HiCheck, color: "green" },
  error: { icon: HiX, color: "red" },
  warning: { icon: HiExclamation, color: "yellow" },
  info: { icon: HiExclamation, color: "blue" },
};

/**
 * 토스트 메시지 컨테이너 컴포넌트
 *
 * @param props.messages 표시할 토스트 메시지 목록
 * @param props.onClose 토스트 메시지 닫기 핸들러
 * @returns 토스트 메시지 JSX
 */
const ToastContainer: React.FC<ToastContainerProps> = ({
  messages,
  onClose,
}) => {
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        onClose(messages[0].id);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messages, onClose]);

  return (
    <div className="fixed right-6 bottom-6 z-[1000] flex flex-col gap-3">
      {messages.map((toast) => {
        const { icon: Icon } = statusIcon[toast.status];

        const statusColors = {
          success: "text-green-500 bg-green-500/10",
          error: "text-red-500 bg-red-500/10",
          warning: "text-yellow-500 bg-yellow-500/10",
          info: "text-accent bg-accent/10",
        };

        return (
          <Toast
            key={toast.id}
            className="!bg-surface !text-primary-text border-secondary-text/10 animate-slide-in border shadow-2xl"
          >
            <div className="flex w-full items-center pl-2">
              <div
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${statusColors[toast.status] || statusColors.info}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="ml-4 text-sm leading-tight font-medium">
                {toast.message}
              </div>

              <ToastToggle
                className="!text-secondary-text hover:!text-primary-text !bg-transparent transition-colors"
                onClick={() => onClose(toast.id)}
              />
            </div>

            <div
              className={`absolute bottom-0 left-0 h-1 w-full ${statusColors[toast.status].split(" ")[0].replace("text", "bg")}`}
            />
          </Toast>
        );
      })}
    </div>
  );
};

export default ToastContainer;
