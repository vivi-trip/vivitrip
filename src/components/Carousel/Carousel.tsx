import Button from "@/src/components/Button/Button";
import CarouselElement from "@/src/components/Carousel/CarouselElement";
import useCarousel from "@/src/hooks/Carousel/useCarousel";
import { CarouselProps } from "@/src/types/carousel";

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
            <CarouselElement key={`${imageIndex}-${item.src}`} item={item} />
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
