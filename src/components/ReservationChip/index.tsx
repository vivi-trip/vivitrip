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
  pending: "bg-[#0085FF] text-[#ffffff]",
  declined: "bg-[#FFE4E0] text-[#FF472E]",
  confirmed: "bg-[#FFF4E8] text-[#FF7C1D]",
  completed: "bg-[#ffffff] text-[#0085FF]",
  canceled: "bg-color text-[#4b4b4b]",
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
      className={`min-h-5 w-full min-w-12 rounded px-1 text-left text-xs transition-all md:min-h-6 md:min-w-16 md:text-sm lg:min-w-28 ${RESERVATION_STATUS_CLASSNAME[status]}`}>
      {`${RESERVATION_STATUS[status]} ${count}`}
    </button>
  );
};

export default ReservationChip;
