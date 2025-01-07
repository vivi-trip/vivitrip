/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from "@/src/components/Button/Button";
import categories from "@/src/constants/filterButton";
import useCategoryState from "@/src/hooks/filterButton/useCategoryState";
import useDragScroll from "@/src/hooks/filterButton/useDragScroll";
import useOverflowDetection from "@/src/hooks/filterButton/useOverflowDetection";
import useResponsiveLayout from "@/src/hooks/filterButton/useResponsiveLayout";
import clsx from "clsx";
import { useRef } from "react";

const FilterButton = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 필터 변경
  const { handleCategoryChange, selectedCategory, currentIndex } =
    useCategoryState(categories);

  // 반응형 레이아웃
  const { buttonWidth, slideWidth, buttonGap } = useResponsiveLayout();

  // 오버플로우
  const isOverflowing = useOverflowDetection({
    containerRef,
    scrollRef,
    buttonWidth,
    buttonGap,
    categories,
  });

  // 드래그 스크롤
  const {
    isDrag,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    hasDragged,
  } = useDragScroll({ scrollRef, slideWidth, buttonGap, currentIndex });

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden whitespace-nowrap active:cursor-grabbing md:gap-14">
      {isOverflowing && (
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-20"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 80%, rgba(255, 255, 255, 0.9) 90%)",
          }}
        />
      )}
      <div
        id="button-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={isDrag ? handleMouseMove : undefined}
        className="scrollbar-none flex overflow-scroll"
        style={{
          gap: `${buttonGap}px`,
        }}>
        {categories.map((category) => (
          <Button
            key={category.label}
            type="button"
            radius="15"
            gap="10"
            backgroundColor={
              selectedCategory === category.value ? "green" : "white_green"
            }
            fontStyle={selectedCategory === category.value ? "xl" : "l"}
            className={clsx(
              "font-14px-medium h-41 w-80 shrink-0 focus:ring-transparent",
              "md:font-18px-medium md:h-58 md:w-120",
              "lg:font-18px-medium lg:h-58 lg:w-127",
              isDrag ? "cursor-grabbing" : "cursor-pointer",
            )}
            onClick={() => {
              if (isDrag || hasDragged) {
                return;
              }
              handleCategoryChange(category.value);
            }}>
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterButton;
