import ButtonProps from "@/src/types/button";
import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { FieldValues } from "react-hook-form";

export type IconPosition = "left" | "right";
export type IconKeys = "password" | "confirmPassword" | "calendar" | "search";
export type IconType = {
  icon: (isVisible?: boolean) => ReactNode;
  onClick: () => void;
  position: IconPosition;
  padding?: string;
  margin?: string;
};

export type InputKeys = "default" | "email" | "nickname" | IconKeys;

export type FieldPosition = "default" | "column";
export type FieldKeys = "default" | "authPage" | "expPage" | "search";

export type FormKeys = InputKeys | FieldKeys;

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  resetOnSubmit?: boolean;
}

export interface FormProps<T extends FieldValues> extends BaseProps {
  onSubmit?: (data: T) => void;
}

export interface FieldProps extends BaseProps {
  variant: FormKeys;
}

export interface LabelProps
  extends BaseProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export interface IconProps extends BaseProps {
  onClick?: () => void;
  position: IconPosition;
}

export interface ButtonStyles {
  style?: ButtonProps;
  tailwindStyle?: string;
  fieldStyle?: string;
}

export interface ErrorProps extends BaseProps {}

export interface BaseInputProps extends BaseProps {
  as?: "input" | "textarea";
  error?: string;
  errorClassName?: string;
  icon?: IconKeys;
  iconClassName?: string;
  readOnly?: boolean;
  label?: string;
}

export type InputProps = BaseInputProps &
  InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  disabled?: boolean;
}
