import CloseIcon from "@/assets/svgs/btnXbig.svg";
import ReservationInfo from "@/src/components/modal/ReservationInfoModal/common/ReservationInfo";
import ReservationTimeSelect from "@/src/components/modal/ReservationInfoModal/common/ReservationTimeSelect";
import {
  useGetMyReservations,
  useGetMyReservedSchedule,
} from "@/src/hooks/useMyActivities";
import useModalStore from "@/src/stores/ModalStore";
import { formatDateToKorean } from "@/src/utils/calendarFormatDate";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface ReservationInfoModalProps {
  selectedDate: string;
  selectedActivityId: number;
}

type ReservationStatus = "pending" | "confimed" | "declined";

/**
 * @description - ReservationInfoModal 프롭
 * @param selectedDate - 선택날짜
 * @param selectedActivityId - 선택 체험
 * 
 */
const ReservationInfoModal = ({
  selectedDate,
  selectedActivityId,
}: ReservationInfoModalProps) => {
  const { setModalClose } = useModalStore();
  const [selectTab, setSelectTab] = useState<ReservationStatus>("pending");
  const formattedDate = formatDateToKorean(selectedDate);
  const [selectedScheduleId, setSelectedScheduleId] = useState<
    number | undefined
  >();

  const handleSelect = (scheduleId: number | undefined) => {
    setSelectedScheduleId(scheduleId);
  };
  useEffect(() => {
    handleSelect(undefined);
    setSelectTab("pending");
    setSelectedScheduleId(undefined);
  }, [selectedDate]);

  const isSelectedScheduleId = selectedScheduleId !== undefined;

  const { data: dayReservations } = useGetMyReservedSchedule(
    {
      activityId: selectedActivityId,
      date: selectedDate,
    },
    isSelectedScheduleId,
  );

  const { data: reservedTimeData } = useGetMyReservations(
    {
      activityId: selectedActivityId,
      scheduleId: selectedScheduleId,
      status: selectTab,
    },
    isSelectedScheduleId,
  );

  const getButtonStyle = ({
    currentTab,
    targetTab,
  }: {
    currentTab: string;
    targetTab: string;
  }) =>
    clsx(
      "relative w-72 cursor-pointer",
      currentTab === targetTab
        ? [
            "font-20px-bold",
            "text-brand-500",
            "after:absolute",
            "after:bottom-[-6px]",
            "after:left-0",
            "after:h-4",
            "after:w-full",
            "after:rounded-xl",
            "after:bg-brand-500",
          ]
        : "font-20px-regular",
    );

  return (
    <div className="flex max-h-697 w-full max-w-429 flex-col">
      <div className="flex w-full justify-between">
        <div className="font-24px-bold">예약정보</div>
        <CloseIcon onClick={setModalClose} />
      </div>
      <div className="relative mt-8 flex flex-row">
        <button
          type="button"
          onClick={() => setSelectTab("pending")}
          className={getButtonStyle({
            currentTab: selectTab,
            targetTab: "pending",
          })}>
          신청 {dayReservations?.count.pending || 0}
        </button>

        <button
          type="button"
          onClick={() => setSelectTab("confimed")}
          className={getButtonStyle({
            currentTab: selectTab,
            targetTab: "confimed",
          })}>
          승인 {dayReservations?.count.confirmed || 0}
        </button>
        <button
          type="button"
          onClick={() => setSelectTab("declined")}
          className={getButtonStyle({
            currentTab: selectTab,
            targetTab: "declined",
          })}>
          거절 {dayReservations?.count.declined || 0}
        </button>
        <div className="absolute bottom-[-6px] left-0 h-px w-full bg-gray-200" />
      </div>
      <div className="mt-27">
        <h2 className="font-20px-semibold">예약날짜</h2>
        <div className="gap-2">
          <p className="font-20px-regular mt-16 w-full">{formattedDate}</p>
          <ReservationTimeSelect onSelect={handleSelect} />
        </div>
        <div className="mt-24 flex flex-col gap-14">
          <div className="font-20px-semibold mt-2">예약 내역</div>
          <div>
            {reservedTimeData?.reservations.map((reservationInfo) => (
              <ReservationInfo
                key={reservationInfo.id}
                selectTab={selectTab}
                reservationInfo={reservationInfo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfoModal;
