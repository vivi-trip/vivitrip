import api from "./axios";
import { OauthSignInProps, OauthSignUpProps } from "@/src/types/oauth";
import { SignInProps, SignUpProps, UserPatchProps } from "@/src/types/user";
import axios from "axios";

export const signup = async (param: SignUpProps) => {
  const response = await api.post("/users", param);
  return response;
};

export const signin = async (param: SignInProps) => {
  const response = await api.post("/auth/login", param);
  return response;
};

export const getUserInfo = async () => {
  const response = await api.get("/users/me");
  return response;
};

export const patchUserInfo = async (param: UserPatchProps) => {
  const response = await api.patch("/users/me", param);
  return response;
};

export const oauthSignup = async (params: OauthSignUpProps) => {
  const { provider, ...param } = params;
  const response = await api.post(`/oauth/sign-up/${provider}`, param);
  return response;
};

export const oauthSignin = async (params: OauthSignInProps) => {
  const { provider, ...param } = params;
  const response = await api.post(`/oauth/sign-in/${provider}`, param);
  return response;
};

export const oauthSignout = async () => {
  const response = await axios.get(
    `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=http://localhost:3000`,
  );
  return response;
};

/**
 * @description - 카카오 계정 목록
 */
export const listKakaoUsers = async () => {
  const response = await axios.get("https://kapi.kakao.com/v1/user/ids", {
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
    },
  });
  return response;
};

/**
 * @description - 카카오 연결 끊기
 * @param user_id - 사용자 아이디
 */
export const deleteKakaoUser = async (user_id: number) => {
  const response = await axios.post(
    "https://kapi.kakao.com/v1/user/unlink",
    null,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        target_id_type: "user_id",
        target_id: user_id,
      },
    },
  );
  return response;
};
