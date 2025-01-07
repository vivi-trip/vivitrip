interface Category {
  label: string;
  value: string;
}

interface UseOverflowDetectionProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  buttonWidth: number;
  buttonGap: number;
  categories: Category[];
}

interface UseDragScrollProps {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  slideWidth: number;
  buttonGap: number;
  currentIndex: number;
}

export type { Category, UseOverflowDetectionProps, UseDragScrollProps };
