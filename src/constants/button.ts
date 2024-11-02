/**
 * @desc
 * Button 컴포넌트
 */
import {
  ButtonColorType,
  ButtonStatusType,
  ButtonTextSizeType,
} from "@/src/types/button";
import { ReactNode } from "react";

export const BUTTON_COLOR_PRESET: Record<ButtonColorType, string> = {
  white_black: "bg-white text-brand-500 border border-brand-500",
  white_green: "bg-white text-brand-400 border border-brand-400",
  white_gray: "bg-white text-gray-500 border border-gray-200",
  black: "bg-brand-500 text-white border-none",
  green: "bg-brand-400 text-white border-none",
  gray: "bg-gray-500 text-white border-none",
};

export const BUTTON_TEXT_SIZE_PRESET: Record<ButtonTextSizeType, string> = {
  s: "text-14px-medium", // 14px 500 24px
  m: "text-14px-bold", // 14px 700 24px
  l: "text-16px-medium", // 16px 500 26px
  xl: "text-16px-bold", // 16px 700 26px
  xxl: "text-18px-regular", // 18px 400 26px
  xxxl: "text-18px-medium", // 18px 500 26px
};

export const BUTTON_STATUS_PRESET: Record<
  ButtonStatusType,
  | string
  | ((
      backgroundColor: ButtonColorType | undefined,
      children?: ReactNode,
    ) => string)
> = {
  disabled: (
    backgroundColor: ButtonColorType | undefined,
    children: ReactNode,
  ) => {
    const hasText = typeof children === "string";
    return hasText && !backgroundColor
      ? `bg-gray-500 text-white cursor-not-allowed`
      : `${BUTTON_COLOR_PRESET[backgroundColor as ButtonColorType]} cursor-not-allowed`;
  },
  hover: (backgroundColor: ButtonColorType | undefined) => {
    const hoverClassMap: Record<ButtonColorType, string> = {
      white_black: "hover:bg-brand-200 transition",
      white_green: "hover:bg-brand-200 transition",
      white_gray: "",
      black: "hover:bg-brand-600 transition",
      green: "hover:bg-brand-500 transition",
      gray: "",
    };
    return backgroundColor ? hoverClassMap[backgroundColor] : "";
  },
  focus: (backgroundColor: ButtonColorType | undefined) => {
    const focusClassMap: Record<ButtonColorType, string> = {
      white_black:
        "focus:outline-none focus:border-none focus:ring-2 focus:ring-brand-500",
      white_green:
        "focus:outline-none focus:border-none focus:ring-2 focus:ring-brand-500",
      white_gray: "",
      black:
        "focus:outline-none focus:border-none focus:ring-2 focus:ring-basic-navy",
      green:
        "focus:outline-none focus:border-none focus:ring-2 focus:ring-basic-navy",
      gray: "",
    };
    return backgroundColor ? focusClassMap[backgroundColor] : "";
  },
  active: "active:scale-95 active:opacity-80",
};
