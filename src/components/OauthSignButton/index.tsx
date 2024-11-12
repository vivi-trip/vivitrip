import IconGoogle from "@/assets/svgs/ic_sns_google.svg";
import IconKakao from "@/assets/svgs/ic_sns_kakao.svg";
import { OauthSignButtonProps } from "@/src/types/oauth";
import Link from "next/link";

const OAUTH_ICONS = {
  google: <IconGoogle alt="GOOGLE Login" />,
  kakao: <IconKakao alt="KAKAO Login" />,
};

const OauthSignButton = ({ action, provider }: OauthSignButtonProps) => {
  const OAUTH_LINK = {
    google: "",
    kakao: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/sign-${action}`,
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
