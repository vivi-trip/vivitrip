import { create } from "zustand";

interface TempEmailStore {
  email: string | number | readonly string[] | undefined;
  setEmail: (data: string) => void;
  clearEmail: () => void;
}

const useTempEmailStore = create<TempEmailStore>((set) => ({
  email: undefined,
  setEmail: (data) => set({ email: data }),
  clearEmail: () => set({ email: undefined }),
}));

export default useTempEmailStore;
