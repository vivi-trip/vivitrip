import ActivitiesCard from "./ActivityCard";
import IconEmpty from "@/assets/svgs/ic_empty.svg";
import useIntersectionObserver from "@/src/hooks/useIntersectionObserver";
import { useGetInfiniteMyActivities } from "@/src/hooks/useMyActivities";

const ActivityList = () => {
  const { data, fetchNextPage, hasNextPage, isError } =
    useGetInfiniteMyActivities();

  const { setTarget } = useIntersectionObserver({
    threshold: 0.1,
    hasNextPage,
    fetchNextPage,
  });

  if (isError) {
    return <div>Error: 로그인 후 이용해주세요</div>;
  }

  return (
    <>
      <div className="mt-16 flex flex-col gap-6 mb-30">
        {data?.pages.map((page) => {
          if (page.totalCount === 0) {
            return (
              <div
                key="no-activities"
                className="mt-80 flex flex-col items-center gap-20">
                <div className="">
                  <IconEmpty />
                </div>
                <p className="">아직 등록한 체험이 없어요</p>
              </div>
            );
          }

          return page.activities.map((item) => (
            <ActivitiesCard key={item.id} activity={item} />
          ));
        })}
      </div>

      <div ref={setTarget} />
    </>
  );
};

export default ActivityList;
