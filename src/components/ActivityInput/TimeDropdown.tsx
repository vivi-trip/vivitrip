import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import IconArrowUp from "@/assets/svgs/ic_arrow_up.svg";
import Dropdown from "@/src/components/Dropdown";
import useGetAvailableTimeRanges from "@/src/hooks/useGetAvailableTimeRanges";
import useGetDropdownTimeRanges from "@/src/hooks/useGetDropdownTimeRanges";
import useOutsideClick from "@/src/hooks/useOutsideClick";
import { TimeRange } from "@/src/types/reservation";
import clsx from "clsx";
import React, { useMemo, useRef, useState } from "react";

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface TimeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minTime?: string;
  disabled: boolean;
  addedSchedules: Schedule[];
  existingSchedules: Schedule[];
  selectedDate: string | null;
}

const TimeDropdown = ({
  value,
  onChange,
  placeholder = "00:00",
  minTime,
  disabled = false,
  addedSchedules,
  existingSchedules,
  selectedDate,
}: TimeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const scheduleList = useMemo<TimeRange[]>(() => {
    return existingSchedules
      .filter(({ date }) => date === selectedDate)
      .map(({ startTime, endTime }) => ({ startTime, endTime }));
  }, [existingSchedules, selectedDate]);

  const availableRanges = useGetAvailableTimeRanges(scheduleList);
  const { startOptions, endOptions } = useGetDropdownTimeRanges(
    availableRanges,
    minTime,
  );

  const timeOptions = minTime ? endOptions : startOptions;

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <Dropdown className="w-79 bg-white md:w-104">
        <Dropdown.Trigger
          onClick={toggleDropdown}
          className={clsx(
            "h-44 py-10 pl-10",
            "md:h-56 md:px-12 md:py-15",
            "rounded-4 border border-gray-500",
            "flex justify-between",
            disabled && "cursor-not-allowed opacity-50",
          )}>
          {value || placeholder}
          {isOpen ? <IconArrowUp /> : <IconArrowDown />}
        </Dropdown.Trigger>
        {!disabled && isOpen && (
          <Dropdown.Menu className="z-20 max-h-164 overflow-y-auto bg-white">
            {timeOptions.map((option) => (
              <Dropdown.Item
                key={`timeSelectOption_${option}`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="px-16 py-15 hover:bg-gray-100">
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export default TimeDropdown;
