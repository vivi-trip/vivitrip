import Button from "../Button/Button";
import CheckIcon from "@/assets/svgs/ic_check.svg";
import useModalStore from "@/src/stores/ModalStore";
import React from "react";

interface CancelModalProps {
  onCancel: () => void; 
}

const ReservationCancelModal = ({ onCancel }: CancelModalProps) => {
  const { setModalClose } = useModalStore();

  return (
    <div className="flex h-184 w-298 flex-col rounded-12 ">
      <div className="mt-24 flex justify-center">
        <CheckIcon />
      </div>
      <div className="font-16px-medium mt-16 text-center text-gray-800">
        예약을 취소하시겠어요?
      </div>
      <div className="mt-32 flex justify-center gap-8">
        <Button
          className=""
          type="button"
          width="80"
          height="38"
          backgroundColor="white_green"
          radius="6"
          gap="8"
          onClick={setModalClose}>
          아니오
        </Button>
        <Button
          className=""
          type="button"
          width="80"
          height="38"
          backgroundColor="black"
          radius="6"
          gap="8"
          onClick={onCancel}>
          취소하기
        </Button>
      </div>
    </div>
  );
};

export default ReservationCancelModal;
