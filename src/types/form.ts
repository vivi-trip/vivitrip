import { fieldPosition } from "../constants/form";
import ButtonProps from "@/src/types/button";
import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { FieldValues } from "react-hook-form";

export type Position = "left" | "right";

// export type IconKeys = keyof typeof icons; 이렇게 하고 싶은데 이렇게 하면 자동완성이 안됨
export type IconKeys = "password" | "confirmPassword" | "calendar" | "search";
export type IconType = {
  icon: (isVisible?: boolean) => ReactNode;
  onClick: () => void;
  position: Position;
  padding?: string;
  margin?: string;
};

export type InputKeys =
  | "password"
  | "confirmPassword"
  | "nickname"
  | "email"
  | "default"
  | "search";

export type FieldKeys = "authPage" | "expPage" | "search" | "default";
export type FormKeys = InputKeys | FieldKeys;

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  resetOnSubmit?: boolean;
}

export interface FieldStyles {
  style: (typeof fieldPosition)[keyof typeof fieldPosition];
}

export interface FormProps<T extends FieldValues> extends BaseProps {
  onSubmit: (data: T) => void;
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
  position: Position;
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
