import { OauthKaKaoProfile } from "../types/oauth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OauthKakaoAccount {
  profile: OauthKaKaoProfile | null;
  setProfile: (data: OauthKaKaoProfile) => void;
  clearProfile: () => void;
}

const useOauthSignStore = create<OauthKakaoAccount>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (data) => set({ profile: data }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "vivitrip-oauth-sign-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useOauthSignStore;
