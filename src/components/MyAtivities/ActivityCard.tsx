import MyActivityHandler from "./MyActivityHandler";
import IconStar from "@/assets/svgs/ic_star.svg";
import PATH_NAMES from "@/src/constants/pathname";
import { Activity } from "@/src/types/activitiesReservationType";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";

interface ActivitiesCardProps {
  activity: Activity;
}

const ActivitiesCard = ({ activity }: ActivitiesCardProps) => {
  const {
    id: activityId,
    bannerImageUrl,
    rating,
    reviewCount,
    title,
    price,
  } = activity;

  const router = useRouter();

  return (
    <div
      className={clsx(
        "relative mt-24 h-128 w-full min-w-280",
        "md:h-156",
        "lg:h-204",
      )}>
      <button
        type="button"
        onClick={() => {
          router.push(`${PATH_NAMES.Activity}/${activityId}`);
        }}
        className={clsx(
          "h-128 w-full rounded-24 border border-white",
          "md:h-156",
          "lg:h-204",
        )}
        style={{ boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)" }}>
        <div className="flex">
          <div
            className={clsx(
              "relative",
              "h-128 min-w-128",
              "md:h-156 md:min-w-156",
              "lg:h-204 lg:min-w-204",
            )}>
            <Image
              src={bannerImageUrl}
              alt="체험 이미지"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-l-24 border border-brand-200 bg-brand-400"
            />
          </div>
          <div
            className={clsx(
              "my-9 ml-8 mr-14 flex w-full flex-col",
              "md:m-12 md:mr-18 md:gap-6 lg:my-14 lg:ml-24",
            )}>
            <div className="flex items-center gap-6">
              <IconStar />
              <span className="font-14px-regular md:font-16px-regular">
                {rating} ({reviewCount})
              </span>
            </div>
            <div className="flex h-full flex-col items-start justify-between">
              <p  className={clsx(
              "font-14px-bold text-left",
              "w-full max-w-200 truncate",
              "md:font-18px-bold md:max-w-300",
              "lg:font-20px-bold lg:mt-8 lg:max-w-480",
            )}>
                {title}
              </p>
              <div className="flex w-full items-center justify-between">
                <p className="font-16px-medium md:font-20px-medium lg:font-24px-medium lg:text-gray-700">
                  ₩{price?.toLocaleString("ko-KR")} /인
                </p>
                <div>
                  <MyActivityHandler activityId={activityId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ActivitiesCard;
