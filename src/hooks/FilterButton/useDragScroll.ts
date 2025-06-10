import { UseDragScrollProps } from "@/src/types/filterButton";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const useDragScroll = ({
  scrollRef,
  slideWidth,
  buttonGap,
  currentIndex,
}: UseDragScrollProps) => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    e.preventDefault();
    setIsDrag(true);
    setHasDragged(false);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    e.stopPropagation();

    if (hasDragged) {
      e.preventDefault();
    }

    setIsDrag(false);
  };

  const handleMouseLeave = () => {
    setIsDrag(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrag || !scrollRef.current) return;

    if (isDrag) {
      const { current } = scrollRef;
      const { scrollWidth, clientWidth, scrollLeft } = current;
      current.scrollLeft = startX - e.pageX;

      // 일정 거리 이상 이동 시 드래그로 간주
      if (Math.abs(e.pageX - startX) > 5) {
        setHasDragged(true);
      }

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const router = useRouter();
  const hasCategoryQuery = Boolean(router.query.category);
  const prevHasCategoryQuery = useRef(hasCategoryQuery);
  const hasScrolledOnInit = useRef(false);

  // 스크롤 이동 로직
  useEffect(() => {
    const container = document.getElementById("button-container");

    if (!container || hasScrolledOnInit.current) return;

    const isInitialLoadWithoutCategory =
      typeof window !== "undefined" && !hasCategoryQuery;

    const isPageReloadWithCategoryChanged =
      prevHasCategoryQuery.current !== hasCategoryQuery;

    if (
      (isInitialLoadWithoutCategory && currentIndex === 0) ||
      isPageReloadWithCategoryChanged
    ) {
      const scrollDistance = slideWidth * currentIndex;

      container.scrollTo({
        left: scrollDistance,
        behavior: "smooth",
      });

      hasScrolledOnInit.current = true;
      prevHasCategoryQuery.current = hasCategoryQuery;
    }
  }, [slideWidth, buttonGap, currentIndex, hasCategoryQuery]);

  useEffect(() => {
    if (!hasCategoryQuery && prevHasCategoryQuery.current) {
      hasScrolledOnInit.current = false;
    }
  }, [hasCategoryQuery]);

  return {
    isDrag,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    hasDragged,
  };
};

export default useDragScroll;
