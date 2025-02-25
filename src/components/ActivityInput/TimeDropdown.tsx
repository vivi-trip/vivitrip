import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import IconArrowUp from "@/assets/svgs/ic_arrow_up.svg";
import Dropdown from "@/src/components/Dropdown";
import useOutsideClick from "@/src/hooks/useOutsideClick";
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
}

const TimeDropdown = ({
  value,
  onChange,
  placeholder = "0:00",
  minTime,
  disabled = false,
  addedSchedules,
  existingSchedules,
}: TimeDropdownProps) => {
  const isTimeOverlapping = (time: string, schedules: Schedule[]) => {
    const hour = parseInt(time, 10);
    return schedules.some(
      (schedule) =>
        hour >= parseInt(schedule.startTime, 10) &&
        hour < parseInt(schedule.endTime, 10),
    );
  };

  const timeOptions = useMemo(() => {
    if (disabled) return [];

    const allHours = Array.from({ length: 24 }, (_, i) => ({
      value: `${i}:00`,
      label: `${i}:00`,
    }));

    if (minTime) {
      const minHour = parseInt(minTime, 10);
      const nextHour = (minHour + 1) % 24;
      return [{ value: `${nextHour}:00`, label: `${nextHour}:00` }];
    }

    return allHours.filter((option) => {
      return !isTimeOverlapping(option.value, [
        ...addedSchedules,
        ...existingSchedules,
      ]);
    });
  }, [minTime, disabled, addedSchedules, existingSchedules]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

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
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-16 py-15 hover:bg-gray-100">
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export default TimeDropdown;
