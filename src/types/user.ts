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
  password: number;
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

export interface SignUpProps extends UserEmail, UserNickName, UserPassword {}

export interface SignInProps extends UserEmail, UserPassword {}
