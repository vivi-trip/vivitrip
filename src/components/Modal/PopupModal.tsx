import Button from "@/src/components/Button/Button";
import useModalStore from "@/src/stores/useModalStore";
import clsx from "clsx";
import React from "react";

interface PopupModalProps {
  title: string;
  content?: string;
  onConfirm?: () => void;
}

const PopupModal = ({
  title,
  content,
  onConfirm,
}: PopupModalProps): JSX.Element => {
  const { setModalClose } = useModalStore();

  const handleConfirm = () => {
    setModalClose();
    onConfirm?.();
  };

  return (
    <div
      className={clsx(
        "m-auto flex min-h-140 min-w-280 flex-col justify-center",
        "size-full rounded-12 text-center",
        "md:h-180 md:w-[20vw] md:min-w-500",
      )}>
      <div
        className={clsx(
          "font-24px-bold text-center text-gray-800",
          "md:font-28px-bold",
        )}>
        {title}
      </div>
      {content && (
        <div
          className={clsx(
            "my-18",
            "font-16px-medium text-center text-gray-800",
            "md:font-20px-medium md:my-30",
          )}>
          {content}
        </div>
      )}
      <Button
        className={clsx(
          "font-14px-medium mx-auto block h-42 w-138",
          "md:font-14px-medium md:h-48 md:w-120",
          !content && "mt-60",
        )}
        type="button"
        width="120"
        height="48"
        backgroundColor="black"
        radius="8"
        gap="8"
        onClick={handleConfirm }>
        확인
      </Button>
    </div>
  );
};

export default PopupModal;
