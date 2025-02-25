import CloseIcon from "@/assets/svgs/btnXbig.svg";
import ReservationInfo from "@/src/components/modal/ReservationInfoModal/common/ReservationInfo";
import ReservationTimeSelect from "@/src/components/modal/ReservationInfoModal/common/ReservationTimeSelect";
import {
  useGetMyReservations,
  useGetMyReservedSchedule,
} from "@/src/hooks/useMyActivities";
import useModalStore from "@/src/stores/ModalStore";
import {
  ReservationInfosType,
  ReservationScheduleType,
} from "@/src/types/activitiesReservationType";
import { ReservationStatusType } from "@/src/types/reservation";
import { formatDateToKorean } from "@/src/utils/calendarFormatDate";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

interface ReservationInfoModalProps {
  selectedDate: string;
  selectedActivityId: number;
}

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
  const [selectTab, setSelectTab] = useState<ReservationStatusType>("pending");
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
      activityId: { activityId: selectedActivityId },
      date: selectedDate,
    },
    isSelectedScheduleId,
  );

  /**
   * @todo  차후 목데이터 삭제
   */
  const mockReservationSchedules: ReservationScheduleType = {
    scheduleId: 1,
    startTime: "09:00",
    endTime: "10:00",
    count: {
      confirmed: 3,
      pending: 2,
      declined: 1,
    },
  };

  const { data: reservedTimeData } = useGetMyReservations(
    {
      activityId: { activityId: selectedActivityId },
      scheduleId: selectedScheduleId,
      status: selectTab,
    },
    isSelectedScheduleId,
  );

  /**
   * @todo  차후 목데이터 삭제
   */
  const mockReservedTimeData = useMemo(
    () => ({
      reservations: [
        {
          id: 1,
          status: "pending",
          totalPrice: 50000,
          headCount: 2,
          nickname: "사용자1",
          userId: 101,
          date: "2025-01-23",
          startTime: "10:00",
          endTime: "11:00",
          createdAt: "2025-01-20T10:00:00Z",
          updatedAt: "2025-01-21T12:00:00Z",
          activityId: 1,
          scheduleId: 1001,
          reviewSubmitted: false,
          teamId: "team123",
        },
        {
          id: 2,
          status: "confirmed",
          totalPrice: 75000,
          headCount: 3,
          nickname: "사용자2",
          userId: 102,
          date: "2025-01-23",
          startTime: "11:30",
          endTime: "12:30",
          createdAt: "2025-01-20T11:30:00Z",
          updatedAt: "2025-01-21T13:00:00Z",
          activityId: 1,
          scheduleId: 1002,
          reviewSubmitted: true,
          teamId: "team124",
        },
        {
          id: 3,
          status: "declined",
          totalPrice: 30000,
          headCount: 1,
          nickname: "사용자3",
          userId: 103,
          date: "2025-01-23",
          startTime: "13:00",
          endTime: "14:00",
          createdAt: "2025-01-20T13:00:00Z",
          updatedAt: "2025-01-21T14:30:00Z",
          activityId: 1,
          scheduleId: 1003,
          reviewSubmitted: false,
          teamId: "team125",
        },
        {
          id: 4,
          status: "declined",
          totalPrice: 30000,
          headCount: 1,
          nickname: "사용자3",
          userId: 103,
          date: "2025-01-23",
          startTime: "13:00",
          endTime: "14:00",
          createdAt: "2025-01-20T13:00:00Z",
          updatedAt: "2025-01-21T14:30:00Z",
          activityId: 1,
          scheduleId: 1003,
          reviewSubmitted: false,
          teamId: "team125",
        },
      ],
      totalCount: 3,
      cursorId: 3,
    }),
    [],
  );

  // const statusCounts = useMemo(() => {
  //   return reservedTimeData?.reservations.reduce(
  //     (acc, reservation) => {
  //       acc[reservation.status] = (acc[reservation.status] || 0) + 1;
  //       return acc;
  //     },
  //     {} as Record<string, number>,
  //   );
  // }, [reservedTimeData]);

  const statusCounts = useMemo(() => {
    return mockReservedTimeData?.reservations.reduce(
      (acc, reservation) => {
        acc[reservation.status] = (acc[reservation.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [mockReservedTimeData]);

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
    <div>
      <div className="flex justify-between">
        <div className="font-24px-bold">예약정보</div>
        <button type="button" onClick={setModalClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="relative mt-8 flex flex-row">
        <button
          type="button"
          onClick={() => setSelectTab("pending")}
          className={getButtonStyle({
            currentTab: selectTab,
            targetTab: "pending",
          })}>
          {/* 신청 {statusCounts["pending"] || 0} */}
          신청 {statusCounts.pending || 0}
        </button>

        <button
          type="button"
          onClick={() => setSelectTab("confirmed")}
          className={getButtonStyle({
            currentTab: selectTab,
            targetTab: "confirmed",
          })}>
          {/* 승인 {statusCounts["confirmed"] || 0} */}
          승인 {statusCounts.confirmed || 0}
        </button>

        <button
          type="button"
          onClick={() => setSelectTab("declined")}
          className={getButtonStyle({
            currentTab: selectTab,
            targetTab: "declined",
          })}>
          {/* 거절 {statusCounts["declined"] || 0} */}
          거절 {statusCounts.declined || 0}
        </button>

        <div className="absolute bottom-[-6px] left-0 h-px w-full bg-gray-200" />
      </div>
      <div className="mt-27">
        <h2 className="font-20px-semibold">예약날짜</h2>
        <div className="gap-2">
          <p className="font-20px-regular mt-16 w-full">{formattedDate}</p>
          <ReservationTimeSelect
            onSelect={handleSelect}
            reservations={dayReservations}
          />
        </div>
        <div className="my-24 flex flex-col gap-14">
          <div className="font-20px-semibold mt-2">예약 내역</div>
          <div className="flex flex-col gap-14">
            {/* {reservedTimeData?.reservations
              .filter((reservationInfo) => {
                const mappedStatus =
                  selectTab === "confirmed" ? "confirmed" : selectTab;
                return reservationInfo.status === mappedStatus;
              })
              .map((reservationInfo) => (
                <ReservationInfo
                  key={reservationInfo.id}
                  selectTab={selectTab}
                  reservationInfo={reservationInfo}
                />
              ))} */}

            {mockReservedTimeData?.reservations
              .filter((reservationInfo) => {
                const mappedStatus =
                  selectTab === "confirmed" ? "confirmed" : selectTab;
                return reservationInfo.status === mappedStatus;
              })
              .map((reservationInfo) => (
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
