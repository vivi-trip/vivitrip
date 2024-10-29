export interface OauthSignProps {
  action: "in" | "up";
}

export interface OauthSignButtonProps extends OauthSignProps {
  provider: "kakao" | "google";
}
