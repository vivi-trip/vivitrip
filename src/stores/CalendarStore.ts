import { ActivityDetailResponse, Schedule } from "@/src/types/activitiesResponses";
import formatDateToYYYYMMDD from "@/src/utils/calendarFormatDate";
import { create } from "zustand";

interface CalendarState {
  selectDate: Date;
  selectSchedule: Schedule | null;
  members: number;
  selectMonth: number | null;
  data: ActivityDetailResponse;
  onChangeSelectDate: (date: Date) => void;
  onChangeSchedule: (schedule: Schedule | null) => void;
  onChangeMembers: (members: number) => void;
  onChangeSelectMonth: (month: number | null) => void;
  onChangeData: (data: ActivityDetailResponse) => void;
}

/**
 * @todo
 * @param  - Activities reponse 타입으로 교체
 */
export const useCalendarStore = create<CalendarState>((set) => ({
  selectDate: new Date(),
  selectSchedule: null,
  members: 1,
  selectMonth: new Date().getMonth(),
  data: {} as ActivityDetailResponse,
  onChangeSelectDate: (date) => set({ selectDate: date, selectSchedule: null }),
  onChangeSchedule: (schedule) => set({ selectSchedule: schedule }),
  onChangeMembers: (members) => set({ members }),
  onChangeSelectMonth: (month) => set({ selectMonth: month }),
  onChangeData: (data: ActivityDetailResponse) => set({ data }),
}));

export const useCalendar = () => {
  const store = useCalendarStore();
  return {
    ...store,
    formatDate: formatDateToYYYYMMDD(store.selectDate),
  };
};
