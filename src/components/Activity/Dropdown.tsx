import AltArrowDown from "@/assets/svgs/altArrowDown.svg";
import Button from "@/src/components/Button/Button";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const options = [
  { label: "높은 가격순", value: "price_desc" },
  { label: "낮은 가격순", value: "price_asc" },
];

const Dropdown = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("가격");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 새로고침 시 초기화 문제
  useEffect(() => {
    if (router.query.sort) {
      const selectedOption = options.find(
        (option) => option.value === router.query.sort,
      );
      if (selectedOption) {
        setSelected(selectedOption.label);
      }
    } else {
      setSelected("가격");
    }
  }, [router.query.sort]);

  const handleSelect = (value: string) => {
    if (selected === options.find((option) => option.value === value)?.label) {
      setIsOpen(false);
      return;
    }

    // value를 label로 바꿔서 저장
    const selectedOption = options.find((option) => option.value === value);

    if (selectedOption) {
      setSelected(selectedOption.label);
    }
    setIsOpen(false);

    const query = {
      ...router.query,
      sort: value,
    };

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  // 외부 클릭 시 드롭다운 닫기
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative md:mb-5 lg:mb-5">
      <Button
        type="button"
        radius="15"
        backgroundColor="white_green"
        className={clsx(
          "font-14px-medium flex h-41 w-90 flex-row justify-between px-20 py-10 md:py-16",
          "md:font-18px-medium md:h-53 md:w-120",
          "lg:font-18px-medium lg:h-53 lg:w-127",
        )}
        onClick={toggleDropdown}>
        <span className="flex-1 truncate">{selected}</span>
        <AltArrowDown className={clsx(isOpen && "rotate-180")} />
      </Button>
      {isOpen && (
        <ul className="font-14px-medium md:font-18px-medium absolute z-50 mt-8 flex w-full flex-col items-center rounded-6 border border-solid bg-white shadow-custom md:mt-14 lg:mt-8">
          {options.map((option, index) => {
            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelect(option.value);
                  }
                }}
                role="menuitem"
                tabIndex={0}
                className={clsx(
                  "w-full overflow-hidden py-18 text-center hover:bg-brand-200",
                  index === 0 ? "rounded-t-6" : "",
                  index === options.length - 1 ? "rounded-b-6" : "",
                )}>
                {option.label}
              </li>
            );
          })}
          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
