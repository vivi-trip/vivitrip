import { ReactNode } from "react";

const ShortDropdownTrigger = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: (e: any) => void;
}) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ShortDropdownTrigger;
