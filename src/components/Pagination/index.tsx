import AltArrowLeft from "@/assets/svgs/AltArrowLeft.svg";
import AltArrowRight from "@/assets/svgs/AltArrowRight.svg";
import Button from "@/src/components/Button/Button";
import Loading from "@/src/components/Loading";
import usePagination from "@/src/hooks/usePagination";
import useLoadingStore from "@/src/stores/loadingStore";
import { PaginationProps } from "@/src/types/pagination";
import clsx from "clsx";

/**
 * @description
 * @param totalItems - 데이터 총 개수
 * @param pageCount -  한 번에 보여줄 페이지 개수
 * @param currentPage -  현재 페이지
 * @param itemCountPerPage -  페이지 당 데이터 개수
 */

const Pagination = ({
  totalItems,
  pageCount,
  currentPage,
  itemCountPerPage,
}: PaginationProps) => {
  const { start, noPrev, noNext, navigateToPage, totalPages } = usePagination({
    totalItems,
    pageCount,
    currentPage,
    itemCountPerPage,
  });
  const buttonSize = "w-40 h-40 sm:w-55 sm:h-55";
  const iconSize = "w-21 h-21";

  // loading spinner
  const { loadingButtons, showLoadingButtons, hideLoadingButtons } =
    useLoadingStore();

  const handlePageClick = async (pageNumber: number) => {
    showLoadingButtons(pageNumber);
    try {
      await navigateToPage(pageNumber);
    } finally {
      hideLoadingButtons(pageNumber);
    }
  };

  const loadingSpinner = (
    <Loading
      isOverlay="node"
      overlayColor="translate"
      isAbsolute="static"
      loadingBoxColor="translate"
      color="#ffffff"
      size={35}
    />
  );

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
            className={clsx(buttonSize, "relative")}
            onClick={() => handlePageClick(start - 1)}>
            {loadingButtons?.[start - 1] ? (
              loadingSpinner
            ) : (
              <AltArrowLeft
                className={clsx(
                  iconSize,
                  noPrev ? "text-gray-600" : "text-brand-400",
                )}
                aria-label="이전 페이지로 이동 버튼"
              />
            )}
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
                  className={buttonSize}
                  onClick={() => handlePageClick(pageNumber)}>
                  {loadingButtons?.[pageNumber] ? loadingSpinner : pageNumber}
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
            className={buttonSize}
            disabled={noNext}
            onClick={() => handlePageClick(start + pageCount)}>
            {loadingButtons?.[start + pageCount] ? (
              loadingSpinner
            ) : (
              <AltArrowRight
                className={`${iconSize} ${noNext ? "text-gray-600" : "text-brand-400"}`}
                aria-label="다음 페이지로 이동 버튼"
              />
            )}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
