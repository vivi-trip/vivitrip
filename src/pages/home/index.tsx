import AllActivitiesList from "@/src/components/Activity/AllActivitiesList";
import Dropdown from "@/src/components/Activity/Dropdown";
import PopularActivitiesList from "@/src/components/Activity/PopularActivitiesList";
import FilterButton from "@/src/components/Button/FilterButton";
import SearchableLayout from "@/src/components/SearchableLayout";
import {
  listAllActivities,
  listPopularActivities,
} from "@/src/services/activities";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const popularActivitiesInitialData = await listPopularActivities(1);
  const { totalCount } = popularActivitiesInitialData;

  const { category, sort = "latest" } = context.query;

  const allActivitiesInitialData = await listAllActivities(
    sort as string,
    category as string,
  );

  const [popularActivities, allActivities] = await Promise.all([
    listPopularActivities(totalCount),
    allActivitiesInitialData,
  ]);

  return {
    props: {
      popularActivities,
      allActivities,
    },
  };
};

const Home = ({
  popularActivities,
  allActivities: allActivitiesInitialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { category } = router.query;

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setSelectedCategory(category as string);
  }, [category]);

  const allActivities = allActivitiesInitialData.activities;
  const { activities, totalCount } = popularActivities;

  return (
    <>
      <PopularActivitiesList activities={activities} totalCount={totalCount} />
      <div className="mb-24 mt-40 flex flex-row items-center justify-between gap-15 md:mb-35 md:mt-60 lg:mb-35 lg:mt-60">
        <FilterButton />
        <Dropdown />
      </div>
      <AllActivitiesList
        activities={allActivities}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
