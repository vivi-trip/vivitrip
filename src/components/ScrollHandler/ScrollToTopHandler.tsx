import { useScroll } from "@/src/contexts/ScrollContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ScrollToTopHandler = () => {
  const router = useRouter();
  const { handleScrollToTop } = useScroll();

  useEffect(() => {
    const handleRouteChange = () => handleScrollToTop();

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, handleScrollToTop]);

  return null; // UI 요소가 필요 없으므로 아무것도 렌더링하지 않음
};

export default ScrollToTopHandler;
