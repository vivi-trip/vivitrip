import useUserStore from "@/src/stores/useUserStore";
import { getTokensFromCookies, setCookiesByTokens } from "@/src/utils/token";
import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (prev) => {
    const { accessToken } = getTokensFromCookies();
    const config = { ...prev }; // config 복사본 생성
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response, // 성공 응답 그대로 반환
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response?.status === 401) {
      const { refreshToken } = getTokensFromCookies();
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${baseURL}/auth/tokens`,
            {
              refreshToken,
            },
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;

          setCookiesByTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
          // 새 accessToken을 원래 요청에 설정 후 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return await api(originalRequest);
        } catch (refreshError) {
          // 갱신 실패 시 유저 로그아웃 처리
          useUserStore.getState().clearUser();
          return Promise.reject(refreshError);
        }
      } else {
        // refreshToken 없으면 유저 상태 초기화
        useUserStore.getState().clearUser();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
