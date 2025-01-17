import StarLgIcon from "@/assets/svgs/ic_star_lg.svg";
import { ReviewItem, ReviewSummary } from "@/src/types/review";

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
    switch (true) {
      case rating >= 0 && rating < 1:
        return "매우 불만족";
      case rating >= 1 && rating < 2:
        return "불만족";
      case rating >= 2 && rating < 3:
        return "보통";
      case rating >= 3 && rating < 4:
        return "만족";
      case rating >= 4 && rating < 5:
        return "매우 만족";
      default:
        return "보통";
    }
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

  return (
    <section className="flex h-full w-2/5 flex-col items-center justify-center gap-8 py-10 md:gap-0">
      <div className="flex flex-row items-center gap-5">
        <StarLgIcon className="size-39 text-yellow-200 md:size-43" />
        <div className="flex items-baseline gap-5">
          <p className="font-44px-bold md:font-50px-bold">{roundedRating}</p>
          <p className="font-24px-medium md:font-28px-regular text-gray-300">
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
        <p className="font-14px-bold md:font-16px-bold rounded-20 border border-brand-300 bg-brand-200 px-16 py-4 text-brand-500">
          {satisFactionLevel(roundedRating)}
        </p>
      </div>
    </section>
  );
};

export default RatingSummary;
