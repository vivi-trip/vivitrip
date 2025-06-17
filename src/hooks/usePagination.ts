import { useScroll } from "@/src/contexts/ScrollContext";
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
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemCountPerPage),
  );
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;
  const { scrollBlock } = useScroll();

  // 현재 페이지에 맞춰 시작 페이지(start) 계산
  useEffect(() => {
    // currentPage가 변경될 때마다 시작 페이지를 계산
    const newStart = Math.floor((currentPage - 1) / pageCount) * pageCount + 1;
    if (start !== newStart) setStart(newStart); // 새로운 시작 페이지로 업데이트
  }, [currentPage, pageCount, start]);

  // itemCountPerPage 혹은 totalItems가 바뀌면 totalPages 재계산
  useEffect(() => {
    const newTotalPages = Math.ceil(totalItems / itemCountPerPage);
    setTotalPages(newTotalPages);
  }, [itemCountPerPage, totalItems]);

  // 화면 크기 변경 시, 페이지가 유효한 범위 내에 있도록 자동 조정
  useEffect(() => {
    if (totalPages < 1) return () => {};

    const handleResize = () => {
      if (currentPage > totalPages) {
        router.push(`?page=${totalPages}`);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage, router, totalPages]);

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
