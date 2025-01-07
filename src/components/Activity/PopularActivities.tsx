import PopularActivityItem from "@/src/components/Activity/PopularActivityItem";
import { PopularActivitiesProps } from "@/src/types/activity";
import { useEffect, useState } from "react";

const PopularActivities = ({
  activities,
  currentIndex,
  setCurrentIndex,
  emptyMessage,
}: PopularActivitiesProps) => {
  // 슬라이드: sm, md 사이즈에서는 자동 슬라이드
  const [isAutoSlide, setIsAutoSlide] = useState(false);
  const [slideWidth, setSlideWidth] = useState(408);

  // 초기 렌더링 시 슬라이드 크기 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlideWidth(408);
      } else if (window.innerWidth >= 768) {
        setSlideWidth(416);
      } else {
        setSlideWidth(202);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    if (isAutoSlide) {
      const interval = setInterval(() => {
        setCurrentIndex?.((prevIndex) => {
          const nextIndex =
            prevIndex < activities.length - 1 ? prevIndex + 1 : 0;

          // 마지막 데이터에 도달했을 때 데이터 요청
          if (nextIndex === activities.length - 1) {
            setCurrentIndex(0);
          }
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [isAutoSlide, activities, setCurrentIndex]);

  // 화면 크기 확인 및 자동 슬라이드 활성화
  useEffect(() => {
    const updateAutoSlide = () => {
      setIsAutoSlide(window.innerWidth < 1024); // lg 이하일 때 자동 슬라이드
    };

    updateAutoSlide();
    window.addEventListener("resize", updateAutoSlide);

    return () => {
      window.removeEventListener("resize", updateAutoSlide);
    };
  }, []);

  // 체험이 없을 때 메시지 표시
  if (!activities || activities.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="relative mt-16 overflow-hidden md:mt-32 lg:mt-32">
      <div
        className="flex gap-16 transition-transform duration-700 ease-in-out md:gap-32 lg:gap-24"
        style={{
          transform: `translateX(-${(currentIndex ?? 0) * slideWidth}px)`,
          width:
            activities.length > 0 ? `${activities.length * 100}%` : "w-full",
        }}>
        {Array.isArray(activities) &&
          activities.map((activity) => (
            <PopularActivityItem key={activity.id} {...activity} />
          ))}
      </div>
    </div>
  );
};

export default PopularActivities;
