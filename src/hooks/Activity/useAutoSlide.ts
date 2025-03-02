import { Dispatch, SetStateAction, useEffect } from "react";

const useAutoSlide = (
  isAutoSlide: boolean,
  activitiesLength: number,
  itemLength: number,
  setCurrentIndex?: Dispatch<SetStateAction<number>>,
) => {
  useEffect(() => {
    if (isAutoSlide && setCurrentIndex) {
      const slideItemCount = itemLength === 3 ? 3 : 2;

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex: number) => {
          const nextIndex =
            prevIndex < activitiesLength - slideItemCount ? prevIndex + 1 : 0;

          // 마지막 데이터에 도달했을 때 데이터 요청
          if (nextIndex === activitiesLength - slideItemCount) {
            setCurrentIndex(0);
          }

          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [isAutoSlide, activitiesLength, setCurrentIndex, itemLength]);
};

export default useAutoSlide;
