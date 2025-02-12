import { useScroll } from "@/src/contexts/ScrollContext";
import { useEffect } from "react";

const ScrollToTopHandler = () => {
  const { handleScrollToTop } = useScroll();

  useEffect(() => {
    handleScrollToTop();
  }, [handleScrollToTop]);

  return null; // UI 요소가 필요 없으므로 아무것도 렌더링하지 않음
};

export default ScrollToTopHandler;
