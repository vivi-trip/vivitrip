import CloseIcon from "@/assets/svgs/btnXbig.svg";
import Button from "@/src/components/Button/Button";
import Calendar from "@/src/components/Calendar/Calendar";
import PopupModal from "@/src/components/Modal/PopupModal";
import ParticipantCount from "@/src/components/Modal/ReservationModal/Common/ParticipantCount";
import Price from "@/src/components/Modal/ReservationModal/Common/Price";
import TimeSelector from "@/src/components/Modal/ReservationModal/Common/TimeSelector";
import TotalPrice from "@/src/components/Modal/ReservationModal/Common/TotalPrice";
import { usePostActivityReservation } from "@/src/queries/useActivities";
import { useCalendar } from "@/src/stores/useCalendarStore";
import useModalStore from "@/src/stores/useModalStore";
import { AxiosError } from "axios";
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
            title="예약이 신청되었습니다."
            content="예약관리자가 승인을 하면 
          예약이 완료됩니다."
          />,
          {
            customClass: "md:p-32",
          },
        );
      },
      onError: (error: unknown) => {
        // error가 AxiosError인지 확인
        if (error instanceof AxiosError && error.response) {
          // 서버에서 반환한 메시지를 가져와서 사용자에게 표시
          const errorMessage =
            error.response.data.message ||
            "예약을 처리하는 데 오류가 발생했습니다.";

          setModalOpen(<PopupModal title={errorMessage} />, {
            customClass: "md:p-32",
          });
        } else {
          setModalOpen(<PopupModal title="서버 응답이 없습니다." />, {
            customClass: "md:p-32",
          });
        }
        onChangeSchedule(null);
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
