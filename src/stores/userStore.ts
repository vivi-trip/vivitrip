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
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "vivitrip-user-storage", // 저장소의 항목 이름(고유해야 함)
      storage: createJSONStorage(() => sessionStorage), // (선택 사항) 기본적으로 'localStorage'가 사용됩니다.
    },
  ),
);

export default useUserStore;
