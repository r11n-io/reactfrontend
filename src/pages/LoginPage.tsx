import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { login } from "../api/AuthApi";
import { useAuth } from "../hooks/useAuth";
import type { LoginRequest } from "../types/Auth";
import { handleSuccess } from "../utils/notifier";

const customInputTheme = {
  field: {
    input: {
      base: "!bg-main/50 !text-primary-text !border-secondary-text/20 block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-lg transition-all",
      colors: {
        gray: "focus:!border-accent focus:!ring-accent/30",
      },
    },
  },
};

/**
 * 로그인 페이지 컴포넌트
 *
 * @returns 로그인 페이지 JSX
 */
const LoginPage: React.FC = () => {
  // 파라미터로 타입 정의
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // 인증 절차
    const credentials: LoginRequest = { email, password };

    try {
      const data = await login(credentials);

      contextLogin(data);

      handleSuccess("로그인되었습니다.", () => navigate("/"));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인 처리 중 알 수 없는 오류 발생");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-main flex min-h-[calc(100-64px)] items-center justify-center p-4">
      <Card className="bg-surface !border-secondary-text/10 w-full max-w-md p-2 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-primary-text text-3xl font-black tracking-tighter">
            r11n.io
          </h1>
          <p className="text-secondary-text mt-2 text-sm font-medium">Login</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                className="text-secondary-text text-xs font-bold tracking-wider uppercase"
              >
                이메일
              </Label>
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              theme={customInputTheme}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                className="text-secondary-text text-xs font-bold tracking-wider uppercase"
              >
                비밀번호
              </Label>
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              theme={customInputTheme}
            />
          </div>

          {error && (
            <div
              className="flex items-center rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500"
              role="alert"
            >
              <HiInformationCircle className="mr-3 h-5 w-5 shrink-0" />
              <div>
                <span className="font-bold">오류:</span> {error}
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="!bg-accent hover:!bg-accent-hover !text-on-accent shadow-accent/20 mt-2 border-none shadow-lg transition-all duration-300"
          >
            {isLoading ? "인증 중.." : "로그인"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
