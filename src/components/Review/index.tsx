import Pagination from "@/src/components/Pagination";
import ProgressBar from "@/src/components/Review/ProgressBar";
import RatingSummary from "@/src/components/Review/RatingSummary";
import ReviewList from "@/src/components/Review/ReviewList";
import { getActivityReviews } from "@/src/services/activities";
import { ReviewSummary } from "@/src/types/review";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Review = ({ reviews, totalCount, averageRating }: ReviewSummary) => {
  const router = useRouter();
  const searchParams = router.query;
  const currentPage = Number(searchParams.page) || 1;
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const activityId = reviews[0]?.activityId;
  const size = 3;

  // 초기 페이지 설정
  useEffect(() => {
    if (!searchParams.page) {
      router.replace(`?page=1`);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (totalCount === 0) return;

    const fetchReviews = async () => {
      try {
        const page = Number(searchParams.page) || 1;

        const response = await getActivityReviews({ activityId, page, size });
        setFetchedReviews(response.reviews);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchReviews();
  }, [activityId, reviews, searchParams, size, totalCount]);

  return (
    <div className="mx-auto flex max-w-1200 flex-col gap-24">
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
      <ReviewList fetchedReviews={fetchedReviews} />
      {totalCount > 0 ? (
        <footer className="mb-120 mt-16 flex justify-center md:mt-66 lg:mt-48">
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
