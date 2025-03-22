import { useEffect, useState } from "react";

const useFilterButtonLayout = () => {
  const [buttonWidth, setButtonWidth] = useState(0); // 각 버튼의 너비
  const [slideWidth, setSlideWidth] = useState(134); // 이동 거리
  const [buttonGap, setButtonGap] = useState(0); // 각 버튼의 사이 여백

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setButtonWidth(127);
        setSlideWidth(147);
        setButtonGap(20);
      } else if (window.innerWidth >= 768) {
        setButtonWidth(120);
        setSlideWidth(134);
        setButtonGap(14);
      } else {
        setButtonWidth(80);
        setSlideWidth(88);
        setButtonGap(8);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { buttonWidth, slideWidth, buttonGap };
};

export default useFilterButtonLayout;
