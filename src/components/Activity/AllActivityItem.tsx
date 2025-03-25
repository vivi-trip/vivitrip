import Star from "@/assets/svgs/star.svg";
import Loading from "@/src/components/Loading";
import PATH_NAMES from "@/src/constants/pathname";
import useResponsiveTextStyle from "@/src/hooks/Activity/useResponsiveTextStyle";
import useLoadingStore from "@/src/stores/useLoadingStore";
import { Activity } from "@/src/types/activities";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const AllActivityItem = ({
  id,
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
}: Activity) => {
  // loading spinner
  const { loadingButtons, showLoadingButtons, hideLoadingButtons } =
    useLoadingStore();

  useEffect(() => {
    return () => {
      hideLoadingButtons(id);
    };
  }, [hideLoadingButtons, id]);

  const { isMicroScreen } = useResponsiveTextStyle();

  return (
    <div className="flex flex-col gap-16">
      <div
        className="relative w-full overflow-hidden rounded-3xl border border-gray-200"
        style={{ paddingTop: "100%" }}>
        <Link
          href={`${PATH_NAMES.Activity}/${id}
          `}
          className="absolute inset-0"
          onClick={() => {
            showLoadingButtons(id);
          }}>
          <Image
            src={bannerImageUrl}
            alt={title}
            className="object-cover transition-transform duration-300 hover:scale-110"
            fill
            sizes="(max-width: 640px) 168px, (max-width: 768px) 221px, 283px"
          />
          {loadingButtons?.[id] ? (
            <Loading
              isOverlay="node"
              overlayColor="translate"
              isAbsolute="absolute"
              loadingBoxColor="black"
              color="white"
              size={40}
            />
          ) : null}
        </Link>
      </div>
      <div className="flex flex-col gap-15">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <Star width={20} height={20} />
            <p className="font-16px-medium text-basic-black">{rating}</p>
            <p className="font-16px-medium text-gray-600">({reviewCount})</p>
          </div>
          <p className="font-18px-semibold md:font-24px-semibold lg:font-24px-semibold line-clamp-1 overflow-hidden text-basic-black md:line-clamp-2 md:min-h-64">
            {title}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p
            className={clsx(
              "line-clamp-1 overflow-hidden text-basic-black",
              isMicroScreen
                ? "font-16px-bold"
                : "font-20px-bold md:font-28px-bold lg:font-24px-bold",
            )}>
            ₩ {price.toLocaleString()}
          </p>
          <p
            className={clsx(
              "line-clamp-1 overflow-hidden text-gray-800",
              isMicroScreen
                ? "font-14px-regular"
                : "font-16px-regular md:font-20px-regular lg:font-20px-regular",
            )}>
            / 인
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllActivityItem;
