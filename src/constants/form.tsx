import { ButtonStyles, FieldKeys, IconType } from "../types/form";
import Calendar from "@/assets/svgs/btnCalendar.svg";
import Search from "@/assets/svgs/btnSearch.svg";
import VisibilityOff from "@/assets/svgs/btnVisibility_off.svg";
import VisibilityOn from "@/assets/svgs/btnVisibility_on.svg";

export const icons: Record<string, IconType> = {
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
    icon: (isVisible?: boolean) => icons.password.icon(isVisible),
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
} as const;

export const iconPosition = {
  left: "left-0",
  right: "right-20",
} as const;

export const fieldPosition = {
  default: "",
  column: "flex flex-row items-center justify-between",
} as const;

export const variantStyles: Record<FieldKeys, ButtonStyles> = {
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
    fieldStyle: fieldPosition.default,
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
    fieldStyle: fieldPosition.column,
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
    fieldStyle: fieldPosition.column,
  },
  default: {
    fieldStyle: "",
  },
} as const;
