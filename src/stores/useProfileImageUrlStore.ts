import { create } from "zustand";

interface ProfileImageUrlStore {
  newProfileImageUrl: string | null;
  setNewProfileImageUrl: (url: string) => void;
  clearNewProfileImageUrl: () => void;
}

const useProfileImageUrlStore = create<ProfileImageUrlStore>((set) => ({
  newProfileImageUrl: null,
  setNewProfileImageUrl: (url) => set({ newProfileImageUrl: url }),
  clearNewProfileImageUrl: () =>
    set({
      newProfileImageUrl: null,
    }),
}));

export default useProfileImageUrlStore;
