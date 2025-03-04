import { CarouselProps } from "@/src/types/carousel";
import { useCallback, useEffect, useState } from "react";

const useCarousel = ({ items }: CarouselProps) => {
  const extendedItems = [items[10], ...items, items[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const goToPrevious = () => {
    if (currentIndex <= 0) return;

    setTransition(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = useCallback(() => {
    if (currentIndex === extendedItems.length - 1) return;

    setTransition(true);
    setCurrentIndex((prevIndex) => {
      if (currentIndex === 12) {
        return 1;
      }
      return prevIndex + 1;
    });
  }, [currentIndex, extendedItems.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, goToNext]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentIndex === 0) {
      timeoutId = setTimeout(() => {
        setCurrentIndex(extendedItems.length - 2);
        setTransition(false);
      }, 500);
    } else if (currentIndex === extendedItems.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentIndex(1);
        setTransition(false);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex, extendedItems.length]);

  return { transition, currentIndex, extendedItems, goToPrevious, goToNext };
};

export default useCarousel;
