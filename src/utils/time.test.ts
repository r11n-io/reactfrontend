import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatTimeAgo } from "./time";

describe("formatTimeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-10T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("날짜 정보가 없으면 안내 문구를 반환한다", () => {
    expect(formatTimeAgo("")).toBe("날짜 정보 없음");
  });

  it("1년 이상 지난 날짜는 '1년 이상 경과'로 표기한다", () => {
    expect(formatTimeAgo("2024-01-01T00:00:00.000Z")).toBe("1년 이상 경과");
  });

  it("1년 미만인 경우 상대 시간 문구를 반환한다", () => {
    const result = formatTimeAgo("2026-01-07T00:00:00.000Z");

    expect(result).not.toBe("1년 이상 경과");
    expect(result).toContain("전");
  });
});
