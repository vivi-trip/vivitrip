import { OauthTypes } from "@/src/types/oauth";
import { User } from "@/src/types/user";
import { checkAndClearStorage } from "@/src/utils/token";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  userData: User | null;
  userProvider: OauthTypes | null;
  setUserData: (data: User) => void;
  setUserProvider: (provider: OauthTypes) => void;
  clearUser: () => void;
  checkAndClearUserData: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userData: null,
      userProvider: null,
      setUserData: (data) => set({ userData: data }),
      setUserProvider: (provider) => set({ userProvider: provider }),
      clearUser: () =>
        set({
          userData: null,
          userProvider: null,
        }),
      checkAndClearUserData: () => {
        if (checkAndClearStorage()) {
          set({
            userData: null,
            userProvider: null,
          });
        }
      },
    }),
    {
      name: String(process.env.NEXT_PUBLIC_USER_STORAGE_NAME), // 저장소의 항목 이름(고유해야 함)
    },
  ),
);

export default useUserStore;
