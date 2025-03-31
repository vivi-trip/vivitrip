import AllActivities from "@/src/components/Activity/AllActivities";
import Dropdown from "@/src/components/Activity/Dropdown";
import { AllActivitiesListProps } from "@/src/types/activity";
import { useRouter } from "next/router";

const AllActivitiesList = ({
  activities,
  selectedCategory: filteredActivities,
}: AllActivitiesListProps) => {
  const router = useRouter();
  let subTitle;
  if (router.query.category) {
    subTitle = router.query.category;
  } else {
    subTitle = "모든 체험";
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-18px-bold md:font-36px-bold lg:font-36px-bold !leading-none">
          🛼 {subTitle}
        </p>
        <Dropdown />
      </div>
      <AllActivities
        activities={activities}
        emptyMessage="체험이 존재하지 않습니다."
        selectedCategory={filteredActivities}
        className="mt-24 md:mt-32"
      />
    </>
  );
};

export default AllActivitiesList;
