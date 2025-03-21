import IconStar from "@/assets/svgs/ic_star.svg";
import MyActivityHandler from "@/src/components/MyAtivities/MyActivityHandler";
import PATH_NAMES from "@/src/constants/pathname";
import { Activity } from "@/src/types/activitiesReservationType";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface ActivitiesCardProps {
  activity: Activity;
}

const ActivitiesCard = ({ activity }: ActivitiesCardProps) => {
  const {
    id: activityId,
    bannerImageUrl = "",
    rating = 0,
    reviewCount = 0,
    title = "",
    price = 0,
  } = activity;

  if (!activityId) {
    return null;
  }

  return (
    <Link
      href={`${PATH_NAMES.Activity}/${activityId}`}
      className={clsx(
        "relative flex",
        "rounded-24 border border-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)]",
        "mt-24 h-128 w-full min-w-280",
        "md:h-156",
        "lg:h-204",
      )}>
      <div
        className={clsx(
          "relative overflow-hidden",
          "rounded-l-24",
          "h-full min-w-128",
          "md:min-w-156",
          "lg:min-w-204",
        )}>
        <Image
          src={bannerImageUrl}
          alt="체험 이미지"
          fill
          className="border border-brand-200 bg-brand-400 object-cover"
        />
      </div>
      <div
        className={clsx(
          "flex w-full flex-col",
          "p-12 px-16",
          "md:p-16 md:px-20",
          "lg:p-20 lg:px-24",
        )}>
        <div className="flex items-center gap-6">
          <IconStar />
          <span className="font-14px-regular md:font-16px-regular">{`${rating} (${reviewCount})`}</span>
        </div>
        <div className="flex h-full flex-col items-start justify-between">
          <p
            className={clsx(
              "font-14px-bold text-left",
              "w-full max-w-200 truncate",
              "md:font-18px-bold md:max-w-300",
              "lg:font-20px-bold lg:mt-8 lg:max-w-480",
            )}>
            {title}
          </p>
          <div className="flex w-full items-center justify-between">
            <p className="font-16px-medium md:font-20px-medium lg:font-24px-medium lg:text-gray-700">
              {`₩${price?.toLocaleString("ko-KR")} / 인`}
            </p>
            <MyActivityHandler activityId={activityId} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivitiesCard;
