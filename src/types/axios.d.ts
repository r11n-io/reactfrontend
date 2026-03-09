import "axios";

/**
 * Axios 요청 구성 인터페이스 확장
 * - `_retryCount`는 요청 재시도 횟수를 추적하는 데 사용됩니다.
 */
declare module "axios" {
  export interface AxiosRequestConfig {
    _retryCount?: number;
  }
}
