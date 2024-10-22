import { User } from "@/src/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "vivitrip-user-storage",
    },
  ),
);

export default useUserStore;
