import {
  BUTTON_COLOR_PRESET,
  BUTTON_STATUS_PRESET,
  BUTTON_TEXT_SIZE_PRESET,
} from "@/src/constants/button";
import ButtonProps from "@/src/types/button";
import clsx from "clsx";
import { useEffect, useRef } from "react";

const pxToRem = (px: string | undefined) =>
  px ? `${parseFloat(px) / 16}rem` : undefined;

const Button = ({
  type = "button",
  width,
  height,
  fullWidth = false,
  radius,
  gap,
  backgroundColor,
  fontStyle = "xl",
  className,
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  // fullWidth 적용 시, height 미지정 경고 출력
  const hasWarned = useRef(false);
  useEffect(() => {
    if (fullWidth && !height && !hasWarned.current) {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-alert
        alert("fullWidth 속성 적용 시, height 지정은 필수입니다.");
        hasWarned.current = true;
      }
    }
  }, [fullWidth, height]);

  // text 여부 확인
  const hasText = typeof children === "string";

  // 버튼 상태에 따른 CSS 클래스
  const stateClasses = clsx(
    disabled
      ? `${hasText ? "bg-gray-500 text-white" : backgroundColor && BUTTON_COLOR_PRESET[backgroundColor]} cursor-not-allowed`
      : [
          typeof BUTTON_STATUS_PRESET.hover === "function" &&
            BUTTON_STATUS_PRESET.hover(backgroundColor),
          typeof BUTTON_STATUS_PRESET.focus === "function" &&
            BUTTON_STATUS_PRESET.focus(backgroundColor),
          BUTTON_STATUS_PRESET.active,
        ],
  );

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      style={{
        width: pxToRem(width),
        height: pxToRem(height),
        borderRadius: pxToRem(radius),
        gap: pxToRem(gap),
      }}
      className={clsx(
        fullWidth && "w-full",
        backgroundColor && BUTTON_COLOR_PRESET[backgroundColor],
        fontStyle && BUTTON_TEXT_SIZE_PRESET[fontStyle],
        stateClasses,
        className,
        "flex items-center justify-center",
      )}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
