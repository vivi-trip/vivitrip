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
  const [startX, setStartX] = useState<number>(0); // 드래그 시작 시점의 마우스 x좌표 + 스크롤 위치
  const [hasDragged, setHasDragged] = useState(false); // 드래그 여부 추적

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

  // 새로고침 시 자동 스크롤 및 위치 고정
  const router = useRouter();
  const hasCategoryQuery = Boolean(router.query.category);
  const prevHasCategoryQuery = useRef(hasCategoryQuery); // 이전 hasCategoryQuery 값 추적
  useEffect(() => {
    // 쿼리스트링이 없을 때만 리렌더링 발생
    if (prevHasCategoryQuery.current) {
      const scrollDistance = !hasCategoryQuery
        ? 0
        : slideWidth * currentIndex - buttonGap;
      const container = document.getElementById("button-container");
      if (container) {
        container.scrollTo({
          left: scrollDistance,
          behavior: "smooth",
        });
      }
    }
    // prevHasCategoryQuery 업데이트
    prevHasCategoryQuery.current = hasCategoryQuery;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideWidth, buttonGap, prevHasCategoryQuery, hasCategoryQuery]);

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
