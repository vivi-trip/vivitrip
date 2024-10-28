import { MouseEvent, ReactNode } from "react";

const ShortDropdownTrigger = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ShortDropdownTrigger;
