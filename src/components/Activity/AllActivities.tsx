import NotFound from "@/assets/pngs/notFound.png";
import AllActivityItem from "@/src/components/Activity/AllActivityItem";
import Pagination from "@/src/components/Pagination";
import { AllActivitiesProps } from "@/src/types/activity";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const AllActivities = ({ activities, emptyMessage }: AllActivitiesProps) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string, 10) || 1;

  const [size, setSize] = useState(8);
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });

  // 화면 크기에 따라 데이터 개수 및 NotFound 이미지 사이즈 변경
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) {
        setSize?.(8);
        setImageSize({ width: 200, height: 200 });
      } else if (window.innerWidth >= 768) {
        setSize?.(9);
        setImageSize({ width: 200, height: 200 });
      } else {
        setSize?.(4);
        setImageSize({ width: 150, height: 150 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [setSize]);

  // 데이터를 클라이언트에서 분할
  const paginatedActivities = useMemo(() => {
    const start = (page - 1) * size!;
    const end = page * size!;
    return activities?.slice(start, end);
  }, [activities, page, size]);

  // 체험이 없을 때 메시지 표시
  if (!paginatedActivities || paginatedActivities.length === 0) {
    return (
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
  }

  return (
    <>
      <div className="mt-24 grid auto-rows-auto grid-cols-2 gap-x-8 gap-y-16 md:mt-32 md:grid-cols-3 md:gap-x-16 md:gap-y-32 lg:mt-32 lg:grid-cols-4 lg:gap-x-24 lg:gap-y-48">
        {paginatedActivities.map((activity) => (
          <AllActivityItem key={activity.id} {...activity} />
        ))}
      </div>
      <div className="mb-120 mt-38 flex justify-center md:mt-72 lg:mt-64">
        <Pagination
          totalItems={activities?.length || 0}
          currentPage={page ?? 1}
          pageCount={5}
          itemCountPerPage={size || 4}
        />
      </div>
    </>
  );
};

export default AllActivities;
