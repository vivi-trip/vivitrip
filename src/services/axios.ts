import useUserStore from "@/src/stores/userStore";
import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (prev) => {
    const { accessToken } = useUserStore.getState();
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
      const { refreshToken } = useUserStore.getState();
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
          useUserStore.getState().setTokens(newAccessToken, newRefreshToken);
          // 새 accessToken을 원래 요청에 설정 후 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return await api(originalRequest);
        } catch (refreshError) {
          useUserStore.getState().clearUser(); // 갱신 실패 시 유저 로그아웃 처리
          return Promise.reject(refreshError);
        }
      } else {
        useUserStore.getState().clearUser(); // refreshToken 없으면 유저 상태 초기화
      }
    }

    return Promise.reject(error);
  },
);

export default api;
