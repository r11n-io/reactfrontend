import type {
  SeriesCreateRequest,
  SeriesCreateResponse,
  SeriesDetailResponse,
  SeriesResponse,
} from "../types/Series";
import apiClient from "./ApiClient";

/**
 * 시리즈 생성
 * @param {SeriesCreateRequest} seriesData - 시리즈 생성에 필요한 데이터
 * @returns {Promise<SeriesCreateResponse>} - 생성된 시리즈 정보
 */
export const createSeries = async (
  seriesData: SeriesCreateRequest,
): Promise<SeriesCreateResponse> => {
  try {
    const response = await apiClient.post("/series", seriesData);

    return response.data;
  } catch (error) {
    console.error("시리즈 생성 실패: ", error);
    throw new Error("시리즈 생성에 실패했습니다.");
  }
};

/**
 * 시리즈 목록 조회
 * @returns {Promise<SeriesResponse[]>} - 조회된 시리즈 목록
 */
export const getAllSeries = async (): Promise<SeriesResponse[]> => {
  try {
    const response = await apiClient.get<SeriesResponse[]>("/series", {});

    return response.data;
  } catch (error) {
    console.error("시리즈 목록조회 실패: ", error);
    throw new Error("시리즈 목록조회에 실패했습니다.");
  }
};

/**
 * 시리즈 상세 조회 및 관련 게시글 목록 조회
 * @param {number} seriesId - 조회할 시리즈의 ID
 * @returns {Promise<SeriesDetailResponse>} - 조회된 시리즈 상세 정보 및 관련 게시글 목록
 */
export const getSeriesWithPosts = async (
  seriesId: number,
): Promise<SeriesDetailResponse> => {
  try {
    const response = await apiClient.get<SeriesDetailResponse>(
      `/series/${seriesId}`,
      {},
    );

    return response.data;
  } catch (error) {
    console.error("시리즈 상세조회 실패: ", error);
    throw new Error("시리즈 상세조회에 실패했습니다.");
  }
};

/**
 * 시리즈 삭제
 * @param {number} seriesId - 삭제할 시리즈의 ID
 */
export const deleteSeries = async (seriesId: number): Promise<void> => {
  try {
    await apiClient.delete(`/series/${seriesId}`);
  } catch (error) {
    console.error("시리즈 삭제 실패: ", error);
    throw new Error("시리즈 삭제에 실패했습니다.");
  }
};
