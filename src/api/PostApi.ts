import type {
  PostCreateRequest,
  PostDetailResponse,
  PostListResponse,
  PostResponse,
  PostSearchCondition,
  PostUpdateRequest,
} from "../types/Post";
import apiClient from "./ApiClient";

const POSTS_PER_PAGE = 8;

/**
 * 게시글 생성
 * @param {PostCreateRequest} postData - 게시글 생성 요청 타입
 * @returns {Promise<PostResponse>} - 생성된 게시글 정보
 */
export const createPost = async (
  postData: PostCreateRequest,
): Promise<PostResponse> => {
  try {
    const response = await apiClient.post("/posts", postData);

    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw new Error("게시글 등록에 실패했습니다.");
  }
};

/**
 * 게시글 목록 조회
 * @param {number} page - 조회할 페이지 번호 (0부터 시작)
 * @param {PostSearchCondition} [condition] - 검색 조건 (선택 사항)
 * @returns {Promise<PostListResponse[]>} - 조회된 게시글 목록
 */
export const getPosts = async (
  page: number = 0,
  condition?: PostSearchCondition,
): Promise<PostListResponse[]> => {
  try {
    const response = await apiClient.get<PostListResponse[]>("/posts", {
      params: {
        page: page,
        size: POSTS_PER_PAGE,
        ...condition,
      },
    });

    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

/**
 * 게시글 상세 조회
 * @param {number} postId - 조회할 게시글의 ID
 * @returns {Promise<PostDetailResponse>} - 조회된 게시글 상세 정보
 */
export const getPost = async (postId: number): Promise<PostDetailResponse> => {
  try {
    const response = await apiClient.get<PostDetailResponse>(
      `/posts/${postId}`,
    );

    return response.data;
  } catch (error) {
    console.error("게시글 상세 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

/**
 * 게시글 총 건수 조회
 * @param {PostSearchCondition} [condition] - 검색 조건 (선택)
 * @returns {Promise<number>} - 게시글 총 건수
 */
export const getPostsCount = async (
  condition?: PostSearchCondition,
): Promise<number> => {
  try {
    const response = await apiClient.get<number>("/posts/count", {
      params: condition,
    });

    return response.data;
  } catch (error) {
    console.error("게시글 총 건수 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

/**
 * 게시글 수정
 * @param {PostUpdateRequest} postData - 게시글 수정 요청 타입
 * @param {number} postId - 수정할 게시글의 ID
 * @returns {Promise<PostResponse>} - 수정된 게시글 정보
 */
export const updatePost = async (
  postData: PostUpdateRequest,
  postId: number,
): Promise<PostResponse> => {
  try {
    const response = await apiClient.put(`/posts/${postId}`, postData);

    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw new Error("게시글 등록에 실패했습니다.");
  }
};

/**
 * 게시글 삭제
 * @param {number} postId - 삭제할 게시글의 ID
 */
export const deletePost = async (postId: number): Promise<void> => {
  try {
    await apiClient.delete(`/posts/${postId}`);
  } catch (error) {
    console.error("게시글 삭제 실패: ", error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
};
