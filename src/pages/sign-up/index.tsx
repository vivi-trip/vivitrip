import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import SignOptionSection from "@/src/components/SignOptionSection";
import PATH_NAMES from "@/src/constants/pathname";
import SignPageWrap from "@/src/containers/SignPageWrap";
import { useSignUp } from "@/src/queries/auth";
import useTempEmailStore from "@/src/stores/useTempEmailStore";
import useUserStore from "@/src/stores/userStore";
import { SignUpProps } from "@/src/types/user";
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
    <SignPageWrap>
      <Form onSubmit={handleSignUp}>
        <Form.Title className="flex-col gap-16">
          <Logo size="lg" />
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

      <SignOptionSection action="up" />

      <OauthSign action="up" />
    </SignPageWrap>
  );
};

export default SignUpRoute;
