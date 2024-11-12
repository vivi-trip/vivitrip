import { OauthTypes } from "@/src/types/oauth";
import { User } from "@/src/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

interface UserStore {
  userData: User | null;
  userProvider: OauthTypes | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUserData: (data: User) => void;
  setUserProvider: (provider: OauthTypes) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      userProvider: null,
      accessToken: null,
      refreshToken: null,
      setUserData: (data) => set({ userData: data }),
      setUserProvider: (provider) => set({ userProvider: provider }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearUser: () =>
        set({
          userData: null,
          userProvider: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "vivitrip-user-storage", // 저장소의 항목 이름(고유해야 함)
      storage: createJSONStorage(() => sessionStorage), // (선택 사항) 기본적으로 'localStorage'가 사용됩니다.
    },
  ),
);

export default useUserStore;
