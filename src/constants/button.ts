/**
 * @desc
 * Button 컴포넌트
 */
import { ButtonColorType, ButtonTextSizeType } from "@/src/types/button";

export const BUTTON_COLOR_PRESET: Record<ButtonColorType, string> = {
  white_black: "bg-white text-brand-500 border border-brand-500",
  white_gray: "bg-white text-brand-400 border border-gray-200",
  white_green: "bg-white text-brand-400 border border-brand-400",
  black: "bg-brand-500 text-white border-none",
  gray: "bg-gray-500 text-white border-none",
  green: "bg-brand-400 text-white border-none",
};

export const BUTTON_TEXT_SIZE_PRESET: Record<ButtonTextSizeType, string> = {
  s: "text-14px-medium", // 14px 500 24px
  m: "text-14px-bold", // 14px 700 24px
  l: "text-16px-medium", // 16px 500 26px
  xl: "text-16px-bold", // 16px 700 26px
  xxl: "text-18px-regular", // 18px 400 26px
  xxxl: "text-18px-medium", // 18px 500 26px
};
