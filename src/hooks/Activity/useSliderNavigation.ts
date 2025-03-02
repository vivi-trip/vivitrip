import { useCallback, useState } from "react";

const useSliderNavigation = (totalCount: number, itemsPerSlide: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (totalCount && itemsPerSlide) {
      if (currentIndex < totalCount - itemsPerSlide) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [currentIndex, totalCount, itemsPerSlide]);

  return {
    currentIndex,
    setCurrentIndex,
    handlePrev,
    handleNext,
  };
};

export default useSliderNavigation;
