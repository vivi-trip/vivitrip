import { ReactNode } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";



interface ModalOptions {
  customClass?: string;
}
interface ModalStoreState {
  isModalOpen: boolean;
  modal: ReactNode | null;
  modalID: string | null;
  modalOptions: ModalOptions | null;
  setModalOpen: (modal: ReactNode, options?: ModalOptions) => void;
  setModalClose: () => void;
}

const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  modal: null,
  modalID: null,
  modalOptions: null,
  setModalOpen: (modal, options) =>
    set({
      isModalOpen: true,
      modalID: uuidv4(),
      modal,
      modalOptions: options || null,
    }),
  setModalClose: () =>
    set({ isModalOpen: false, modalID: null, modal: null, modalOptions: null }),
}));

export default useModalStore;
