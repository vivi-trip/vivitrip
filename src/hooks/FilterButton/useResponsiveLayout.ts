import { useEffect, useState } from "react";

const useResponsiveLayout = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [buttonWidth, setButtonWidth] = useState(0); // 각 버튼의 너비
  const [slideWidth, setSlideWidth] = useState(134); // 이동 거리
  const [buttonGap, setButtonGap] = useState(0); // 각 버튼의 사이 여백

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 1152;
      if (window.innerWidth >= 1024) {
        setButtonGap(20);
        setButtonWidth((containerWidth - 6 * buttonGap) / 7);
      } else if (window.innerWidth >= 768) {
        setButtonGap(18);
        setButtonWidth(122);
      } else {
        setButtonGap(15);
        setButtonWidth(90);
      }
      setSlideWidth(buttonWidth + buttonGap);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [buttonGap, buttonWidth, containerRef]);

  return { buttonWidth, slideWidth, buttonGap };
};

export default useResponsiveLayout;
