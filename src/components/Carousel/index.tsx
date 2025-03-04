import Button from "@/src/components/Button/Button";
import useCarousel from "@/src/hooks/Carousel/useCarousel";
import { CarouselProps } from "@/src/types/carousel";
import Image from "next/image";

const Carousel = ({ items }: CarouselProps) => {
  const { transition, currentIndex, extendedItems, goToPrevious, goToNext } =
    useCarousel({ items });

  const commonButtonClass =
    "font-16px-regular lg:font-24px-regular absolute top-1/2 h-50 w-25 -translate-y-1/2 rounded-full bg-basic-navy text-white hover:bg-brand-600 lg:h-60 lg:w-30";

  return (
    <div className="relative h-240 w-full overflow-hidden md:h-550">
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
      <Button
        type="button"
        onClick={() => goToPrevious()}
        className={`left-16 md:left-24 ${commonButtonClass}`}>
        &#8249;
      </Button>
      <Button
        type="button"
        onClick={() => goToNext()}
        className={`right-16 md:right-24 ${commonButtonClass}`}>
        &#8250;
      </Button>
    </div>
  );
};

export default Carousel;
