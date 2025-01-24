import PopularActivities from "./PopularActivities";
import LeftArrow from "@/assets/svgs/btnArrow48pxDefault.svg";
import RightArrow from "@/assets/svgs/btnArrow48pxVariant4.svg";
import Button from "@/src/components/Button/Button";
import { ActivitiesResponse } from "@/src/types/activities";
import clsx from "clsx";
import { useState } from "react";

const PopularActivitiesList = ({
  activities,
  totalCount,
}: ActivitiesResponse) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // lg size일 때 인기 체험 이동 버튼
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < activities.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
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
        emptyMessage="체험이 존재하지 않습니다."
      />
    </>
  );
};

export default PopularActivitiesList;
