import { useEffect, useState } from "react";

const useItemWidth = (gap: number, containerWidth: number) => {
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const updateItemWidth = () => {
      let newItemWidth;
      if (window.innerWidth >= 1024) {
        newItemWidth = (containerWidth - 2 * gap) / 3;
        setItemWidth(newItemWidth);
      } else if (window.innerWidth >= 768) {
        newItemWidth = (containerWidth - 2 * gap) / 3;
        setItemWidth(newItemWidth);
      } else {
        newItemWidth = (containerWidth - 2 * gap) / 3;
        setItemWidth(newItemWidth);
      }
    };

    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);

    return () => {
      window.removeEventListener("resize", updateItemWidth);
    };
  }, [containerWidth, gap, itemWidth]);

  return itemWidth;
};

export default useItemWidth;
