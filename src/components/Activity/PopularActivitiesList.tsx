import LeftArrow from "@/assets/svgs/btnArrow48pxDefault.svg";
import RightArrow from "@/assets/svgs/btnArrow48pxVariant4.svg";
import PopularActivities from "@/src/components/Activity/PopularActivities";
import Button from "@/src/components/Button/Button";
import useItemWidth from "@/src/hooks/Activity/useItemWidth";
import useSliderNavigation from "@/src/hooks/Activity/useSliderNavigation";
import useVisibleWidth from "@/src/hooks/Activity/useVisibleWidth";
import { ActivitiesResponse } from "@/src/types/activities";
import clsx from "clsx";

const PopularActivitiesList = ({
  activities,
  totalCount,
}: ActivitiesResponse) => {
  const { itemLength } = useItemWidth();
  const itemsPerSlide = itemLength;

  // lg size일 때 인기 체험 이동 버튼
  const { currentIndex, setCurrentIndex, handlePrev, handleNext } =
    useSliderNavigation(totalCount, itemsPerSlide);

  // clientWidth 추적
  const { containerRef, visibleWidth } = useVisibleWidth();

  return (
    <>
      <div
        ref={containerRef}
        className="mb-16 mt-24 flex items-center justify-between md:mb-32 md:mt-18 lg:mt-32">
        <h2 className="font-18px-bold md:font-36px-bold lg:font-36px-bold">
          🔥 인기 체험
        </h2>
        <div className="hidden gap-12 lg:flex">
          <Button
            type="button"
            className="size-44"
            onClick={handlePrev}
            disabled={currentIndex === 0}>
            <LeftArrow
              width={44}
              height={44}
              className={clsx(
                currentIndex === 0 ? "text-brand-300" : "text-brand-600",
              )}
              aria-label="이전 인기 체험 보기 버튼"
            />
          </Button>
          <Button
            type="button"
            className="size-44"
            onClick={handleNext}
            disabled={currentIndex === totalCount - 3}>
            <RightArrow
              width={44}
              height={44}
              className={clsx(
                currentIndex === totalCount - 3
                  ? "text-brand-200"
                  : "text-brand-600",
              )}
              aria-label="다음 인기 체험 보기 버튼"
            />
          </Button>
        </div>
      </div>
      <PopularActivities
        activities={activities}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        containerWidth={visibleWidth}
        totalCount={totalCount}
        handlePrev={handlePrev}
        handleNext={handleNext}
        itemsPerSlide={itemsPerSlide}
        emptyMessage="체험이 존재하지 않습니다."
      />
    </>
  );
};

export default PopularActivitiesList;
