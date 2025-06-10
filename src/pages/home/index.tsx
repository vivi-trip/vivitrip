import AllActivitiesList from "@/src/components/Activity/AllActivitiesList";
import PopularActivitiesList from "@/src/components/Activity/PopularActivitiesList";
import FilterButton from "@/src/components/Button/FilterButton";
import SearchableLayout from "@/src/components/SearchableLayout";
import {
  listAllActivities,
  listPopularActivities,
} from "@/src/services/activities";
import { ActivitiesResponse } from "@/src/types/activities";
import { AllActivityQueryParams } from "@/src/types/activity";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export const getStaticProps = async () => {
  const popularActivitiesInitialData = await listPopularActivities(1);
  const { totalCount } = popularActivitiesInitialData;

  const allActivities = await listAllActivities("latest", totalCount);

  return {
    props: {
      totalCount,
      allActivities,
    },
  };
};

const Home = ({
  totalCount: activityTotalCount,
  allActivities: initialAllActivities,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { category, sort = "latest" } =
    router.query as unknown as AllActivityQueryParams;

  const [selectedCategory, setSelectedCategory] = useState(category);

  // 인기 체험
  const [popularActivities, setPopularActivities] =
    useState<ActivitiesResponse>({
      activities: [],
      totalCount: 0,
    });

  useEffect(() => {
    const fetchPopularActivities = async () => {
      const updatedData = await listPopularActivities(activityTotalCount);
      setPopularActivities(updatedData);
    };

    fetchPopularActivities();
  }, [activityTotalCount]);

  const { activities, totalCount } = popularActivities;

  // 모든 체험
  const [allActivities, setAllActivities] = useState(initialAllActivities);

  useEffect(() => {
    if (!totalCount) return;

    setSelectedCategory(category);

    const fetchActivities = async () => {
      const data = await listAllActivities(sort, totalCount, category);
      setAllActivities(data);
    };

    fetchActivities();
  }, [category, totalCount, sort]);

  const { activities: allActivityList } = allActivities;

  return (
    <>
      <PopularActivitiesList activities={activities} totalCount={totalCount} />
      <div className="mb-24 mt-40 flex flex-row items-center justify-between gap-15 md:mb-35 md:mt-60 lg:mb-35 lg:mt-60">
        <FilterButton />
      </div>
      <AllActivitiesList
        activities={allActivityList}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
