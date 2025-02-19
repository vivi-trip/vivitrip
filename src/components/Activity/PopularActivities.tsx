import LeftArrow from "@/assets/svgs/btnArrow48pxDefault.svg";
import RightArrow from "@/assets/svgs/btnArrow48pxVariant4.svg";
import PopularActivityItem from "@/src/components/Activity/PopularActivityItem";
import Button from "@/src/components/Button/Button";
import useAutoSlide from "@/src/hooks/Activity/useAutoSlide";
import useAutoSlideStatus from "@/src/hooks/Activity/useAutoSlideStatus";
import useItemWidth from "@/src/hooks/Activity/useItemWidth";
import useSlideWidth from "@/src/hooks/Activity/useSlideWidth";
import { PopularActivitiesProps } from "@/src/types/activity";
import clsx from "clsx";

const PopularActivities = ({
  activities,
  currentIndex,
  setCurrentIndex,
  containerWidth,
  totalCount,
  handlePrev,
  handleNext,
  emptyMessage,
}: PopularActivitiesProps) => {
  // auto slide 활성화 여부
  const { isAutoSlide, pauseAutoSlide } = useAutoSlideStatus();

  // sm, md: 버튼 클릭 시 auto slide 중지
  const handleManualPrev = () => {
    pauseAutoSlide();
    handlePrev();
  };

  const handleManualNext = () => {
    pauseAutoSlide();
    handleNext();
  };

  // auto slide
  useAutoSlide(isAutoSlide, activities.length, setCurrentIndex);

  // 슬라이드 이동 너비 설정
  const { gap, slideWidth, handleResize } = useSlideWidth();

  // 인기 체험 아이템 크기
  const itemWidth = useItemWidth(gap, containerWidth);

  // 체험이 없을 때 메시지 표시
  if (!activities || activities.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="group relative max-w-1200 overflow-hidden">
      <div
        className="grid grid-flow-col gap-16 overflow-hidden transition-transform duration-700 ease-in-out md:gap-24"
        style={{
          transform: `translateX(-${(currentIndex ?? 0) * slideWidth}px)`,
          width:
            activities.length > 0
              ? `${activities.length * itemWidth + (activities.length - 1) * gap}px`
              : "100%",
        }}>
        {Array.isArray(activities) &&
          activities.map((activity) => (
            <PopularActivityItem
              key={activity.id}
              {...activity}
              onImageLoad={handleResize}
            />
          ))}
      </div>
      <div className="hidden group-hover:block lg:group-hover:hidden">
        <Button
          type="button"
          className="absolute left-1 top-1/2 size-30 -translate-y-1/2 md:size-40"
          onClick={handleManualPrev}
          disabled={currentIndex === 0}>
          <LeftArrow
            className={clsx(
              "size-30 bg-black/50 text-white md:size-40",
              currentIndex === 0 && "invisible",
            )}
            aria-label="이전 인기 체험 보기 버튼"
          />
        </Button>
        <Button
          type="button"
          className="absolute right-1 top-1/2 size-30 -translate-y-1/2 md:size-40"
          onClick={handleManualNext}
          disabled={currentIndex === totalCount - 3}>
          <RightArrow
            className={clsx(
              "size-30 bg-black/50 text-white md:size-40",
              currentIndex === totalCount - 3 && "invisible",
            )}
            aria-label="다음 인기 체험 보기 버튼"
          />
        </Button>
      </div>
    </div>
  );
};

export default PopularActivities;
