import Button from "../Button/Button";
import useModalStore from "@/src/stores/ModalStore";
import React from "react";

interface PopupModalProps {
  title: string;
}

const PopupModal = ({ title }: PopupModalProps): JSX.Element => {
  const { setModalClose } = useModalStore();

  return (
    <div className="relative flex h-220 w-327 flex-col justify-center gap-43 rounded-12 md:h-250 md:w-540">
      <div className="sm:font-16px-medium md:font-20px-medium text-center text-gray-800">
        {title}
      </div>
      <div className="relative">
        <Button
          className="font-14px-medium md:font-14px-medium absolute left-1/2 h-42 w-138 -translate-x-1/2 md:left-auto md:right-28 md:h-48 md:w-120 md:translate-x-0"
          type="button"
          width="120"
          height="48"
          backgroundColor="black"
          radius="8"
          gap="8"
          onClick={setModalClose}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default PopupModal;
