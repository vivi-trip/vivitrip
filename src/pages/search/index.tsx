import AllActivities from "@/src/components/Activity/AllActivities";
import SearchableLayout from "@/src/components/SearchableLayout";
import { listPopularActivities } from "@/src/services/activities";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { q } = context.query;
  const searchedActivitiesInitialData = await listPopularActivities(1);
  const { totalCount } = searchedActivitiesInitialData;

  const searchedActivities = await listPopularActivities(
    totalCount,
    1,
    q as string,
  );

  return {
    props: {
      searchedActivities,
    },
  };
};

const Search = ({
  searchedActivities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { q } = router.query;

  const { activities, totalCount } = searchedActivities;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState(8);

  return (
    <div className="mt-24 lg:mt-40">
      <h1 className="font-24px-semibold md:font-32px-semibold">
        {`'${q}' 검색 결과 `}
        <span className="font-24px-bold md:font-32px-bold text-brand-500">
          {totalCount}
        </span>
        <span>건</span>
      </h1>
      <div>
        <AllActivities
          activities={activities}
          setSize={setSize}
          emptyMessage={
            <>
              검색어와 일치하는 체험이 없습니다.
              <br />
              다른 검색어를 사용해 보세요.
            </>
          }
          className="mt-16 md:mt-24"
        />
      </div>
    </div>
  );
};

export default Search;

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
