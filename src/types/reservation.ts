import RESERVATION_STATUS from "@/src/constants/reservation";

export type ReservationStatusType = keyof typeof RESERVATION_STATUS;

export type ReservationStatusWord =
  (typeof RESERVATION_STATUS)[ReservationStatusType];

export interface ReservationChipProps {
  status: ReservationStatusType;
  count: number;
  onclick: () => void;
}
