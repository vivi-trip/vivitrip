import { useEffect, useState } from "react";

const useResponsiveLayout = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [buttonWidth, setButtonWidth] = useState(0); // 각 버튼의 너비
  const [slideWidth, setSlideWidth] = useState(134); // 이동 거리
  const [buttonGap, setButtonGap] = useState(0); // 각 버튼의 사이 여백

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 1152;

      let newGap: number;
      let newBtnWidth: number;

      if (window.innerWidth >= 1024) {
        newGap = 20;
        newBtnWidth = (containerWidth - 6 * newGap) / 7;
      } else if (window.innerWidth >= 768) {
        newGap = 18;
        newBtnWidth = 122;
      } else {
        newGap = 15;
        newBtnWidth = 90;
      }
      setButtonGap(newGap);
      setButtonWidth(newBtnWidth);
      setSlideWidth(newBtnWidth + newGap);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [buttonGap, buttonWidth, containerRef]);

  return { buttonWidth, slideWidth, buttonGap };
};

export default useResponsiveLayout;
