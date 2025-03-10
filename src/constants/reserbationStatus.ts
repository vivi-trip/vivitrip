import { ReservationStatus } from "@/src/types/my-reservations";


type ReservationLabels =
  | "체험 완료"
  | "예약 취소"
  | "예약 거절"
  | "예약 승인"
  | "예약 신청";

  const RESERVATION_LABEL: Record<
  ReservationStatus,
  { label?: ReservationLabels; colorClass?: string }
> = {
  completed: { label: "체험 완료", colorClass: "text-gray-500" },
  canceled: { label: "예약 취소", colorClass: "text-gray-500" },
  declined: { label: "예약 거절", colorClass: "text-red-200" },
  confirmed: { label: "예약 승인", colorClass: "text-orange-100" },
  pending: { label: "예약 신청", colorClass: "text-blue-100" },
  "": {}, 
};

export default RESERVATION_LABEL;
