import { useEffect, useState } from "react";

const useAutoSlideStatus = () => {
  const [isAutoSlide, setIsAutoSlide] = useState(false);

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

  return isAutoSlide;
};

export default useAutoSlideStatus;
