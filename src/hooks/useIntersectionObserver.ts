import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: Props) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return undefined;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
        return entry; // map은 반환값을 기대하므로 entry를 반환
      });
    };

    // ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [threshold, target, hasNextPage, fetchNextPage]);

  return { setTarget };
};

export default useIntersectionObserver;
