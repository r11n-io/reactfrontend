import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleError } from "../utils/notifier";

/**
 * 전역 QueryClient
 * - 쿼리 실패 시 공통 에러 토스트 처리
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => handleError(error),
  }),
});
