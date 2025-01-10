import { KAKAO_OAUTH_LINKS } from "@/src/components/OauthSignButton";
import { useOauthSignIn, useOauthSignUp } from "@/src/queries/auth";
import { getKakaoToken, getKakaoUserInfo } from "@/src/services/auth";
import useOauthSignStore from "@/src/stores/oauthSignStore";
import { OauthActions } from "@/src/types/oauth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect } from "react";

export interface OauthKakaoSignProps {
  action: OauthActions;
}

const OauthKakaoSign = ({ action }: OauthKakaoSignProps) => {
  const router = useRouter();
  const responseParams = useSearchParams();
  const code = responseParams.get("code") ?? "";
  const { mutate: mutateSignIn, isPending: isPendingSignIn } = useOauthSignIn();
  const { mutate: mutateSignUp, isPending: isPendingSignUp } = useOauthSignUp();
  const { profile, setProfile } = useOauthSignStore();
  const btnKakaoStyle = `m-auto block w-full max-w-320 whitespace-nowrap rounded-4 bg-yellow-400 p-12 text-amber-950 disabled:bg-gray-500`;

  const handleRefresh = () => {
    router.replace(KAKAO_OAUTH_LINKS[action]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (profile === null) return;
    const { nickname, profileImageUrl } = profile;

    switch (action) {
      case "in":
        mutateSignIn({
          provider: "kakao",
          redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/sign-in`,
          token: code,
        });
        break;

      case "up":
        mutateSignUp({
          provider: "kakao",
          nickname,
          profileImageUrl,
          redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/sign-up`,
          token: code,
        });
        break;

      default:
        break;
    }
  };

  const fetchKakaoUser = async () => {
    try {
      const response = await getKakaoToken(action, code);
      const { data } = await getKakaoUserInfo(response.data.access_token);

      setProfile({
        nickname: data.kakao_account.profile.nickname ?? "",
        profileImageUrl: data.kakao_account.profile.profile_image_url ?? "",
      });

      handleRefresh();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    if (code) {
      if (profile === null) fetchKakaoUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, profile]);

  if (!code) return null;

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      {profile ? (
        <form className="mt-56 flex flex-col gap-32" onSubmit={handleSubmit}>
          <div className="relative flex flex-col items-center justify-center gap-8">
            <Image
              alt={`${profile.nickname} 프로필 이미지`}
              src={profile.profileImageUrl}
              width={64}
              height={64}
              className="rounded-full"
            />
            <p>{profile.nickname}</p>
          </div>

          <button
            type="submit"
            className={btnKakaoStyle}
            disabled={action === "in" ? isPendingSignIn : isPendingSignUp}>
            카카오계정으로 {action === "in" ? "로그인" : "회원가입"} 하기
          </button>
        </form>
      ) : (
        <button type="button" className={btnKakaoStyle} onClick={handleRefresh}>
          카카오 프로필 불러오기
        </button>
      )}
    </div>
  );
};

export default OauthKakaoSign;
