import Button from "@/src/components/Button/Button";
import ReservationModal from "@/src/components/modal/ReservationModal/ReservationModal";
import { useCalendar } from "@/src/stores/CalendarStore";
import useModalStore from "@/src/stores/ModalStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import formatWage from "@/src/utils/wageFormatter";
import clsx from "clsx";
import { useEffect } from "react";

interface ActivityReservationBarProps {
  activityData: ActivityDetailResponse;
}

const ActivityReservationBar = ({
  activityData,
}: ActivityReservationBarProps) => {
  const { onChangeData, members } = useCalendar();
  const { price } = activityData;
  const { setModalOpen } = useModalStore();

  useEffect(() => {
    onChangeData(activityData);
  }, [activityData, onChangeData]);

  return (
    <div
      // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
      className={clsx(
        "flex h-80 w-auto items-center justify-between",
        "sticky bottom-0 z-10",
        "border-t border-[#A1A1A1] bg-white",
        "px-24 md:px-[4000px]",
        "-mx-24 md:-mx-[4000px]",
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
              customClass: "md:w-450",
            })
          }
          fontStyle="xl">
          체험 예약하기
        </Button>
      </div>
    </div>
  );
};

export default ActivityReservationBar;
