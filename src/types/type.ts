import { ReactNode } from "react";

export interface ChildrenProp {
  children?: ReactNode;
}

export interface ClassNameProp {
  className?: string;
}

export interface ClickProps {
  onClick?: () => void;
}

export interface ComponentProps extends ChildrenProp, ClassNameProp {}
