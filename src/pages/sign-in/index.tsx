import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import SignOptionSection from "@/src/components/SignOptionSection";
import PATH_NAMES from "@/src/constants/pathname";
import SignPageWrap from "@/src/containers/SignPageWrap";
import { useSignIn } from "@/src/queries/auth";
import useUserStore from "@/src/stores/useUserStore";
import { SignInProps } from "@/src/types/user";
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
    <SignPageWrap>
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

      <SignOptionSection action="in" />

      <OauthSign action="in" />
    </SignPageWrap>
  );
};

export default SignInRoute;
