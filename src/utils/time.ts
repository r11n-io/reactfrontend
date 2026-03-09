/**
 * @fileoverview 시간 관련 유틸리티 함수
 */
import { differenceInYears, formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 주어진 날짜 문자열을 "X시간 전" 형식으로 변환합니다.
 * @param {string} dateString ISO 형식의 날짜 문자열
 * @returns {string} 변환된 시간 정보 또는 오류 메시지
 */
export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return "날짜 정보 없음";

  const date = new Date(dateString);
  const now = new Date();

  const yearsAgo = differenceInYears(now, date);
  if (yearsAgo >= 1) return "1년 이상 경과";

  return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
};
