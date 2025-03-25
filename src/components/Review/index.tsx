import Pagination from "@/src/components/Pagination";
import ProgressBar from "@/src/components/Review/ProgressBar";
import RatingSummary from "@/src/components/Review/RatingSummary";
import ReviewList from "@/src/components/Review/ReviewList";
import useReviews from "@/src/hooks/Review/useReviews";
import { useRouter } from "next/router";

const Review = ({ activityId }: { activityId: number }) => {
  const router = useRouter();
  const { page } = router.query;
  const currentPage = Number(page) || 1;
  const size = 3;

  // data fetching
  const { reviews, reviewList, totalCount, averageRating } = useReviews({
    activityId,
    currentPage,
    size,
  });

  return (
    <div className="mx-auto flex flex-col gap-24">
      <header className="flex gap-10">
        <h2 className="font-20px-bold">후기</h2>
        <h2 className="font-20px-bold text-brand-500">{totalCount}</h2>
      </header>
      <article className="mb-24 flex h-180 items-center justify-evenly gap-10 overflow-hidden rounded-20 border border-gray-200 bg-neutral-100/40 px-10">
        <RatingSummary
          reviews={reviews}
          totalCount={totalCount}
          averageRating={averageRating}
        />
        <div className="h-full border-r border-gray-200" />
        <ProgressBar reviews={reviews} totalCount={totalCount} />
      </article>
      <ReviewList fetchedReviews={reviewList} />
      {totalCount > 0 ? (
        <footer className="mt-16 flex justify-center md:mt-66 lg:mt-48">
          <Pagination
            totalItems={totalCount}
            pageCount={5}
            currentPage={currentPage}
            itemCountPerPage={size}
          />
        </footer>
      ) : null}
    </div>
  );
};

export default Review;
