import Review from "@/src/components/Review";
import { getActivityReviews } from "@/src/services/activities";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: GetServerSidePropsContext,
) => {
  // const {activityId} = context.query;
  const activityId = 3613; // 임시
  const reviewInitialData = await getActivityReviews({ activityId });
  const reviewTotalCount = reviewInitialData.totalCount;

  const reviewData = await getActivityReviews({
    activityId,
    page: 1,
    size: reviewTotalCount,
  });

  const { reviews, totalCount, averageRating } = reviewData;

  return {
    props: {
      activityId,
      reviews,
      totalCount,
      averageRating,
    },
  };
};

const ReviewPage = ({
  reviews,
  totalCount,
  averageRating,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Review
      reviews={reviews}
      totalCount={totalCount}
      averageRating={averageRating}
    />
  );
};

export default ReviewPage;
