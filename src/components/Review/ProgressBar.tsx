import PROGRESS_BAR_ITEM from "@/src/constants/progressBar";
import useResponsiveTextStyle from "@/src/hooks/Activity/useResponsiveTextStyle";
import { ReviewItem, ReviewSummary } from "@/src/types/review";
import clsx from "clsx";

const ProgressBar = ({ reviews, totalCount }: ReviewSummary) => {
  const reversedItems = [...PROGRESS_BAR_ITEM].reverse();

  const countByRating = (reviewItems: ReviewItem[]) => {
    const counts = reversedItems.reduce(
      (acc, { range }) => {
        acc[range] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    reviewItems.forEach((review) => {
      const { rating } = review;

      const rangeItem = PROGRESS_BAR_ITEM.find(({ range }) => {
        return Number(range) === Math.floor(rating);
      });

      if (rangeItem) {
        counts[rangeItem.range] += 1;
      }
    });

    return counts;
  };

  const ratingCounts = countByRating(reviews);
  const maxCount = Math.max(...Object.values(ratingCounts));

  const progressBarColor = (count: number) => {
    switch (count) {
      case 0:
        return "bg-gray-100";
      case maxCount:
        return "bg-brand-500";
      default:
        return "bg-gray-300";
    }
  };

  const { isExtraXsScreen } = useResponsiveTextStyle();

  return (
    <section
      className={clsx(
        "flex h-full w-3/5 max-w-600 flex-col items-center justify-evenly",
        isExtraXsScreen ? "px-0 py-10" : "p-10 md:px-20 lg:px-30",
      )}>
      {reversedItems.map(({ range, title }) => (
        <div
          key={range}
          className={clsx(
            "flex w-full items-center justify-between whitespace-nowrap",
            isExtraXsScreen ? "gap-5" : "gap-20 md:gap-30",
          )}>
          <p
            className={clsx(
              "w-74 shrink-0 text-left",
              isExtraXsScreen ? "font-14px-regular" : "font-16px-regular",
            )}>
            {title}
          </p>
          <div className="flex w-full items-center justify-between gap-15 md:gap-20">
            <div className="relative h-17 w-full flex-1 rounded-8 bg-brand-100">
              <div
                className={`h-full rounded-8 ${progressBarColor(ratingCounts[range])}`}
                style={{
                  width: `${(ratingCounts[range] / totalCount) * 100}%`,
                }}
              />
            </div>
            <p
              className={clsx(
                "w-10 text-center",
                isExtraXsScreen ? "font-14px-medium" : "font-16px-medium",
              )}>
              {ratingCounts[range]}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProgressBar;
