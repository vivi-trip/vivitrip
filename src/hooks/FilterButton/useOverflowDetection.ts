import { UseOverflowDetectionProps } from "@/src/types/filterButton";
import { useEffect, useRef, useState } from "react";

const useOverflowDetection = ({
  containerRef,
  scrollRef,
  buttonWidth,
  buttonGap,
  categories,
}: UseOverflowDetectionProps) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(true);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const scrollNode = scrollRef.current;

    const checkOverflow = () => {
      if (containerRef.current && scrollRef.current) {
        const { clientWidth, scrollLeft, scrollWidth } = scrollRef.current;
        scrollLeftRef.current = scrollLeft;
        const atLast = scrollLeft + clientWidth + 1;

        setIsOverflowing(atLast < scrollWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    scrollNode?.addEventListener("scroll", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      scrollNode?.removeEventListener("scroll", checkOverflow);
    };
  }, [buttonGap, buttonWidth, categories.length, containerRef, scrollRef]);

  return isOverflowing;
};

export default useOverflowDetection;
