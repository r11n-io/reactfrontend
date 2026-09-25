import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./AuthApi", () => ({
  refreshAccessToken: vi.fn(),
}));
vi.mock("../services/AuthEventService", () => ({
  notifySessionExpired: vi.fn(),
}));

import { notifySessionExpired } from "../services/AuthEventService";
import apiClient from "./ApiClient";
import { refreshAccessToken } from "./AuthApi";

describe("apiClient 401 인터셉터", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    vi.mocked(refreshAccessToken).mockReset();
    vi.mocked(notifySessionExpired).mockReset();
  });

  afterEach(() => {
    mock.restore();
  });

  it("401 응답 후 리프레시에 성공하면 원 요청을 재시도한다", async () => {
    localStorage.setItem("accessToken", "expired-token");

    let callCount = 0;
    mock.onGet("/posts/1").reply(() => {
      callCount += 1;

      return callCount === 1 ? [401] : [200, { postId: 1 }];
    });

    vi.mocked(refreshAccessToken).mockImplementation(async () => {
      localStorage.setItem("accessToken", "new-token");
    });

    const response = await apiClient.get("/posts/1");

    expect(response.data).toEqual({ postId: 1 });
    expect(refreshAccessToken).toHaveBeenCalledTimes(1);
    expect(callCount).toBe(2);
  });

  it("리프레시 실패 시 세션 만료를 알리고 accessToken을 제거한다", async () => {
    localStorage.setItem("accessToken", "expired-token");
    mock.onGet("/posts/1").reply(401);

    vi.mocked(refreshAccessToken).mockRejectedValue(
      new Error("refresh failed"),
    );

    await expect(apiClient.get("/posts/1")).rejects.toThrow("refresh failed");

    expect(notifySessionExpired).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("accessToken")).toBeNull();
  });
});
