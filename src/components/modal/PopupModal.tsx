import Button from "../Button/Button";
import useModalStore from "@/src/stores/ModalStore";
import clsx from "clsx";
import React from "react";

interface PopupModalProps {
  title: string;
  content?: string;
}

const PopupModal = ({ title, content }: PopupModalProps): JSX.Element => {
  const { setModalClose } = useModalStore();

  return (
    <div
      className={clsx(
        "m-auto flex min-h-250 min-w-280 flex-col justify-center",
        "size-full rounded-12 text-center",
        "md:h-[15vh] md:w-[50vw] md:min-w-500",
      )}>
      <div
        className={clsx(
          "font-24px-bold text-center text-gray-800",
          "md:font-28px-bold",
        )}>
        {title}
      </div>
      <div
        className={clsx(
          "my-18",
          "font-16px-medium text-center text-gray-800",
          "md:font-20px-medium md:my-50",
        )}>
        {content}
      </div>
      <Button
        className={clsx(
          "font-14px-medium mx-auto block h-42 w-138",
          "md:font-14px-medium md:h-48 md:w-120",
        )}
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
  );
};

export default PopupModal;
