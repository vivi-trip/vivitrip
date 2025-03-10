import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "@/src/services/Users";
import {
  ProfileImageUrlResponse,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from "@/src/types/Users";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * 현재 로그인한 사용자의 프로필 정보를 수정합니다.
 *
 * @async
 * @function updateUserProfile
 * @returns {Promise<UserProfileResponse>} - ("id",
  "email",
  "nickname",
  "profileImageUrl",
  "createdAt",
  "updatedAt")
 */
export const useGetUserProfile = () => {
  const { data, isLoading, error } = useQuery<UserProfileResponse>({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
  });

  return { data, isLoading, error };
};

/**
 * 현재 로그인한 사용자의 프로필 정보를 수정합니다.
 *
 * @returns {Object} 뮤테이션 객체
 * @property {Function} mutate - 프로필 수정 함수
 * @param {UpdateUserProfileRequest} updateData - 수정할 프로필 정보 (nickname, profileImageUrl, newPassword)
 */
export const useUpdatUserProfile = () => {
  const { mutate } = useMutation({
    mutationFn: (params: UpdateUserProfileRequest) => updateUserProfile(params),
  });
  return { mutate };
};

/**
 * 사용자의 프로필 이미지를 업로드합니다.
 *
 * @returns {Object} 뮤테이션 객체
 * @property {Function} mutate - 이미지 업로드 함수
 * @param {File} file - 업로드할 이미지 파일
 */
export const useUploadProfileImage = () => {
  const { mutate } = useMutation<ProfileImageUrlResponse, Error, File>({
    mutationFn: (file: File) => uploadProfileImage(file),
  });
  return { mutate };
};
