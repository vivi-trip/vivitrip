import Button from "@/src/components/Button/Button";
import Dropdown from "@/src/components/Dropdown";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import PATH_NAMES from "@/src/constants/pathname";
import TEST_USERS from "@/src/constants/testUsers";
import { useSignIn } from "@/src/queries/auth";
import useUserStore from "@/src/stores/userStore";
import { SignInProps } from "@/src/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SignIn = () => {
  const router = useRouter();
  const { userData } = useUserStore();
  const { mutate: signinFn, isPending: isPendingSignin } = useSignIn();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const param = Object.fromEntries(formData) as unknown as SignInProps;

    signinFn(param);
  };

  if (userData) return router.replace(PATH_NAMES.Root);

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <Logo size="lg" />

      <form className="mt-56 flex flex-col gap-32" onSubmit={handleSignIn}>
        <div className="relative">
          <label htmlFor="login_id" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">이메일</p>
            <input
              type="email"
              name="email"
              id="login_email"
              placeholder="이메일을 입력해 주세요"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="login_pw" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">비밀번호</p>
            <input
              type="password"
              name="password"
              id="login_password"
              placeholder="비밀번호을 입력해 주세요"
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
            disabled={isPendingSignin}
            className="disabled:bg-gray-500">
            로그인 하기
          </Button>
        </div>
      </form>

      <p className="mt-32 text-center">
        <span className="font-16px-regular text-gray-800">
          회원이 아니신가요?
        </span>
        <Link
          href={PATH_NAMES.SignUp}
          className="ml-8 text-brand-500 underline underline-offset-2">
          회원가입하기
        </Link>
      </p>

      <OauthSign action="in" />

      <div className="flex justify-end">
        <Dropdown>
          <Dropdown.Trigger>테스트 유저 로그인</Dropdown.Trigger>
          <Dropdown.Menu className="!bottom-full !left-auto !right-0 !top-auto !mb-4 !mt-0 flex flex-col gap-4 p-4">
            {TEST_USERS.map((item) => {
              return (
                <Dropdown.Item
                  key={`test_user_item_${item.email}`}
                  className="!rounded border border-brand-300 bg-brand-200 px-24 py-2 text-brand-500"
                  onClick={() => signinFn(item)}>
                  {item.nickname}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default SignIn;
