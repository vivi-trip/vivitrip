/**
 * @desc
 * ReservationChip 컴포넌트
 */
const RESERVATION_STATUS = {
  pending: "예약",
  confirmed: "확정",
  declined: "거절",
  canceled: "취소",
  completed: "완료",
} as const;

export default RESERVATION_STATUS;
