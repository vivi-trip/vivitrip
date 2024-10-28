import { KeyboardEvent, MouseEvent, useState } from "react";

function useDropdown() {
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleDropdown = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  const handleSetValue = (value: string) => {
    setCurrentValue(value);
  };

  return {
    isOpen,
    handleToggleDropdown,
    handleOffDropdown,
    handleSetValue,
    currentValue,
  };
}

export default useDropdown;
