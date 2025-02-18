import PopularActivityItem from "@/src/components/Activity/PopularActivityItem";
import useAutoSlide from "@/src/hooks/Activity/useAutoSlide";
import useAutoSlideStatus from "@/src/hooks/Activity/useAutoSlideStatus";
import useItemWidth from "@/src/hooks/Activity/useItemWidth";
import useSlideWidth from "@/src/hooks/Activity/useSlideWidth";
import { PopularActivitiesProps } from "@/src/types/activity";

const PopularActivities = ({
  activities,
  currentIndex,
  setCurrentIndex,
  containerWidth,
  emptyMessage,
}: PopularActivitiesProps) => {
  // auto slide 활성화 여부
  const isAutoSlide = useAutoSlideStatus();

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
        className="mt-16 grid grid-flow-col gap-16 overflow-hidden transition-transform duration-700 ease-in-out md:mt-32 md:gap-24"
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
    </div>
  );
};

export default PopularActivities;
