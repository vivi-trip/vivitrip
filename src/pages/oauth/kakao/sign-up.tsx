import Button from "@/src/components/Button/Button";
import Logo from "@/src/components/Logo";
import PATH_NAMES from "@/src/constants/pathname";
import { useOauthSignUp } from "@/src/queries/auth";
import { UserNickName } from "@/src/types/user";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";

const OauthKakaoSignUpPage = () => {
  const responseParams = useSearchParams();
  const code = responseParams.get("code") ?? "";
  const { mutate, isPending } = useOauthSignUp();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { nickname } = Object.fromEntries(
      formData,
    ) as unknown as UserNickName;

    mutate({
      provider: "kakao",
      nickname,
      redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/sign-up`,
      token: code,
    });
  };

  if (!code) return null;

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <Logo size="lg" />

      <form className="mt-56 flex flex-col gap-32" onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="signup_nickname" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">닉네임</p>
            <input
              type="text"
              name="nickname"
              id="signup_nickname"
              placeholder="닉네임을 입력해 주세요"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
            />
          </label>
        </div>

        <div className="relative">
          <Button
            type="submit"
            height="56"
            fullWidth
            radius="6"
            backgroundColor="black"
            fontStyle="xl"
            disabled={isPending}
            className="disabled:bg-gray-500">
            카카오계정으로 회원가입 하기
          </Button>
        </div>
      </form>

      <p className="mt-32 text-center">
        <span className="font-16px-regular text-gray-800">회원이신가요?</span>
        <Link
          href={PATH_NAMES.SignIn}
          className="ml-8 text-brand-500 underline underline-offset-2">
          로그인하기
        </Link>
      </p>
    </div>
  );
};

export default OauthKakaoSignUpPage;
