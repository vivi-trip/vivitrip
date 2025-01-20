import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import IconArrowUp from "@/assets/svgs/ic_arrow_up.svg";
import Dropdown from "@/src/components/Dropdown";
import clsx from "clsx";
import React, { useMemo, useState } from "react";

interface TimeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minTime?: string; 
}

const TimeDropdown = ({
  value,
  onChange,
  placeholder = "0:00",
  minTime,
}: TimeDropdownProps) => {
  const timeOptions = useMemo(() => {
    const options = Array.from({ length: 24 }, (_, i) => ({
      value: `${i}:00`,
      label: `${i < 10 ? `0${i}` : i}:00`,
    }));

    if (minTime) {
      const [minHour] = minTime.split(":").map(Number);
      return options.filter((option) => {
        const [hour] = option.value.split(":").map(Number);
        return hour > minHour;
      });
    }

    return options;
  }, [minTime]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <Dropdown className="w-79 md:w-104">
      <Dropdown.Trigger
        onClick={toggleDropdown}
        className={clsx(
          "h-44 py-10 pl-12",
          "md:h-56 md:px-16 md:py-15",
          "rounded-4 border border-gray-500",
          "flex justify-between",
        )}>
        {value || placeholder}
        {isOpen ? <IconArrowUp /> : <IconArrowDown />}
      </Dropdown.Trigger>
      <Dropdown.Menu className="max-h-164 overflow-y-auto">
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
    </Dropdown>
  );
};

export default TimeDropdown;
