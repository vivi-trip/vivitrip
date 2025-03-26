import { useScroll } from "@/src/contexts/ScrollContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ScrollToTopHandler = () => {
  const router = useRouter();
  const { handleScrollToTop } = useScroll();

  useEffect(() => {
    router.events.on("routeChangeComplete", handleScrollToTop);
    return () => {
      router.events.off("routeChangeComplete", handleScrollToTop);
    };
  }, [router, handleScrollToTop]);

  return null; // UI 요소가 필요 없으므로 아무것도 렌더링하지 않음
};

export default ScrollToTopHandler;
