import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface ModalStoreState {
  isModalOpen: boolean;
  modal: ReactNode | null;
  modalID: string | null;
  setModalOpen: (modal: ReactNode) => void;
  setModalClose: () => void;
}

const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  modal: null,
  modalID: null,
  setModalOpen: (modal) => set({ isModalOpen: true, modalID: uuidv4(), modal }),
  setModalClose: () => set({ isModalOpen: false, modalID: null, modal: null }),
}));

export default useModalStore;
