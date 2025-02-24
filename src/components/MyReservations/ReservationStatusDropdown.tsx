import Dropdown from "../Dropdown";
import AltArrowDown from "@/assets/svgs/altArrowDown.svg";
import useOutsideClick from "@/src/hooks/useOutsideClick";
import { ReservationStatus } from "@/src/types/my-reservations";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface ReservationStatusDropdownProps {
  handleStatusChange: (status: ReservationStatus) => void;
}

const ReservationStatusDropdown = ({
  handleStatusChange,
}: ReservationStatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ReservationStatus>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (newStatus: ReservationStatus) => {
    setStatus(newStatus);

    setIsOpen(false);
  };

  const options = [
    { label: "체험 전체", value: "all" },
    { label: "예약 완료", value: "pending" },
    { label: "예약 취소", value: "canceled" },
    { label: "예약 승인", value: "confirmed" },
    { label: "예약 거절", value: "declined" },
    { label: "체험 완료", value: "completed" },
  ];

  useEffect(() => {
    if (status !== "") {
      handleStatusChange(status);
    }
  }, [status, handleStatusChange]);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <Dropdown>
        <Dropdown.Trigger
          className={clsx(
            "h-44 min-w-120 px-12 py-10",
            "md:h-56 md:px-16 md:py-15 lg:w-160",
            "rounded-15 border border-brand-400",
            "flex justify-between",
          )}
          onClick={() => setIsOpen((prev) => !prev)}>
          <p className="font-18px-medium text-brand-400">
            {status
              ? options.find((opt) => opt.value === status)?.label
              : "필터"}
          </p>
          <AltArrowDown className={clsx(isOpen && "rotate-180")} />
        </Dropdown.Trigger>

        <Dropdown.Menu className="h-326 overflow-y-auto">
          {options.map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => handleItemClick(option.value as ReservationStatus)}
              className={clsx(
                "px-16 py-15",
                status === option.value
                  ? "bg-brand-400 text-white"
                  : "hover:bg-gray-100",
              )}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ReservationStatusDropdown;
