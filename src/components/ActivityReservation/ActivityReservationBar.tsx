import Button from "../Button/Button";
import ReservationModal from "../modal/ReservationModal/ReservationModal";
import { useCalendar } from "@/src/stores/CalendarStore";
import useModalStore from "@/src/stores/ModalStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import formatWage from "@/src/utils/wageFormatter";
import clsx from "clsx";
import { useEffect } from "react";

interface ActivityReservationBarProps {
  data: ActivityDetailResponse;
}

const ActivityReservationBar = ({ data }: ActivityReservationBarProps) => {
  const { onChangeData, members } = useCalendar();
  const { price } = data;
  const { setModalOpen } = useModalStore();

  useEffect(() => {
    onChangeData(data);
  }, [data, onChangeData]);

  return (
    <div
      className={clsx(
        "fixed flex h-83 w-full items-center justify-between",
        "bottom-0 left-0 z-50",
        "border-t border-[#A1A1A1] bg-white",
        "px-16 md:px-40",
      )}>
      <div className="flex flex-col">
        <div className="flex items-center gap-6">
          <p className="font-20px-bold">{formatWage(price * members)} /</p>
          <p className="font-18px-medium text-brand-500 underline">
            {` 총 ${members}인`}
          </p>
        </div>
      </div>
      <div className="w-120">
        <Button
          type="button"
          height="56"
          fullWidth
          radius="4"
          gap="4"
          backgroundColor="black"
          onClick={() =>
            setModalOpen(<ReservationModal />, {
              customClass:
                "size-full py-50 min-w-350 md:w-650 md:h-900 px-24 md:px-24 md:items-center min-w-375 rounded-none md:rounded-3xl",
            })
          }
          fontStyle="xl">
          날짜 선택하기
        </Button>
      </div>
    </div>
  );
};

export default ActivityReservationBar;
