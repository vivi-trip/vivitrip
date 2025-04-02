import PopupModal from "../Modal/PopupModal";
import Button from "@/src/components/Button/Button";
import ReservationModal from "@/src/components/Modal/ReservationModal/ReservationModal";
import { useCalendar } from "@/src/stores/useCalendarStore";
import useModalStore from "@/src/stores/useModalStore";
import useUserStore from "@/src/stores/useUserStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import formatWage from "@/src/utils/wageFormatter";
import clsx from "clsx";
import { useRouter } from "next/router";
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
  const { userData } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    onChangeData(activityData);
  }, [activityData, onChangeData]);

  const handleReservationClick = () => {
    if (!userData) {
      setModalOpen(
        <PopupModal
          title="로그인이 필요 합니다."
          onConfirm={() => router.push("/sign-in")}
        />,
      );
    } else {
      setModalOpen(<ReservationModal />, { customClass: "md:w-450" });
    }
  };

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
          onClick={handleReservationClick}
          fontStyle="xl">
          체험 예약하기
        </Button>
      </div>
    </div>
  );
};

export default ActivityReservationBar;
