import Button from "@/src/components/Button/Button";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import PATH_NAMES from "@/src/constants/pathname";
import { useSignUp } from "@/src/queries/auth";
import useTempEmailStore from "@/src/stores/tempEmailStore";
import useUserStore from "@/src/stores/userStore";
import { SignUpProps } from "@/src/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

const SignUp = () => {
  const router = useRouter();
  const { userData } = useUserStore();
  const { mutate: signupFn, isPending: isPendingSignup } = useSignUp();
  const { email, clearEmail } = useTempEmailStore();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const param = Object.fromEntries(formData) as unknown as SignUpProps;

    signupFn(param);
  };

  useEffect(() => {
    if (email) clearEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userData) return router.replace(PATH_NAMES.Root);

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <Logo size="lg" />

      <form className="mt-56 flex flex-col gap-32" onSubmit={handleSignUp}>
        <div className="relative">
          <label htmlFor="signup_email" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">이메일</p>
            <input
              type="email"
              name="email"
              id="signup_email"
              placeholder="이메일을 입력해 주세요"
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
              defaultValue={email}
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="signup_nickname" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">닉네임</p>
            <input
              type="text"
              name="nickname"
              id="signup_nickname"
              placeholder="닉네임을 입력해 주세요"
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="signup_password" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">비밀번호</p>
            <input
              type="password"
              name="password"
              id="signup_password"
              placeholder="비밀번호을 입력해 주세요"
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
            />
          </label>
        </div>

        <div className="relative">
          <label
            htmlFor="signup_confirmPassword"
            className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">비밀번호 확인</p>
            <input
              type="password"
              name="confirmPassword"
              id="signup_confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
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
            disabled={isPendingSignup}
            className="disabled:bg-gray-500">
            회원가입 하기
          </Button>
        </div>
      </form>

      <p className="mt-32 text-center">
        <span className="text-16px-regular text-gray-800">회원이신가요?</span>
        <Link
          href={PATH_NAMES.SignIn}
          className="ml-8 text-brand-500 underline underline-offset-2">
          로그인하기
        </Link>
      </p>

      <OauthSign action="up" />
    </div>
  );
};

export default SignUp;
