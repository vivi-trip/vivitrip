import { UserNickName } from "@/src/types/user";

export interface OauthSignProps {
  action: "in" | "up";
}

export type OauthTypes = "google" | "kakao";

export interface OauthTypeProps {
  provider: OauthTypes;
}

export interface OauthSignButtonProps extends OauthSignProps, OauthTypeProps {}

export interface OauthSignInProps extends OauthTypeProps {
  redirectUri: string;
  token: string;
}

export interface OauthSignUpProps extends UserNickName, OauthSignInProps {}
