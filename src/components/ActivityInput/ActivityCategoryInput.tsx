import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import IconArrowUp from "@/assets/svgs/ic_arrow_up.svg";
import Dropdown from "@/src/components/Dropdown/index";
import useOutsideClick from "@/src/hooks/useOutsideClick";
import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

interface CategoryInputProps {
  control: Control<ActivityFormDataType>;
}

const ActivityCategoryInput = ({ control }: CategoryInputProps) => {
  const options = [
    { value: "문화 · 예술", label: "문화 · 예술" },
    { value: "식음료", label: "식음료" },
    { value: "스포츠", label: "스포츠" },
    { value: "투어", label: "투어" },
    { value: "관광", label: "관광" },
    { value: "웰빙", label: "웰빙" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Dropdown className="w-full bg-white">
            <Dropdown.Trigger
              onClick={toggleDropdown}
              className={clsx(
                "font-16px-regular text-left",
                "flex h-56 w-full items-center justify-between",
                "rounded-4 border border-gray-500",
                "px-16 py-15",
                {
                  "text-black": isSelected,
                  "text-gray-500": !isSelected,
                },
              )}>
              {field.value || "카테고리"}
              {isOpen ? <IconArrowUp /> : <IconArrowDown />}
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-full">
              {options.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  className="font-16px-regular flex justify-start py-15 pl-16 text-black hover:bg-gray-100"
                  onClick={() => {
                    field.onChange(option.value);
                    setIsSelected(true);
                    setIsOpen(false);
                  }}>
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      />
    </div>
  );
};

export default ActivityCategoryInput;
