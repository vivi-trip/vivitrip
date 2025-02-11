import Button from "@/src/components/Button/Button";
import { CarouselProps } from "@/src/types/carousel";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const Carousel = ({ items }: CarouselProps) => {
  const extendedItems = [items[0], ...items, items[0]];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const goToPrevious = () => {
    setTransition(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = useCallback(() => {
    if (currentIndex === extendedItems.length - 1) return;

    setTransition(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
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
        setCurrentIndex(extendedItems.length - 1);
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

  return (
    <div className="relative -mx-24 h-240 md:-mx-32 md:h-550">
      <div className="overflow-hidden">
        <div
          className={`flex flex-nowrap ${transition && "transition-transform duration-700 ease-in-out"}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {extendedItems.map((item, index) => {
            const imageIndex = item.src.toString().match(/\d+/)?.[0] || index;

            return (
              <div
                key={`${imageIndex}-${item.src}`}
                className="relative flex h-240 w-full shrink-0 flex-col justify-between md:h-550">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={
                      Array.isArray(item.title)
                        ? item.title.join(" ")
                        : item.title
                    }
                    className="object-cover object-center"
                    fill
                    priority
                  />
                </div>
                <div
                  className="font-24px-bold md:font-54px-bold lg:font-68px-bold absolute top-1/2 -translate-y-1/2 text-white"
                  style={{
                    left: "clamp(57px, 10vw, 157px)",
                  }}>
                  {Array.isArray(item.title) ? (
                    item.title.map((line) => (
                      <p key={`${item.src}-${line}`}>{line}</p>
                    ))
                  ) : (
                    <p>{item.title}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        type="button"
        onClick={() => goToPrevious()}
        className="font-16px-regular lg:font-24px-regular absolute left-16 top-1/2 h-50 w-25 -translate-y-1/2 rounded-full bg-basic-navy text-white hover:bg-brand-600 md:left-24 lg:h-60 lg:w-30">
        &#8249;
      </Button>
      <Button
        type="button"
        onClick={() => goToNext()}
        className="font-16px-regular lg:font-24px-regular absolute right-16 top-1/2 h-50 w-25 -translate-y-1/2 rounded-full bg-basic-navy text-white hover:bg-brand-600 md:right-24 lg:h-60 lg:w-30">
        &#8250;
      </Button>
    </div>
  );
};

export default Carousel;
