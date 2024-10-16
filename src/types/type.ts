import { RESERVATION_STATUS } from "../constants/constants";

export type ReservationStatusType = keyof typeof RESERVATION_STATUS;
export type ReservationStatusWord =
  (typeof RESERVATION_STATUS)[ReservationStatusType];
export interface ReservationChipProps {
  status: ReservationStatusType;
  count: number;
  onclick: () => void;
}
