import { useEffect, useState } from "react";

const useItemWidth = (gap?: number, containerWidth?: number) => {
  const [itemWidth, setItemWidth] = useState(0);
  const [itemLength, setItemLength] = useState(3);
  const [itemGap, setItemGap] = useState(0);

  useEffect(() => {
    const updateItemWidth = () => {
      setItemLength(window.innerWidth <= 480 ? 2 : 3);
      if (gap && containerWidth) {
        setItemGap(itemLength === 3 ? 2 * gap : gap);
        setItemWidth(() => {
          return (containerWidth - itemGap) / itemLength;
        });
      }
    };

    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);

    return () => {
      window.removeEventListener("resize", updateItemWidth);
    };
  }, [containerWidth, gap, itemGap, itemLength]);

  return { itemWidth, itemLength };
};

export default useItemWidth;
