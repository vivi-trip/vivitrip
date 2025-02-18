import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import IconArrowUp from "@/assets/svgs/ic_arrow_up.svg";
import Dropdown from "@/src/components/Dropdown";
import useOutsideClick from "@/src/hooks/useOutsideClick";
import clsx from "clsx";
import React, { useMemo, useRef, useState } from "react";

interface TimeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minTime?: string;
  disabled: boolean;
}

const TimeDropdown = ({
  value,
  onChange,
  placeholder = "0:00",
  minTime,
  disabled = false,
}: TimeDropdownProps) => {
  const timeOptions = useMemo(() => {
    if (disabled) return [];
    const options = Array.from({ length: 24 }, (_, i) => ({
      value: `${i}:00`,
      label: `${i}:00`,
    }));

    if (minTime) {
      const [minHour] = minTime.split(":").map(Number);
      return options.filter((option) => {
        const [hour] = option.value.split(":").map(Number);
        return hour > minHour;
      });
    }

    return options;
  }, [minTime, disabled]);

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
          <Dropdown.Menu className="z-20 max-h-164 overflow-y-auto">
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
