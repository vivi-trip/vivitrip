import clsx from "clsx";
import { ReactNode } from "react";

const ShortDropdownMenu = ({
  children,
  isOpen,
  className = "",
  position = "top-30 l-0",
}: {
  children: ReactNode;
  isOpen: boolean;
  position?: string;
  className?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        // "absolute space-y-8 rounded-12 border border-opacity-10 p-16 shadow-md",
        // "bg-background-secondary dark:bg-background-secondary-dark border-background-tertiary dark:border-background-tertiary-dark",
        position,
        className,
      )}>
      {children}
    </div>
  );
};

export default ShortDropdownMenu;
