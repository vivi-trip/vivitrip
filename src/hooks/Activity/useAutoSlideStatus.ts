import { useCallback, useEffect, useState } from "react";

const useAutoSlideStatus = () => {
  const [isAutoSlide, setIsAutoSlide] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateAutoSlide = () => {
      setIsAutoSlide(window.innerWidth < 1024);
    };

    updateAutoSlide();
    window.addEventListener("resize", updateAutoSlide);

    return () => {
      window.removeEventListener("resize", updateAutoSlide);
    };
  }, []);

  // 자동 슬라이드 중지 & 일정 시간 후 재시작
  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  }, []);

  return { isAutoSlide: isAutoSlide && !isPaused, pauseAutoSlide };
};

export default useAutoSlideStatus;
