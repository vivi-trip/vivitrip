/**
 * @todo
 * 임시로 사용된 [ confirm, alert ]
 * Modal 컴포넌트로 작성하기
 */

/* eslint-disable no-alert */

/* eslint-disable no-console */

/* eslint-disable no-restricted-globals */
import PATH_NAMES from "@/src/constants/pathname";
import {
  getUserInfo,
  oauthSignin,
  oauthSignout,
  oauthSignup,
  patchUserInfo,
  signin,
  signup,
} from "@/src/services/auth";
import useOauthSignStore from "@/src/stores/oauthSignStore";
import useSignupLinkStore from "@/src/stores/tempEmailStore";
import useUserStore from "@/src/stores/userStore";
import { OauthTypes } from "@/src/types/oauth";
import {
  SignInErrorResponseProps,
  SignInProps,
  SignInSuccessResponseProps,
  User,
} from "@/src/types/user";
import {
  deleteTokensFromCookies,
  getTokensFromCookies,
  setCookiesByTokens,
} from "@/src/utils/token";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

/**
 * @description - 로그아웃 함수
 * @returns - { handleSignOut }
 */
export const useSignOut = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const { clearProfile } = useOauthSignStore();

  const handleSignOut = () => {
    deleteTokensFromCookies();
    clearUser();
    clearProfile();
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
  const { setUserData } = useUserStore();
  const { setEmail } = useSignupLinkStore();

  return useMutation({
    mutationFn: signin,
    onSuccess(data) {
      const { data: response } = data as SignInSuccessResponseProps;
      const { accessToken, refreshToken, user } = response;
      setUserData(user);
      setCookiesByTokens({ accessToken, refreshToken });
      getTokensFromCookies();
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

/**
 * @description - 내 정보 조회
 * @returns - { mutate, isPending }
 */
export const useMyData = () => {
  return useQuery({
    queryKey: ["my-data"],
    queryFn: getUserInfo,
  });
};

/**
 * @description - 내 정보 수정
 * @returns - { mutate, isPending }
 */
export const useUpdateMyData = () => {
  const { setUserData } = useUserStore();

  return useMutation({
    mutationFn: patchUserInfo,
    onSuccess(data, variables) {
      console.log("🚀 ~ onSuccess ~ data, variables:", data, variables);
      const user = data.data;
      setUserData(user as User);
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error);
    },
  });
};

/**
 * @description - SNS 로그아웃 요청 함수
 * @returns - { mutate, isPending }
 */
export const useOauthSignOut = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: oauthSignout,
    onSuccess(data, variables) {
      console.log("🚀 ~ onSuccess ~ data, variables:", data, variables);
      clearUser();
      router.replace(PATH_NAMES.Root);
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error);
    },
  });
};

/**
 * @description - SNS 로그인 요청 함수
 * @returns - { mutate, isPending }
 */
export const useOauthSignIn = () => {
  const router = useRouter();
  const { setUserData, setUserProvider } = useUserStore();
  const { profile, clearProfile } = useOauthSignStore();

  return useMutation({
    mutationFn: oauthSignin,
    onSuccess(data, variables) {
      const { data: response } = data as SignInSuccessResponseProps;
      const { accessToken, refreshToken, user } = response;

      /** 카카오 프로필 적용 */
      if (profile) {
        user.nickname = profile.nickname;
        user.profileImageUrl = profile.profileImageUrl;
      }

      setCookiesByTokens({ accessToken, refreshToken });
      setUserData(user);
      setUserProvider(variables.provider as OauthTypes);
      router.replace(PATH_NAMES.Root);
    },
    onError(error) {
      const { response } = error as AxiosError;
      const { data, status } = response as SignInErrorResponseProps;
      if (response?.status === 404) {
        const answer = confirm(
          "존재하지 않는 유저입니다.\n회원가입 페이지로 이동하시겠습니까?",
        );
        if (answer) {
          router.push(PATH_NAMES.SignUp);
        }
      } else if (status && status >= 400 && status < 500) {
        alert(data.message);
      }
    },
    onSettled() {
      clearProfile();
    },
  });
};

/**
 * @description - SNS 회원가입 요청 함수
 * @returns - { mutate, isPending }
 */
export const useOauthSignUp = () => {
  const router = useRouter();
  const { clearProfile } = useOauthSignStore();

  return useMutation({
    mutationFn: oauthSignup,
    onSuccess(data, variables) {
      console.log("🚀 ~ onSuccess ~ data, variables:", data, variables);
      if (confirm("회원가입 성공!\n로그인 하시겠습니까?")) {
        // SNS 로그인 함수 실행
        window.location.href = PATH_NAMES.KakaoSignIn;
      }
    },
    onError(error) {
      const { response } = error as AxiosError;
      const { data, status } = response as SignInErrorResponseProps;

      if (data.message === "이미 등록된 사용자입니다.") {
        alert(`${data.message}\n로그인 페이지로 이동합니다.`);
        router.replace(PATH_NAMES.SignIn);
      } else if (status && status >= 400 && status < 500) {
        console.log(data.message);
      }
    },
    onSettled() {
      clearProfile();
    },
  });
};
