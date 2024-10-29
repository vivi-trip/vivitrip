import IconGoogle from "@/assets/svgs/ic_sns_google.svg";
import IconKakao from "@/assets/svgs/ic_sns_kakao.svg";
import { OauthSignProps } from "@/src/components/OauthSign";

const OAUTH_ICONS = {
  google: <IconGoogle alt="GOOGLE Login" />,
  kakao: <IconKakao alt="KAKAO Login" />,
};

export interface OauthSignButtonProps extends OauthSignProps {
  provider: "kakao" | "google";
}

const OauthSignButton = ({ action, provider }: OauthSignButtonProps) => {
  const handleSign = {
    in: () => {
      switch (provider) {
        case "kakao":
          /**
           * @todo
           * 카카오 로그인 구현
           */
          // eslint-disable-next-line no-alert
          alert("Kakao 로그인 준비중입니다.");
          break;

        case "google":
          /**
           * @todo
           * 구글 로그인 구현
           */
          // eslint-disable-next-line no-alert
          alert("Google 로그인 준비중입니다.");
          break;

        default:
          break;
      }
    },
    up: () => {
      switch (provider) {
        case "kakao":
          /**
           * @todo
           * 카카오 회원가입 구현
           */
          // eslint-disable-next-line no-alert
          alert("Kakao 회원가입 준비중입니다.");
          break;

        case "google":
          /**
           * @todo
           * 구글 회원가입 구현
           */
          // eslint-disable-next-line no-alert
          alert("Google 회원가입 준비중입니다.");
          break;

        default:
          break;
      }
    },
  };

  return (
    <button
      type="button"
      className="text-unset flex h-72 w-72 items-center justify-center rounded-full border border-gray-100 bg-white"
      onClick={handleSign[action]}>
      {OAUTH_ICONS[provider]}
    </button>
  );
};

export default OauthSignButton;
