import { FormKeys, IconKeys, Position } from "@/src/constants/form";
import ButtonProps from "@/src/types/button";
import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { FieldValues } from "react-hook-form";

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  resetOnSubmit?: boolean;
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
