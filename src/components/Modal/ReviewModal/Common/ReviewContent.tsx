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
    <section className="grid h-126 grid-cols-[126px_1fr] gap-16">
      <div className="relative size-full">
        <Image
          src={bannerImageUrl}
          alt={title}
          fill
          className="rounded-12 object-cover"
        />
      </div>
      <div className="size-full overflow-auto">
        <div className="flex size-full flex-col items-start justify-between gap-12">
          <h2 className="font-20px-bold max-w-full truncate" title={title}>
            {title}
          </h2>
          <p className="font-18px-regular border-b border-gray-300">
            {`${date} · ${startTime} ~ ${endTime} · ${headCount} 명`}
          </p>
          <p className="font-32px-bold">
            {`₩ ${Intl.NumberFormat().format(totalPrice)}`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewContent;
