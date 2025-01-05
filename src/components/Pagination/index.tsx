import AltArrowLeft from "@/assets/svgs/AltArrowLeft.svg";
import AltArrowRight from "@/assets/svgs/AltArrowRight.svg";
import Button from "@/src/components/Button/Button";
import usePagination from "@/src/hooks/usePagination";
import { PaginationProps } from "@/src/types/pagination";

const Pagination = ({
  totalItems, // 데이터 총 개수
  pageCount, // 한 번에 보여줄 페이지 개수
  currentPage, // 현재 페이지
  itemCountPerPage, // 페이지 당 데이터 개수
}: PaginationProps) => {
  const { start, noPrev, noNext, navigateToPage, totalPages } = usePagination({
    totalItems,
    pageCount,
    currentPage,
    itemCountPerPage,
  });
  const buttonSize = "w-40 h-40 sm:w-55 sm:h-55";
  const iconSize = "w-21 h-21";

  return (
    <div>
      <ul className="flex gap-10">
        <li className={`${noPrev}`}>
          <Button
            type="button"
            radius="15"
            gap="10"
            backgroundColor={noPrev ? "white_gray" : "white_green"}
            disabled={noPrev}
            className={`${buttonSize}`}
            onClick={() => navigateToPage(start - 1)}>
            <AltArrowLeft
              className={`${iconSize} ${noPrev ? "text-gray-600" : "text-brand-400"}`}
              alt="이전 버튼"
            />
          </Button>
        </li>
        {Array.from({ length: pageCount }).map((_, i) => {
          const pageNumber = start + i;
          const isActivePage =
            currentPage === pageNumber || (pageNumber === 1 && !currentPage);
          return (
            pageNumber <= totalPages && (
              <li key={pageNumber}>
                <Button
                  type="button"
                  radius="15"
                  gap="10"
                  backgroundColor={isActivePage ? "green" : "white_green"}
                  fontStyle={isActivePage ? "xxxl" : "xxl"}
                  disabled={isActivePage}
                  className={`${buttonSize}`}
                  onClick={() => navigateToPage(pageNumber)}>
                  {pageNumber}
                </Button>
              </li>
            )
          );
        })}
        <li>
          <Button
            type="button"
            radius="15"
            gap="10"
            backgroundColor={noNext ? "white_gray" : "white_green"}
            className={`${buttonSize}`}
            disabled={noNext}
            onClick={() => navigateToPage(start + pageCount)}>
            <AltArrowRight
              className={`${iconSize} ${noNext ? "text-gray-600" : "text-brand-400"}`}
              alt="다음 버튼"
            />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
