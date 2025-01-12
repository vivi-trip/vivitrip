import Star from "@/assets/svgs/star.svg";
import Pagination from "@/src/components/Pagination/index";
import { Activity } from "@/src/types/activities";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PaginationPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState("latest");
  const [size, setSize] = useState(8); // 페이지 당 데이터 개수
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // 화면 크기에 따라 데이터 개수 변경
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) {
        setSize(8); // lg
      } else if (window.innerWidth >= 768) {
        setSize(9); // mg
      } else {
        setSize(4); // sm
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const queryPage = router.query.page ? Number(router.query.page) : 1;

      // Query String에 page 값이 없으면 1페이지로 리다이렉트
      if (!router.query.page) {
        router.push(`/pagination?page=${queryPage}`);
      }

      // URL의 query 값이 변경되면 상태 업데이트
      if (queryPage !== page) setPage(queryPage);
    }
  }, [router.isReady, router.query.page, page, router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (page !== null) {
          const response = await fetch(
            `https://sp-globalnomad-api.vercel.app/6-1/activities?method=offset&sort=${sort}&page=${page}&size=${size}`,
          );
          const data = await response.json();
          setActivities(data.activities);
          setTotalCount(data.totalCount);
          setLoading(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("데이터 페칭 오류", error);
        setLoading(false);
        throw error;
      }
    };
    fetchData();
  }, [page, sort, size]);

  return (
    <>
      {/* 메인 화면 */}
      <div className="my-20">
        <header className="font-36px-bold mb-8">🛼 모든 체험</header>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-5 md:grid-cols-3 md:grid-rows-3 md:gap-x-16 md:gap-y-32 lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-24 lg:gap-y-48">
            {Array.isArray(activities) && activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id}>
                  <div className="relative aspect-[1/1] w-full">
                    <Image
                      src={activity.bannerImageUrl}
                      alt="activity.title"
                      className="rounded-2xl object-cover"
                      fill
                      sizes="(max-width: 640px) 168px, (max-width: 768px) 221px, 283px"
                      priority
                    />
                  </div>
                  <div className="flex">
                    <Star alt="별점 아이콘" />
                    <p>3.9</p>
                    <p>(108)</p>
                  </div>
                  <p className="lg:font-24px-semibold font-18px-semibold overflow-hidden text-ellipsis text-nowrap">
                    {activity.title}
                  </p>
                  <div className="flex">
                    <p>₩ 42,800</p>
                    <p>/인</p>
                  </div>
                </div>
              ))
            ) : (
              <p>체험이 없습니다.</p>
            )}
          </div>
        )}
        <div className="mt-64 flex w-full justify-center">
          <Pagination
            totalItems={totalCount}
            currentPage={page ?? 1}
            pageCount={5}
            itemCountPerPage={size}
          />
        </div>
      </div>
    </>
  );
};

export default PaginationPage;
