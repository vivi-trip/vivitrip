export type ButtonColorType =
  | "white_black"
  | "white_green"
  | "white_gray"
  | "black"
  | "green"
  | "gray";

export type ButtonTextSizeType = "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  width?: string;
  height?: string;
  fullWidth?: boolean;
  radius?: "4" | "6" | "8" | "9" | "15";
  gap?: "4" | "8" | "10";
  backgroundColor?: ButtonColorType;
  fontStyle?: ButtonTextSizeType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
export default ButtonProps;
