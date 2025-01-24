import { create } from "zustand";

// Event 타입 정의
interface Event {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

// ReservationStore 타입 정의
interface ReservationStore {
  data: Event[]; // 데이터는 여러 개의 Event를 가질 수 있도록 배열로 정의
  setData: (data: Event[]) => void; // setData는 Event 배열을 받도록 타입 정의
}

// Zustand store 생성
const useReservationStore = create<ReservationStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useReservationStore;
