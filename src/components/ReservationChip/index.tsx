import RESERVATION_STATUS from "@/src/constants/reservation";
import {
  ReservationChipProps,
  ReservationStatusType,
} from "@/src/types/reservation";

/**
 * @todo
 * 테일윈드 색상, 폰트 사이즈 변수 적용
 */
const RESERVATION_STATUS_CLASSNAME: Record<ReservationStatusType, string> = {
  pending: "bg-blue-200 text-white",
  declined: "bg-red-50 text-red-200",
  confirmed: "bg-orange-50 text-orange-100",
  completed: "bg-white text-blue-200",
  canceled: "bg-color text-gray-800",
};

/**
 *
 * @param status ReservationStatus 값
 * @returns
 */
const ReservationChip = ({
  status = "pending",
  count,
  onclick,
}: ReservationChipProps) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className={`min-h-24 w-full rounded px-4 text-nowrap text-left transition-all text-sm ${RESERVATION_STATUS_CLASSNAME[status]}`}>
      {`${RESERVATION_STATUS[status]} ${count}`}
    </button>
  );
};

export default ReservationChip;
