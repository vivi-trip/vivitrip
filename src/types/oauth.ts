export type OauthActions = "in" | "up";

export interface OauthSignProps {
  action: OauthActions;
}

export type OauthTypes = "google" | "kakao";

export interface OauthTypeProps {
  provider: OauthTypes;
}

export type OauthKaKaoProfile = {
  nickname: string | "";
  profileImageUrl: string | "";
};

export interface OauthSignButtonProps extends OauthSignProps, OauthTypeProps {}

export interface OauthSignInProps extends OauthTypeProps {
  redirectUri: string;
  token: string;
}

export interface OauthSignUpProps extends OauthKaKaoProfile, OauthSignInProps {}
