import Logo from "@/src/components/Logo";
import { useOauthSignIn } from "@/src/queries/auth";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const OauthKakaoSignInPage = () => {
  const responseParams = useSearchParams();
  const code = responseParams.get("code") ?? "";
  const { mutate } = useOauthSignIn();

  const handler = useCallback(async () => {
    if (!code) return;

    mutate({
      provider: "kakao",
      redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/sign-in`,
      token: code,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    handler();
  }, [handler]);

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <Logo size="lg" />
    </div>
  );
};

export default OauthKakaoSignInPage;
