import { useScroll } from "../contexts/ScrollContext";
import { PaginationProps } from "@/src/types/pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePagination = ({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: PaginationProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;
  const { scrollBlock } = useScroll();

  // 현재 페이지에 맞춰 시작 페이지(start) 계산
  useEffect(() => {
    const newStart = Math.floor((currentPage - 1) / pageCount) * pageCount + 1;
    if (start !== newStart) setStart(newStart);
  }, [currentPage, pageCount, start]);

  // 화면 크기 변경 시, 페이지가 유효한 범위 내에 있도록 자동 조정
  useEffect(() => {
    const handleResize = () => {
      if (currentPage > totalPages) {
        router.push(`?page=${totalPages}`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage, totalPages, router]);

  // 페이지 이동
  const navigateToPage = (page: number): void => {
    scrollBlock(true);
    const newQuery = { ...router.query, page: String(page) };
    router
      .push({
        pathname: router.pathname,
        query: newQuery,
      })
      .finally(() => {
        scrollBlock(false);
      });
  };

  return {
    totalPages,
    start,
    noPrev,
    noNext,
    navigateToPage,
  };
};

export default usePagination;
