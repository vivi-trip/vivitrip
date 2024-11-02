/* eslint-disable no-alert */
import Button from "@/src/components/Button/Button";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import PATH_NAMES from "@/src/constants/pathname";
import { useSignUp } from "@/src/queries/auth";
import useUserStore from "@/src/stores/userStore";
import { SignUpProps } from "@/src/types/user";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

const SignUp = () => {
  const { userData } = useUserStore();
  const router = useRouter();
  const { mutate: signup, isPending } = useSignUp();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const param = Object.fromEntries(formData) as unknown as SignUpProps;

    /**
     * @todo
     * 임시로 사용된 [ confirm, alert ]
     * Modal 컴포넌트로 작성하기
     */
    signup(param, {
      onSuccess() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("회원가입 성공!\n로그인 하시겠습니까?")) {
          /**
           * @todo
           * 바로 로그인 함수 요청하기
           */
          router.push(PATH_NAMES.SignIn);
        }
      },
      onError(error) {
        const { status } = error as AxiosError;
        if (status === 409) {
          alert("중복된 이메일입니다.");
        } else if (status && status >= 400 && status < 500) {
          alert("입력한 데이터를 확인해주세요.");
        }
      },
    });
  };

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
              id="signup_email"
              name="email"
              placeholder="이메일을 입력해 주세요"
              className="text-16px-regular focus:border-brand-400 min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all"
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="signup_name" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">닉네임</p>
            <input
              type="text"
              id="signup_name"
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              className="text-16px-regular focus:border-brand-400 min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all"
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="signup_pw" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">비밀번호</p>
            <input
              type="password"
              id="signup_pw"
              name="password"
              placeholder="비밀번호을 입력해 주세요"
              className="text-16px-regular focus:border-brand-400 min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all"
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="signup_pw_check" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">비밀번호 확인</p>
            <input
              type="password"
              id="signup_pw_check"
              name="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              className="text-16px-regular focus:border-brand-400 min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all"
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
            회원가입 하기
          </Button>
        </div>
      </form>

      <p className="mt-32 text-center">
        <span className="text-16px-regular text-gray-800">회원이신가요?</span>
        <Link
          href={PATH_NAMES.SignIn}
          className="text-brand-500 ml-8 underline underline-offset-2">
          로그인하기
        </Link>
      </p>

      <OauthSign action="up" />
    </div>
  );
};

export default SignUp;
