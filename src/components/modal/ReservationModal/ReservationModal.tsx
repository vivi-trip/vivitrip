import Button from "../../Button/Button";
import Calendar from "../../calendar/Calendar";
import ParticipantCount from "./common/ParticipantCount";
import Price from "./common/Price";
import TimeSelector from "./common/TimeSelector";
import TotalPrice from "./common/TotalPrice";
import CloseIcon from "@/assets/svgs/btnXbig.svg";
import useModalStore from "@/src/stores/ModalStore";
import React from "react";

const ReservationModal = () => {
  const { setModalClose } = useModalStore();
  // TODO: 각 컴포넌트  데이터  수정해야함

  return (
    <div className="flex flex-col">
      <Price price={1000} />
      <div className="mb-20 mt-16 flex items-center justify-between border-t-2 pt-16">
        <p className="font-24px-bold">날짜</p>
        <button type="button" onClick={setModalClose}>
          <CloseIcon />
        </button>
      </div>
      <Calendar />
      <TimeSelector />
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
          className="lg:w-full">
          예약하기
        </Button>
      </div>
      <TotalPrice total={1000} />
    </div>
  );
};

export default ReservationModal;
