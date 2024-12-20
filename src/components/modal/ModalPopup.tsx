import Button from "../Button/Button";
import useModalStore from "@/src/stores/ModalStore";
import React from "react";

// size prop의 타입을 정의합니다.
type ModalSize = "large" | "small";

// props의 타입을 정의합니다.
interface ModalPopupProps {
  size?: ModalSize;
}

// 사이즈에 따른 스타일 클래스를 정의합니다.
const sizeClasses: Record<ModalSize, string> = {
  large: "h-250 w-540",
  small: "h-220 w-327 gap-43",
};

const contentClasses: Record<ModalSize, string> = {
  large: "font-20px-medium ",
  small: "font-16px-medium ",
};

const buttonClasses: Record<ModalSize, string> = {
  large: "absolute mt-40 mr-28 font-14px-medium",
  small: "absolute left-1/2 -translate-x-1/2 w-138 h-42 font-14px-medium ",
};

const ModalPopup = ({ size = "large" }: ModalPopupProps) => {
  const { setModalClose } = useModalStore();

  return (
    <div
      className={`relative flex flex-col justify-center rounded-12 ${sizeClasses[size]}`}>
      <div className={`text-center text-gray-800 ${contentClasses[size]}`}>
        가입이 완료되었습니다!
      </div>
      <div className={size === "large" ? "flex justify-end" : ""}>
        <Button
          className={`${buttonClasses[size]}`}
          type="button"
          width="120"
          height="48"
          backgroundColor="black"
          radius="8"
          onClick={setModalClose}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default ModalPopup;
