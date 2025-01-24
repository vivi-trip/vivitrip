import { useEffect, useState } from "react";

const useResponsiveSpinnerSize = (
  size: number | { sm?: number; md?: number; lg?: number },
  defaultSize = 60,
) => {
  const [spinnerSize, setSpinnerSize] = useState<number>(defaultSize);

  // loading spinner 크기 계산
  useEffect(() => {
    const getResponsiveSize = () => {
      if (typeof size === "number") {
        setSpinnerSize(size);
        return;
      }

      if (typeof size === "object") {
        const width = window.innerWidth;
        if (width >= 1024 && size.lg) {
          setSpinnerSize(size.lg);
        } else if (width >= 768 && size.md) {
          setSpinnerSize(size.md);
        } else if (size.sm) {
          setSpinnerSize(size.sm);
        }
      }
    };

    getResponsiveSize();
    window.addEventListener("resize", getResponsiveSize);
    return () => window.removeEventListener("resize", getResponsiveSize);
  }, [size]);

  return spinnerSize;
};

export default useResponsiveSpinnerSize;
