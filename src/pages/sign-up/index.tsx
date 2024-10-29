import Button from "@/src/components/Button/Button";
import Logo from "@/src/components/Logo/Logo";
import OauthSign from "@/src/components/OauthSign";
import PATH_NAMES from "@/src/constants/pathname";
import useUserStore from "@/src/stores/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

const SignUp = () => {
  const { user } = useUserStore();
  const router = useRouter();

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("🚀 ~ handleSignUp ~ event:", event);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    console.log("🚀 ~ handleSignUp ~ data:", data);
  };
  if (user) return router.replace(PATH_NAMES.Root);

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
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-green-100"
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
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-green-100"
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
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-green-100"
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="signup_pw_check" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">비밀번호 확인</p>
            <input
              type="password"
              id="signup_pw_check"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              className="text-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-green-100"
            />
          </label>
        </div>

        <div className="relative">
          <Button
            type="submit"
            height="56"
            fullWidth
            radius="6"
            backgroundColor="green"
            fontStyle="xl"
            className="disabled:bg-gray-500">
            회원가입 하기
          </Button>
        </div>
      </form>

      <p className="mt-32 text-center">
        <span className="text-16px-regular text-gray-800">회원이신가요?</span>
        <Link
          href={PATH_NAMES.SignIn}
          className="ml-8 text-green-100 underline underline-offset-2">
          로그인하기
        </Link>
      </p>

      <OauthSign action="up" />
    </div>
  );
};

export default SignUp;
