import { OauthKaKaoProfile } from "../types/oauth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OauthKakaoAccount {
  profile: OauthKaKaoProfile | null;
  setProfile: (data: OauthKaKaoProfile) => void;
  clearProfile: () => void;
}

const useOauthSignStore = create(
  persist<OauthKakaoAccount>(
    (set) => ({
      profile: null,
      setProfile: (data) => set({ profile: data }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: String(process.env.NEXT_PUBLIC_OAUTH_STORAGE_NAME),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useOauthSignStore;
