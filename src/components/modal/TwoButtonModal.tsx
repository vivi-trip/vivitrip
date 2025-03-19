import CheckIcon from "@/assets/svgs/ic_check.svg";
import Button from "@/src/components/Button/Button";
import useModalStore from "@/src/stores/ModalStore";
import React from "react";

interface CancelModalProps {
  onCancel: () => void;
  title: string;
  negativeContent: string;
  interactiveContent: string;
}
/**
 * @description 투버튼 모달 프롭
 * @param title 모달 타이틀
 * @param negativeContent 취소 내용
 * @param interactiveContent 상호작용 내용
 */
const TwoButtonModal = ({
  onCancel,
  title,
  negativeContent,
  interactiveContent,
}: CancelModalProps) => {
  const { setModalClose } = useModalStore();

  return (
    <div className="mx-auto mt-300 flex h-184 w-298 flex-col rounded-12 md:mt-auto">
      <div className="mt-24 flex justify-center">
        <CheckIcon />
      </div>
      <div className="font-16px-medium mt-16 text-center text-gray-800">
        {title}
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
          {negativeContent}
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
          {interactiveContent}
        </Button>
      </div>
    </div>
  );
};

export default TwoButtonModal;
