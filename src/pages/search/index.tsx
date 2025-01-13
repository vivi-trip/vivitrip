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
  const SearchedActivities = await listPopularActivities(10, 1, q as string);

  return {
    props: {
      SearchedActivities,
    },
  };
};

const Search = ({
  SearchedActivities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { q } = router.query;

  const { activities, totalCount } = SearchedActivities;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState(8);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-12">
        <div className="flex">
          <h1 className="font-24px-bold md:font-32px-bold text-basic-black">
            &apos;{q}&apos;
          </h1>
          <h1 className="font-24px-regular md:font-32px-regular">
            &nbsp;검색 결과
          </h1>
        </div>
        <div>
          <h3 className="font-16px-regular text-basic-black">
            총 {totalCount}개의 결과
          </h3>
        </div>
      </div>
      <div>
        <AllActivities
          activities={activities}
          setSize={setSize}
          emptyMessage={
            <>
              검색어와 일치하는 체험이 없습니다.
              <p />
              <p />
              다른 검색어를 사용해 보세요.
            </>
          }
        />
      </div>
    </div>
  );
};

export default Search;

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
