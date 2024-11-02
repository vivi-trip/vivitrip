/* eslint-disable no-restricted-globals */

/* eslint-disable no-alert */

/**
 * @todo
 * 임시로 사용된 [ confirm, alert ]
 * Modal 컴포넌트로 작성하기
 */
import useSignupLinkStore from "../stores/tempEmailStore";
import PATH_NAMES from "@/src/constants/pathname";
import { signin, signup } from "@/src/services/auth";
import useUserStore from "@/src/stores/userStore";
import {
  SignInErrorResponseProps,
  SignInProps,
  SignInSuccessResponseProps,
} from "@/src/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

/**
 * @description - 로그아웃 함수
 * @returns - { handleSignOut }
 */
export const useSignOut = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleSignOut = () => {
    clearUser();
    router.replace(PATH_NAMES.Root);
  };

  return { handleSignOut };
};

/**
 * @description - 로그인 요청 함수
 * @returns - { mutate, isPending }
 */
export const useSignIn = () => {
  const router = useRouter();
  const { setUserData, setTokens } = useUserStore();
  const { setEmail } = useSignupLinkStore();

  return useMutation({
    mutationFn: signin,
    onSuccess(data) {
      const { data: response } = data as SignInSuccessResponseProps;
      const { accessToken, refreshToken, user } = response;

      setUserData(user);
      setTokens(accessToken, refreshToken);

      router.replace(PATH_NAMES.Root);
    },
    onError(error, variables) {
      const { response } = error as AxiosError;
      const { data, status } = response as SignInErrorResponseProps;

      if (response?.status === 404) {
        const answer = confirm(
          "존재하지 않는 유저입니다.\n회원가입 페이지로 이동하시겠습니까?",
        );
        if (answer) {
          setEmail(variables.email);
          router.push(PATH_NAMES.SignUp);
        }
      } else if (status && status >= 400 && status < 500) {
        alert(data.message);
      }
    },
  });
};

/**
 * @description - 회원가입 요청 함수
 * @returns - { mutate, isPending }
 */
export const useSignUp = () => {
  const router = useRouter();
  const { mutate: signinFn } = useSignIn();

  return useMutation({
    mutationFn: signup,
    onSuccess(_, variables) {
      if (confirm("회원가입 성공!\n로그인 하시겠습니까?")) {
        signinFn(variables as SignInProps);
        router.push(PATH_NAMES.SignIn);
      }
    },
    onError(error) {
      const { response } = error as AxiosError;
      const { data, status } = response as SignInErrorResponseProps;

      if (status === 409) {
        alert("중복된 이메일입니다.");
      } else if (status && status >= 400 && status < 500) {
        alert(data.message);
      }
    },
  });
};
