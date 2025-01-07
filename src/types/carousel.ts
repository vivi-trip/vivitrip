import { StaticImageData } from "next/image";

export interface CarouselItem {
  src: StaticImageData | string;
  title: string | string[];
}

export interface CarouselProps {
  items: CarouselItem[];
}
