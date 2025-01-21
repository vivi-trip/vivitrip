import PROGRESS_BAR_ITEM from "@/src/constants/progressBar";
import { ReviewItem, ReviewSummary } from "@/src/types/review";

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

  return (
    <section className="flex h-full w-3/5 max-w-600 flex-col items-center justify-evenly p-10 md:px-20 lg:px-30">
      {reversedItems.map(({ range, title }) => (
        <div
          key={range}
          className="flex w-full items-center justify-between gap-20 whitespace-nowrap md:gap-30">
          <p className="font-16px-regular w-74 shrink-0 text-left">{title}</p>
          <div className="flex w-full items-center justify-between gap-15 md:gap-20">
            <div className="relative h-17 w-full flex-1 rounded-8 bg-brand-100">
              <div
                className={`h-full rounded-8 ${progressBarColor(ratingCounts[range])}`}
                style={{
                  width: `${(ratingCounts[range] / totalCount) * 100}%`,
                }}
              />
            </div>
            <p className="font-16px-medium w-10 text-center">
              {ratingCounts[range]}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProgressBar;
