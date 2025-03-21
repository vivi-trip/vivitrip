/* eslint-disable no-console */
import { getActivityReviews } from "@/src/services/activities";
import { UseReviewsProps } from "@/src/types/review";
import { useEffect, useState } from "react";

const useReviews = ({ activityId, currentPage, size }: UseReviewsProps) => {
  // RatingSummary, ProgressBar
  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await getActivityReviews({ activityId });
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTotalCount();
  }, [activityId]);

  useEffect(() => {
    const fetchReviewSummary = async () => {
      try {
        const response = await getActivityReviews({
          activityId,
          page: 1,
          size: totalCount,
        });

        setReviews(response.reviews);
        setAverageRating(response.averageRating);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviewSummary();
  }, [activityId, currentPage, totalCount]);

  // ReviewList
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const fetchReviewList = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await getActivityReviews({
          activityId,
          page: currentPage,
          size,
        });

        setReviewList(response.reviews);
      } catch (error) {
        console.error(error);
        setFetchError(
          error instanceof Error ? error : new Error("오류가 발생했습니다"),
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviewList();
  }, [activityId, currentPage, size]);

  return {
    reviews,
    reviewList,
    totalCount,
    averageRating,
    isLoading,
    fetchError,
  };
};

export default useReviews;
