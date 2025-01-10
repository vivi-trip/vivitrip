import { ActivityDetail, Schedule } from "../types/activities";
import formatDateToYYYYMMDD from "../utils/calendarFormatDate";
import { create } from "zustand";

interface CalendarState {
  selectDate: Date;
  selectSchedule: Schedule | null;
  members: number;
  selectMonth: number | null;
  data: ActivityDetail;
  onChangeSelectDate: (date: Date) => void;
  onChangeSchedule: (schedule: Schedule | null) => void;
  onChangeMembers: (members: number) => void;
  onChangeSelectMonth: (month: number | null) => void;
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
  data: {} as ActivityDetail,
  onChangeSelectDate: (date) => set({ selectDate: date, selectSchedule: null }),
  onChangeSchedule: (schedule) => set({ selectSchedule: schedule }),
  onChangeMembers: (members) => set({ members }),
  onChangeSelectMonth: (month) => set({ selectMonth: month }),
}));

export const useCalendar = () => {
  const store = useCalendarStore();
  return {
    ...store,
    formatDate: formatDateToYYYYMMDD(store.selectDate),
  };
};
