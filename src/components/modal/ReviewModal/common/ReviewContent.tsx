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
    <section className={clsx("flex gap-24")}>
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
        <div className="flex h-full max-w-271 flex-col">
          <h2 className="font-20px-bold w-full overflow-hidden truncate whitespace-nowrap">
            {title}
          </h2>
          <div className="font-18px-regular mt-12 flex justify-between">
            <span>{date}</span>
            <span>·</span>
            <span>
              {startTime} - {endTime}
            </span>
            <span>·</span>
            <span>{headCount} 명</span>
          </div>
          <span className="font-32px-bold mt-auto">
            ₩{Intl.NumberFormat().format(totalPrice)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ReviewContent;
