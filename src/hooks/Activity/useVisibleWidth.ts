import { useEffect, useRef, useState } from "react";

const useVisibleWidth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleWidth, setVisibleWidth] = useState(0);

  useEffect(() => {
    const updateVisibleWidth = () => {
      if (containerRef.current) {
        setVisibleWidth(containerRef.current.clientWidth);
      }
    };
    updateVisibleWidth();

    window.addEventListener("resize", updateVisibleWidth);
    return () => {
      window.removeEventListener("resize", updateVisibleWidth);
    };
  }, []);

  return { containerRef, visibleWidth };
};

export default useVisibleWidth;
