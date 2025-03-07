import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface TokenProps {
  accessToken?: string;
  refreshToken?: string;
}

const TOKEN_NAME = {
  access: "accessToken",
  refresh: "refreshToken",
};

/**
 * @description - 쿠키에 토큰 설정하기
 * @params - { accessToken, refreshToken }
 */
export const setCookiesByTokens = ({
  accessToken,
  refreshToken,
}: TokenProps) => {
  if (accessToken) {
    setCookie(TOKEN_NAME.access, accessToken, {
      maxAge: 60 * 10,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  if (refreshToken) {
    setCookie(TOKEN_NAME.refresh, refreshToken, {
      maxAge: 60 * 60 * 24,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }
};

/**
 * @description - 쿠키에 있는 토큰 가져오기
 */
export const getTokensFromCookies = () => {
  const accessToken = getCookie(TOKEN_NAME.access);
  const refreshToken = getCookie(TOKEN_NAME.refresh);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * @description - 쿠키에 있는 토큰 삭제하기
 */
export const deleteTokensFromCookies = () => {
  deleteCookie(TOKEN_NAME.access);
  deleteCookie(TOKEN_NAME.refresh);
};

/**
 * @description - 쿠키에 토큰 존재 여부에 따라 로컬스토리지 초기화
 * @return - boolean
 */
export const checkAndClearStorage = () => {
  const { accessToken, refreshToken } = getTokensFromCookies();

  if (!accessToken || !refreshToken) {
    localStorage.removeItem(String(process.env.NEXT_PUBLIC_USER_STORAGE_NAME));
    localStorage.removeItem(String(process.env.NEXT_PUBLIC_OAUTH_STORAGE_NAME));
  }

  return !accessToken || !refreshToken;
};
