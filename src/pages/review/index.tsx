import Review from "@/src/components/Review";
import { listAllActivities } from "@/src/services/activities";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const response = await listAllActivities("latest");
  const { activities } = response;

  if (!activities || activities.length === 0) {
    return {
      props: { activityId: null },
    };
  }

  // activityId 랜덤으로 선택
  const randomIndex = Math.floor(Math.random() * activities.length);
  const activityId = activities[randomIndex].id;

  return {
    props: {
      activityId,
    },
  };
};

const ReviewPage = ({
  activityId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return activityId ? (
    <Review activityId={activityId} />
  ) : (
    <div>리뷰를 불러올 수 없습니다.</div>
  );
};

export default ReviewPage;
