import type { MouseEvent, ReactNode } from "react";

export type ButtonColorType =
  | "white_black"
  | "white_green"
  | "white_gray"
  | "black"
  | "green"
  | "gray";

export type ButtonTextSizeType = "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type ButtonStatusType = "disabled" | "hover" | "focus" | "active";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  fullWidth?: boolean;
  radius?: "4" | "6" | "8" | "9" | "15" | "20";
  gap?: "4" | "8" | "10";
  backgroundColor?: ButtonColorType;
  fontStyle?: ButtonTextSizeType;
  className?: string;
  disabled?: boolean;
  onClick?: (() => void) | ((event: MouseEvent<HTMLButtonElement>) => void);
  children?: ReactNode;
}

export default ButtonProps;
