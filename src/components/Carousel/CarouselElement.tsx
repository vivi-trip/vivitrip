import { CarouselItem } from "@/src/types/carousel";
import Image from "next/image";

const CarouselElement = ({ item }: { item: CarouselItem }) => {
  return (
    <div className="relative flex h-240 w-full shrink-0 flex-col justify-between md:h-550">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={item.src}
          alt={Array.isArray(item.title) ? item.title.join(" ") : item.title}
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
          item.title.map((line) => <p key={`${item.src}-${line}`}>{line}</p>)
        ) : (
          <p>{item.title}</p>
        )}
      </div>
    </div>
  );
};

export default CarouselElement;
