import { create } from "zustand";

/**
 * @description 로딩 상태 관리
 * @param isLoading - ID 없을 때 로딩 상태
 * @param showLoading - 로딩 상태를 활성화하는 함수
 * @param hideLoading - 로딩 상태를 비활성화하는 함수
 * @param loadingButtons - 버튼 ID별 로딩 상태
 * @param showLoadingButtons - 로딩 상태를 활성화하는 함수
 * @param hideLoadingButtons - 로딩 상태를 비활성화하는 함수
 */

type LoadingState = {
  isLoading?: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  loadingButtons?: Record<number, boolean>;
  showLoadingButtons: (id: number) => void;
  hideLoadingButtons: (id: number) => void;
};

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingButtons: {},
  showLoading: () =>
    set(() => ({
      isLoading: true,
    })),
  hideLoading: () =>
    set(() => ({
      isLoading: false,
    })),

  showLoadingButtons: (id) =>
    set((state) => ({
      loadingButtons: { ...state.loadingButtons, [id]: true },
    })),
  hideLoadingButtons: (id) =>
    set((state) => ({
      loadingButtons: { ...state.loadingButtons, [id]: false },
    })),
}));

export default useLoadingStore;
