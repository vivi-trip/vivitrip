import ShortDropdownList from "./shortDropdownList";
import ShortDropdownMenu from "./shortDropdownMenu";
import ShortDropdownTrigger from "./shortDropdownTrigger";
import useDetectClose from "@/src/hooks/useDetectClose";
import clsx from "clsx";
import { ReactNode } from "react";

const ShortDropdown = ({
  children,
  onClose,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) => {
  const dropdownRef = useDetectClose(onClose);

  return (
    <div ref={dropdownRef} className={clsx("relative", className)}>
      {children}
    </div>
  );
};

ShortDropdown.Trigger = ShortDropdownTrigger;
ShortDropdown.Menu = ShortDropdownMenu;
ShortDropdown.List = ShortDropdownList;

export default ShortDropdown;
