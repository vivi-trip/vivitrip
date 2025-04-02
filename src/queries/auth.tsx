import PopupModal from "@/src/components/Modal/PopupModal";
import TwoButtonModal from "@/src/components/Modal/TwoButtonModal";
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
import useModalStore from "@/src/stores/useModalStore";
import useOauthSignStore from "@/src/stores/useOauthSignStore";
import useSignupLinkStore from "@/src/stores/useTempEmailStore";
import useUserStore from "@/src/stores/useUserStore";
import type { OauthTypes } from "@/src/types/oauth";
import type {
  SignInErrorResponseProps,
  SignInProps,
  SignInSuccessResponseProps,
  User,
} from "@/src/types/user";
import { getTokensFromCookies, setCookiesByTokens } from "@/src/utils/token";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
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
  const { setModalOpen, setModalClose } = useModalStore();

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
        setModalOpen(
          <TwoButtonModal
            onCancel={() => {
              setEmail(variables.email);
              router.push(PATH_NAMES.SignUp);
              setModalClose();
            }}
            title={
              <p>
                존재하지 않는 유저입니다.
                <br />
                회원가입 페이지로 이동하시겠습니까?
              </p>
            }
            negativeContent="아니오"
            interactiveContent="네"
          />,
        );
      } else if (status && status >= 400 && status < 500) {
        setModalOpen(<PopupModal title={data.message} />);
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
  const { setModalOpen, setModalClose } = useModalStore();

  return useMutation({
    mutationFn: signup,
    onSuccess(_, variables) {
      setModalOpen(
        <TwoButtonModal
          onCancel={() => {
            signinFn(variables as SignInProps);
            router.push(PATH_NAMES.SignIn);
            setModalClose();
          }}
          title={
            <p>
              회원가입 성공!
              <br />
              로그인 하시겠습니까?
            </p>
          }
          negativeContent="아니오"
          interactiveContent="네"
        />,
      );
    },
    onError(error) {
      const { response } = error as AxiosError;
      const { data, status } = response as SignInErrorResponseProps;
      if (status === 409) {
        setModalOpen(<PopupModal title="중복된 이메일입니다." />);
      } else if (status && status >= 400 && status < 500) {
        setModalOpen(<PopupModal title={data.message} />);
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
    onSuccess(data) {
      const user = data.data;
      setUserData(user as User);
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
    onSuccess() {
      router.replace(PATH_NAMES.Root);
      clearUser();
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
  const { setModalOpen, setModalClose } = useModalStore();

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
        setModalOpen(
          <TwoButtonModal
            onCancel={() => {
              router.push(PATH_NAMES.SignUp);
              setModalClose();
            }}
            title={
              <p>
                존재하지 않는 유저입니다.
                <br />
                회원가입 페이지로 이동하시겠습니까?
              </p>
            }
            negativeContent="아니오"
            interactiveContent="네"
          />,
        );
      } else if (status && status >= 400 && status < 500) {
        setModalOpen(<PopupModal title={data.message} />);
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
  const { setModalOpen, setModalClose } = useModalStore();

  return useMutation({
    mutationFn: oauthSignup,
    onSuccess() {
      setModalOpen(
        <TwoButtonModal
          onCancel={() => {
            window.location.href = PATH_NAMES.KakaoSignIn;
            setModalClose();
          }}
          title={
            <p>
              회원가입 성공!
              <br />
              로그인 하시겠습니까?
            </p>
          }
          negativeContent="아니오"
          interactiveContent="네"
        />,
      );
    },
    onError(error) {
      const { response } = error as AxiosError;
      const { data, status } = response as SignInErrorResponseProps;

      if (data.message === "이미 등록된 사용자입니다.") {
        setModalOpen(
          <PopupModal
            title={
              <p>
                {data.message}
                <br />
                잠시후 로그인 페이지로 이동합니다.
              </p>
            }
          />,
        );
        setTimeout(() => {
          router.replace(PATH_NAMES.SignIn);
        }, 3000);
      } else if (status && status >= 400 && status < 500) {
        setModalOpen(<PopupModal title={data.message} />);
      }
    },
    onSettled() {
      clearProfile();
    },
  });
};
