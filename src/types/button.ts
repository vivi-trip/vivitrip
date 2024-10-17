interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  width?: string;
  height?: string;
  fullWidth?: boolean;
  radius?: "4" | "6" | "8" | "9" | "15";
  gap?: "4" | "8" | "10";
  backgroundColor?:
    | "white_black"
    | "white_green"
    | "white_gray"
    | "black"
    | "green"
    | "gray";
  fontStyle?: "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
export default ButtonProps;
