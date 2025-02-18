import { useState } from "react";

const useSlideWidth = () => {
  const [gap, setGap] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const handleResize = (width: number) => {
    let newGap;
    if (window.innerWidth >= 1024) {
      newGap = 24;
    } else if (window.innerWidth >= 768) {
      newGap = 24;
    } else {
      newGap = 16;
    }

    setGap(newGap);
    setSlideWidth(width + newGap + 1.6);
    return newGap;
  };

  return { gap, slideWidth, handleResize };
};

export default useSlideWidth;
