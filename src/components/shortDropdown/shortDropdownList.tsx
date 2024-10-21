import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  onClose: () => void;
}

const ShortDropdownList = ({ children, onClick, onClose }: Props) => {
  return (
    <li
      onClick={(e: any) => {
        e.stopPropagation();
        onClick();
        onClose();
      }}
      className="rounded-8 text-green-100 text-md cursor-pointer list-none whitespace-nowrap px-14 py-10 text-center font-normal">
      {children}
    </li>
  );
};

export default ShortDropdownList;
