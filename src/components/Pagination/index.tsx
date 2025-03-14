import AltArrowLeft from "@/assets/svgs/altArrowLeft.svg";
import AltArrowRight from "@/assets/svgs/altArrowRight.svg";
import Button from "@/src/components/Button/Button";
import Loading from "@/src/components/Loading";
import useResponsiveTextStyle from "@/src/hooks/Activity/useResponsiveTextStyle";
import usePagination from "@/src/hooks/usePagination";
import useLoadingStore from "@/src/stores/loadingStore";
import { ButtonTextSizeType } from "@/src/types/button";
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
  const { isMicroScreen, isExtraXsScreen, isSmallerXsScreen } =
    useResponsiveTextStyle();

  // border radius
  const isSmallScreen = isMicroScreen || isExtraXsScreen || isSmallerXsScreen;
  const radius = isSmallScreen ? "9" : "15";

  // button font style
  const getFontStyle = (
    smallScreen: boolean,
    isActivePage: boolean,
  ): ButtonTextSizeType => {
    if (smallScreen) return isActivePage ? "m" : "s";
    return isActivePage ? "xxxl" : "xxl";
  };

  const buttonSize = "w-full h-auto max-w-55 max-h-55 aspect-square relative";
  const iconSize = isSmallScreen ? "15" : "21";

  const { start, noPrev, noNext, navigateToPage, totalPages } = usePagination({
    totalItems,
    pageCount,
    currentPage,
    itemCountPerPage,
  });

  // loading spinner
  const { loadingButtons, showLoadingButtons, hideLoadingButtons } =
    useLoadingStore();

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

  const handlePageClick = async (pageNumber: number) => {
    showLoadingButtons(pageNumber);
    try {
      await navigateToPage(pageNumber);
    } finally {
      hideLoadingButtons(pageNumber);
    }
  };

  return (
    <ul
      className={clsx(
        "flex max-h-55 w-full max-w-445 justify-center",
        isMicroScreen ? "gap-4" : "gap-10",
      )}>
      <li className={clsx(noPrev, buttonSize)}>
        <Button
          type="button"
          radius={radius}
          gap="10"
          backgroundColor={noPrev ? "white_gray" : "white_green"}
          disabled={noPrev}
          className={buttonSize}
          onClick={() => handlePageClick(start - 1)}>
          {loadingButtons?.[start - 1] ? (
            loadingSpinner
          ) : (
            <AltArrowLeft
              width={iconSize}
              height={iconSize}
              className={noPrev ? "text-gray-600" : "text-brand-400"}
              aria-label="이전 페이지로 이동 버튼"
            />
          )}
        </Button>
      </li>
      {Array.from({ length: pageCount }).map((_, i) => {
        const pageNumber = start + i;
        const isActivePage =
          currentPage === pageNumber || (pageNumber === 1 && !currentPage);
        const fontStyle = getFontStyle(isSmallScreen, isActivePage);

        return (
          pageNumber <= totalPages && (
            <li key={pageNumber} className={buttonSize}>
              <Button
                type="button"
                radius={radius}
                gap="10"
                backgroundColor={isActivePage ? "green" : "white_green"}
                fontStyle={fontStyle}
                disabled={isActivePage}
                className={buttonSize}
                onClick={() => handlePageClick(pageNumber)}>
                {loadingButtons?.[pageNumber] ? loadingSpinner : pageNumber}
              </Button>
            </li>
          )
        );
      })}
      <li className={buttonSize}>
        <Button
          type="button"
          radius={radius}
          gap="10"
          backgroundColor={noNext ? "white_gray" : "white_green"}
          className={buttonSize}
          disabled={noNext}
          onClick={() => handlePageClick(start + pageCount)}>
          {loadingButtons?.[start + pageCount] ? (
            loadingSpinner
          ) : (
            <AltArrowRight
              width={iconSize}
              height={iconSize}
              className={noNext ? "text-gray-600" : "text-brand-400"}
              aria-label="다음 페이지로 이동 버튼"
            />
          )}
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
