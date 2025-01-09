import IconGoogle from "@/assets/svgs/ic_sns_google.svg";
import IconKakao from "@/assets/svgs/ic_sns_kakao.svg";
import PATH_NAMES from "@/src/constants/pathname";
import type {
  OauthActions,
  OauthSignButtonProps,
  OauthTypes,
} from "@/src/types/oauth";
import Link from "next/link";
import { ReactNode } from "react";

const OAUTH_ICONS: Record<OauthTypes, ReactNode> = {
  google: <IconGoogle alt="GOOGLE Login" />,
  kakao: <IconKakao alt="KAKAO Login" />,
};

export const KAKAO_OAUTH_LINKS: Record<OauthActions, string> = {
  in: PATH_NAMES.KakaoSignIn,
  up: PATH_NAMES.KakaoSignUp,
};

const OauthSignButton = ({ action, provider }: OauthSignButtonProps) => {
  const OAUTH_LINK: Record<OauthTypes, string> = {
    google: "",
    kakao: KAKAO_OAUTH_LINKS[action],
  };

  return (
    <Link
      href={OAUTH_LINK[provider]}
      className="flex size-72 items-center justify-center rounded-full border border-gray-100 bg-white">
      {OAUTH_ICONS[provider]}
    </Link>
  );
};

export default OauthSignButton;
