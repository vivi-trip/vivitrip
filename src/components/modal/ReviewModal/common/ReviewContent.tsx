import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface ReviewContentProps {
  title: string;
  bannerImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
}

const ReviewContent = ({
  title,
  bannerImageUrl,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
}: ReviewContentProps) => {
  return (
    <section className={clsx("scrollbar-none overflow-x-auto")}>
      <div className="flex min-w-max flex-row gap-14">
        <div className={clsx("size-126", "relative")}>
          <Image
            src={bannerImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-12"
          />
        </div>
        <div>
          <h2 className="font-20px-bold w-full overflow-hidden truncate whitespace-nowrap">
            {title}
          </h2>
          <div className="font-18px-regular mt-12 flex justify-between">
            <span>{date}</span>
            <span>&nbsp;·&nbsp;</span>
            <span>
              {startTime} - {endTime}
            </span>
            <span>&nbsp;·&nbsp;</span>
            <span>{headCount} 명</span>
          </div>
          <hr className="mb-13 w-full border-t border-gray-300" />
          <span className="font-32px-bold">
            ₩{Intl.NumberFormat().format(totalPrice)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ReviewContent;
