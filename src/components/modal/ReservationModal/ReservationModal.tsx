import CloseIcon from "@/assets/svgs/btnXbig.svg";
import Button from "@/src/components/Button/Button";
import Calendar from "@/src/components/calendar/Calendar";
import PopupModal from "@/src/components/modal/PopupModal";
import ParticipantCount from "@/src/components/modal/ReservationModal/common/ParticipantCount";
import Price from "@/src/components/modal/ReservationModal/common/Price";
import TimeSelector from "@/src/components/modal/ReservationModal/common/TimeSelector";
import TotalPrice from "@/src/components/modal/ReservationModal/common/TotalPrice";
import { usePostActivityReservation } from "@/src/queries/useActivities";
import { useCalendar } from "@/src/stores/CalendarStore";
import useModalStore from "@/src/stores/ModalStore";
import React from "react";

const ReservationModal = () => {
  const { setModalClose, setModalOpen } = useModalStore();
  const { data, members, onChangeMembers, onChangeSchedule, selectSchedule } =
    useCalendar();
  const { price, schedules, id: activityId } = data;
  const { mutate: postActivityReservation } = usePostActivityReservation();

  const submitReservation = () => {
    if (!selectSchedule || !selectSchedule.id) {
      return;
    }

    const reservationData = {
      activityId,
      scheduleId: selectSchedule?.id,
      headCount: members,
    };

    postActivityReservation(reservationData, {
      onSuccess: () => {
        setModalOpen(
          <PopupModal
            title="예약이 신청 되었습니다."
            content="예약 관리자가 예약 승인을 하면 
          예약이 완료 됩니다."
          />,
          {
            customClass: "md:p-32",
          },
        );
      },
    });
  };

  const modalClose = () => {
    setModalClose();
    onChangeMembers(1);
    onChangeSchedule(null);
  };
  return (
    <div className="mx-auto max-w-312">
      <Price price={price} />
      <div className="mb-20 flex items-center justify-between border-t-2 pt-16">
        <p className="font-24px-bold">날짜</p>
        <button type="button" onClick={modalClose}>
          <CloseIcon />
        </button>
      </div>
      <Calendar />
      <TimeSelector schedules={schedules} />
      <ParticipantCount />
      <div className="flex h-56 w-full justify-center">
        <Button
          type="button"
          height="56"
          radius="4"
          gap="4"
          backgroundColor="black"
          fontStyle="xl"
          className="w-full disabled:border-none disabled:bg-gray-500 disabled:text-white"
          disabled={!selectSchedule || !selectSchedule.id}
          onClick={submitReservation}>
          예약 신청하기
        </Button>
      </div>
      <TotalPrice total={price * members} />
    </div>
  );
};

export default ReservationModal;
