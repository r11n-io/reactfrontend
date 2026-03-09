import type { ImageResponse } from "../types/Image";
import apiClient from "./ApiClient";

/**
 * 이미지 업로드
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<string>} - 업로드된 이미지의 URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post<ImageResponse>(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.url;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};
