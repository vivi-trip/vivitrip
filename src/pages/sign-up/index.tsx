import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import PATH_NAMES from "@/src/constants/pathname";
import { useSignUp } from "@/src/queries/auth";
import useTempEmailStore from "@/src/stores/tempEmailStore";
import useUserStore from "@/src/stores/userStore";
import { SignUpProps } from "@/src/types/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignUpRoute = () => {
  const router = useRouter();
  const { userData } = useUserStore();
  const { mutate: signupFn, isPending: isPendingSignup } = useSignUp();
  const { email, clearEmail } = useTempEmailStore();

  const handleSignUp = async (data: SignUpProps) => {
    signupFn(data);
  };

  useEffect(() => {
    if (email) clearEmail();
  });

  useEffect(() => {
    if (userData) router.replace(PATH_NAMES.Root);
  }, [userData, router]);

  return (
    <div className="mx-auto min-h-main w-full max-w-640 py-48">
      <Form onSubmit={handleSignUp}>
        <Form.Title className="flex-col gap-16">
          <Logo size="lg" />
          <p>회원가입</p>
        </Form.Title>

        <Form.Field variant="email">
          <Form.Label>이메일</Form.Label>
          <Form.Input placeholder="이메일을 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="nickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Input placeholder="닉네임을 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Input placeholder="8자 이상 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="confirmPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Input placeholder="비밀번호를 한번 더 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="authPage">
          <Form.SubmitButton disabled={isPendingSignup}>
            회원가입
          </Form.SubmitButton>
        </Form.Field>
      </Form>

      <p className="mt-32 text-center">
        <span className="font-16px-regular text-gray-800">회원이신가요?</span>
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

export default SignUpRoute;
