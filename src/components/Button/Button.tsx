import clsx from "clsx";
import { useEffect, useRef } from "react";
import {
  BUTTON_COLOR_PRESET,
  BUTTON_TEXT_SIZE_PRESET,
} from "@/src/constants/constants";
import ButtonProps from "@/src/types/button";

const Button = ({
  type = "button",
  width,
  height,
  fullWidth = false,
  radius,
  gap,
  backgroundColor,
  fontStyle = "xl",
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) => {
  // fullWidth 적용 시, height 미지정 경고 출력
  const hasWarned = useRef(false);
  useEffect(() => {
    if (fullWidth && !height && !hasWarned.current) {
      if (typeof window !== "undefined") {
        alert("fullWidth 속성 적용 시, height 지정은 필수입니다.");
        hasWarned.current = true;
      }
    }
  }, [fullWidth, height]);

  return (
    <button
      type={type === "button" ? "button" : "submit"}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        gap: `${gap}px`,
      }}
      className={clsx(
        fullWidth && "w-full",
        backgroundColor && BUTTON_COLOR_PRESET[backgroundColor],
        fontStyle && BUTTON_TEXT_SIZE_PRESET[fontStyle],
        disabled && "cursor-not-allowed",
        className,
        "flex items-center justify-center",
      )}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
