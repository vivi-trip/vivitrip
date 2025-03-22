import api from "./axios";
import {
  ProfileImageUrlResponse,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from "@/src/types/users";

/**
 * 현재 로그인한 사용자의 프로필 정보를 가져옵니다.
 *
 * @async
 * @function getUserProfile
 * @returns {Promise<UserProfileResponse>} - ("id",
  "email",
  "nickname",
  "profileImageUrl",
  "createdAt",
  "updatedAt")
 */
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await api.get("users/me");
  return response.data;
};

/**
 * 현재 로그인한 사용자의 프로필 정보를 수정합니다.
 *
 * @async
 * @function updateUserProfile
 * @param updateData - (nickname, profileImageUrl, newPassword )
 * @returns {Promise<UserProfileResponse>} - ("id",
  "email",
  "nickname",
  "profileImageUrl",
  "createdAt",
  "updatedAt")
 */
export const updateUserProfile = async (
  updateData: UpdateUserProfileRequest,
): Promise<UserProfileResponse> => {
  const response = await api.patch("users/me", updateData);
  return response.data;
};

/**
 * 사용자의 프로필 이미지를 업로드합니다.
 *
 * @async
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<ProfileImageUrlResponse>} 업로드된 이미지의 URL을 포함한 응답
 */
export const uploadProfileImage = async (
  file: File,
): Promise<ProfileImageUrlResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("users/me/image", formData);
  return response.data;
};
