import { AxiosHeaders } from "axios";

export interface UserId {
  id: number;
}

export interface UserEmail {
  email: string;
}

export interface UserNickName {
  nickname: string;
}

export interface UserPassword {
  password: string;
}

export interface UserNewPassword {
  newPassword: string;
}

export interface ProfileImageUrl {
  url: string;
  name: string;
}

export interface User extends UserId, UserEmail, UserNickName {
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyPageProps {
  handleSubmit: (data: UserPatchProps) => void;
  isPending: boolean;
}

export interface UserPatchProps extends UserNickName, UserNewPassword {
  profileImageUrl: string;
}

export interface SignUpProps extends UserEmail, UserNickName, UserPassword {}

export interface SignInProps extends UserEmail, UserPassword {}

export interface SignInSuccessResponseProps {
  config: object;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface SignInErrorResponseProps {
  config: object;
  data: { message: string };
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
