import { ReservationStatus } from "../types/my-reservations";


type ReservationLabels =
  | "체험 완료"
  | "예약 취소"
  | "예약 거절"
  | "예약 승인"
  | "예약 완료";

  const RESERVATION_LABEL: Record<
  ReservationStatus,
  { label?: ReservationLabels; colorClass?: string }
> = {
  completed: { label: "체험 완료", colorClass: "text-gray-500" },
  canceled: { label: "예약 취소", colorClass: "text-gray-500" },
  declined: { label: "예약 거절", colorClass: "text-red-200" },
  confirmed: { label: "예약 승인", colorClass: "text-orange-100" },
  pending: { label: "예약 완료", colorClass: "text-blue-100" },
  all: {}, // `label`과 `colorClass`는 빈 객체로 두어서 사용하지 않음
  "": {}, // `label`과 `colorClass`는 빈 객체로 두어서 사용하지 않음
};

export default RESERVATION_LABEL;
