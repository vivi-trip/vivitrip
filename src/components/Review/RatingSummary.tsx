import StarLgIcon from "@/assets/svgs/ic_star_lg.svg";
import PROGRESS_BAR_ITEM from "@/src/constants/progressBar";
import useResponsiveTextStyle from "@/src/hooks/Activity/useResponsiveTextStyle";
import { ReviewItem, ReviewSummary } from "@/src/types/review";
import clsx from "clsx";

const RatingSummary = ({
  reviews,
  totalCount,
  averageRating,
}: ReviewSummary) => {
  // 평점
  const roundedRating =
    averageRating !== undefined ? Math.round(averageRating * 10) / 10 : "N/A";

  const satisFactionLevel = (rating: number | "N/A"): string => {
    if (totalCount === 0) return "보통";
    if (rating === "N/A") return "N/A";

    const ratingIndex = Math.ceil(rating) - 1;

    return PROGRESS_BAR_ITEM[ratingIndex]?.title;
  };

  // 만족도 계산
  const calculateSatisfactionPercentage = (
    reviewItems: ReviewItem[],
    total: number,
  ) => {
    if (total === 0) return 0;
    const satisfiedCount = reviewItems.filter(
      (review) => review.rating >= 3,
    ).length;
    return Math.round((satisfiedCount / total) * 100);
  };
  const satisfactionPercentage = calculateSatisfactionPercentage(
    reviews,
    totalCount,
  );

  // 텍스트스타일
  const { isMicroScreen, isExtraXsScreen } = useResponsiveTextStyle();

  return (
    <section className="flex h-full w-2/5 flex-col items-center justify-center gap-8 overflow-hidden py-10 md:gap-0">
      <div className="flex items-center gap-5">
        <StarLgIcon
          className={clsx(
            "text-yellow-200 md:size-43",
            isExtraXsScreen ? "size-27" : "size-39",
            isMicroScreen && "size-18",
          )}
        />
        <div className="flex items-baseline gap-5">
          <p
            className={clsx(
              "font-44px-bold md:font-50px-bold",
              isExtraXsScreen && "font-28px-bold",
              isMicroScreen && "font-20px-bold",
            )}>
            {roundedRating}
          </p>
          <p
            className={clsx(
              "font-24px-medium md:font-28px-medium text-gray-300",
              isExtraXsScreen && "font-18px-medium",
              isMicroScreen && "font-16px-medium",
            )}>
            /5
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        {totalCount > 0 ? (
          <div className="hidden items-center md:flex">
            <p>이용자의&nbsp;</p>
            <p className="font-16px-bold text-yellow-200">
              {satisfactionPercentage}%
            </p>
            <p>가 만족했어요.</p>
          </div>
        ) : (
          <div />
        )}
        <p
          className={clsx(
            "line-clamp-2 rounded-20 border border-brand-300 bg-brand-200 py-4 text-brand-500",
            isMicroScreen && isExtraXsScreen
              ? "font-12px-bold px-8"
              : "font-14px-bold md:font-16px-bold px-16",
          )}>
          {satisFactionLevel(roundedRating)}
        </p>
      </div>
    </section>
  );
};

export default RatingSummary;
