import Dropdown from "@/src/components/Dropdown";
import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import PATH_NAMES from "@/src/constants/pathname";
import TEST_USERS from "@/src/constants/testUsers";
import { useSignIn } from "@/src/queries/auth";
import useUserStore from "@/src/stores/userStore";
import { SignInProps } from "@/src/types/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignInRoute = () => {
  const router = useRouter();
  const { userData } = useUserStore();
  const { mutate: signinFn, isPending: isPendingSignin } = useSignIn();

  const handleSignIn = async (data: SignInProps) => {
    signinFn(data);
  };

  useEffect(() => {
    if (userData) router.replace(PATH_NAMES.Root);
  }, [userData, router]);

  return (
    <div className="mx-auto min-h-main w-full max-w-640 py-48">
      <Form onSubmit={handleSignIn} className="gap-16">
        <Form.Title className="flex-col gap-16">
          <Logo size="lg" />
        </Form.Title>

        <Form.Field variant="email">
          <Form.Label>이메일</Form.Label>
          <Form.Input placeholder="이메일을 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Input placeholder="8자 이상 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="authPage" className="mt-20">
          <Form.SubmitButton disabled={isPendingSignin}>
            로그인
          </Form.SubmitButton>
        </Form.Field>
      </Form>

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

export default SignInRoute;
