import { useEffect, useRef } from "react";

import ButtonProps from "@/src/types/button";

const Button = ({
  type = "button",
  width,
  height,
  fullWidth: isFullWidth = false,
  radius,
  gap,
  backgroundColor: buttonBackgroundColor,
  fontStyle: buttonFontStyle = "xl",
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) => {
  // 버튼 색상에 따른 폰트 색상, 테두리 색상 정의
  const getTextColor = (
    backgroundColor:
      | "white_black"
      | "white_green"
      | "white_gray"
      | "black"
      | "gray"
      | "green",
  ) => {
    switch (backgroundColor) {
      case "white_black":
        return "bg-white text-nomad-black border border-nomad-black ";
      case "white_gray":
        return "bg-white text-green-100 border border-gray-200 ";
      case "white_green":
        return "bg-white text-green-100 border border-green-100 ";
      case "black":
        return "bg-nomad-black text-white border-none";
      case "gray":
        return "bg-gray-500 text-white border-none";
      case "green":
        return "bg-green-100 text-white border-none";
      default:
        return "";
    }
  };

  // fullWidth
  const getFullWidthStyles = (fullWidth: boolean) => {
    return fullWidth ? "w-full" : "";
  };

  // fullWidth 적용 시, height 미지정 경고 출력
  const hasWarned = useRef(false);
  useEffect(() => {
    if (isFullWidth && !height && !hasWarned.current) {
      if (typeof window !== "undefined") {
        alert("fullWidth 속성 적용 시, height 지정은 필수입니다.");
        hasWarned.current = true;
      }
    }
  }, [isFullWidth, height]);

  // fontStyle
  const getFontStyle = (fontStyle: "s" | "m" | "l" | "xl" | "xxl" | "xxxl") => {
    switch (fontStyle) {
      case "s":
        return "text-14px-medium"; // 14px 500 24px
      case "m":
        return "text-14px-bold"; // 14px 700 24px
      case "l":
        return "text-16px-medium"; // 16px 500 26px
      case "xl":
        return "text-16px-bold"; // 16px 700 26px
      case "xxl":
        return "text-18px-regular"; // 18px 400 26px
      case "xxxl":
        return "text-18px-medium"; // 18px 500 26px
      default:
        return "";
    }
  };

  // disabled
  const disabledStyles = disabled ? "cursor-not-allowed" : "";

  return (
    <button
      type={type === "button" ? "button" : "submit"}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        gap: `${gap}px`,
      }}
      className={`${buttonBackgroundColor ? getTextColor(buttonBackgroundColor) : ""} ${getFullWidthStyles(isFullWidth)} ${getFontStyle(buttonFontStyle)} ${className} ${disabledStyles} flex items-center justify-center`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
