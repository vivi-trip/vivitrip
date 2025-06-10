import NotFound from "@/assets/pngs/notFound.png";
import AllActivityItem from "@/src/components/Activity/AllActivityItem";
import Pagination from "@/src/components/Pagination";
import { AllActivitiesProps } from "@/src/types/activity";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const AllActivities = ({
  activities,
  emptyMessage,
  className,
}: AllActivitiesProps) => {
  const router = useRouter();
  const pathname = router.pathname.replace("/", "");

  const [page, setPage] = useState<number | null>(null);
  const [size, setSize] = useState(8);
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });

  // 화면 크기에 따라 데이터 개수 및 NotFound 이미지 사이즈 변경
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) {
        setSize(pathname === "home" ? 8 : 16);
        setImageSize({ width: 200, height: 200 });
      } else if (window.innerWidth >= 768) {
        setSize(9);
        setImageSize({ width: 200, height: 200 });
      } else {
        setSize(pathname === "home" ? 4 : 8);
        setImageSize({ width: 150, height: 150 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [pathname]);

  // 데이터를 클라이언트에서 분할
  const paginatedActivities = useMemo(() => {
    if (page === null) return [];

    const start = (page - 1) * size!;
    const end = page * size!;
    return activities?.slice(start, end);
  }, [activities, page, size]);

  // router가 준비되면 page 값 설정
  useEffect(() => {
    if (!router.isReady) return;

    const queryPage = parseInt(router.query.page as string, 10);
    if (!Number.isNaN(queryPage)) {
      setPage(queryPage);
    } else if (router.pathname === "/home" && !router.query.page) {
      setPage(1);
    }
  }, [router.isReady, router.pathname, router.query.page]);

  if (page === null) return null;

  return activities.length > 0 ? (
    <>
      <div
        className={clsx(
          className,
          "grid auto-rows-auto grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3 md:gap-x-16 md:gap-y-32 lg:grid-cols-4 lg:gap-x-24 lg:gap-y-48",
        )}>
        {paginatedActivities.map((activity) => (
          <AllActivityItem key={activity.id} {...activity} />
        ))}
      </div>
      <div className="mb-120 mt-38 flex justify-center md:mt-72 lg:mt-64">
        <Pagination
          totalItems={activities.length}
          currentPage={page ?? 1}
          pageCount={5}
          itemCountPerPage={size || 4}
        />
      </div>
    </>
  ) : (
    <div className="mb-120 mt-80 flex flex-col items-center gap-12">
      <Image
        src={NotFound}
        alt="Not Found"
        width={imageSize.width}
        height={imageSize.height}
      />
      <p className="font-16px-medium md:font-18px-medium text-center">
        {emptyMessage}
      </p>
    </div>
  );
};

export default AllActivities;
