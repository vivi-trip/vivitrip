import { KeyboardEvent, MouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  onClose: () => void;
}

const ShortDropdownList = ({ children, onClick, onClose }: Props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClick();
        onClose();
      }}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
          onClose();
        }
      }}
      className="cursor-pointer list-none whitespace-nowrap px-14 py-10 text-center font-normal text-green-100">
      {children}
    </div>
  );
};

export default ShortDropdownList;
