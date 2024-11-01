import Calendar from "@/assets/svgs/btnCalendar.svg";
import Search from "@/assets/svgs/btnSearch.svg";
import VisibilityOff from "@/assets/svgs/btnVisibility_off.svg";
import VisibilityOn from "@/assets/svgs/btnVisibility_on.svg";
import ButtonProps from "@/src/types/button";
import React, { ReactNode } from "react";

export type Position = "left" | "right";

export type IconType = {
  icon: (isVisible?: boolean) => ReactNode;
  onClick: () => void;
  position: Position;
  padding?: string;
  margin?: string;
};

export const iconPosition = {
  left: "left-0",
  right: "right-20",
};

const icons: Record<string, IconType> = {
  password: {
    icon: (isVisible?: boolean) =>
      isVisible ? (
        <VisibilityOn width={24} height={24} />
      ) : (
        <VisibilityOff width={24} height={24} />
      ),
    onClick: () => {},
    position: "right",
  },
  confirmPassword: {
    icon: (isVisible?: boolean) =>
      isVisible ? (
        <VisibilityOn width={24} height={24} />
      ) : (
        <VisibilityOff width={24} height={24} />
      ),
    onClick: () => {},
    position: "right",
  },
  calendar: {
    icon: () => <Calendar width={32} height={32} />,
    onClick: () => {},
    position: "right",
  },
  search: {
    icon: () => (
      <div className="flex size-40 items-center justify-center">
        <Search width={24} height={24} />
      </div>
    ),
    onClick: () => {},
    position: "left",
    padding: "pl-[40px]",
    margin: "ml-[40px]",
  },
};

// export type IconKeys = keyof typeof icons; 이렇게 하고 싶은데 이렇게 하면 자동완성이 안됨
export type IconKeys = "password" | "calendar" | "search";

export type ButtonVariant = "authPage" | "expPage" | "search";

export interface ButtonStyles {
  style: ButtonProps;
  tailwindStyle?: string;
}

export const buttonStyles: Record<ButtonVariant, ButtonStyles> = {
  authPage: {
    style: {
      type: "submit",
      height: "48",
      fullWidth: true,
      radius: "6",
      gap: "10",
      backgroundColor: "green",
      fontStyle: "xl",
    },
  },
  expPage: {
    style: {
      type: "submit",
      width: "120",
      height: "48",
      radius: "4",
      gap: "4",
      backgroundColor: "black",
      fontStyle: "xl",
    },
  },
  search: {
    style: {
      type: "submit",
      height: "56",
      radius: "4",
      gap: "4",
      backgroundColor: "black",
      fontStyle: "xl",
    },
    tailwindStyle: "w-96 md:w-136",
  },
};

export default icons;
