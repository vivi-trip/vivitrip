export interface UserProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export interface ProfileImageUrlResponse {
  profileImageUrl: string;
}
