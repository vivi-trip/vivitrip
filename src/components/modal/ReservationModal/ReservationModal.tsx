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
        setModalOpen(<PopupModal title="예약 되었습니다." />);
      },
    });
  };

  const modalClose = () => {
    setModalClose();
    onChangeMembers(1);
    onChangeSchedule(null);
  };
  return (
    <div className="flex min-w-350 flex-col">
      <Price price={price} />
      <div className="mb-20 mt-16 flex items-center justify-between border-t-2 pt-16">
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
          width="470"
          height="56"
          radius="4"
          gap="4"
          backgroundColor="black"
          fontStyle="xl"
          className="lg:w-full"
          onClick={submitReservation}>
          예약하기
        </Button>
      </div>
      <TotalPrice total={price * members} />
    </div>
  );
};

export default ReservationModal;
