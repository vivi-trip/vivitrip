import Star from "@/assets/svgs/star.svg";
import type { Activity } from "@/src/types/activities";
import Image from "next/image";
import Link from "next/link";

const PopularActivityItem = ({
  id,
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
}: Activity) => {
  return (
    <div className="group relative size-186 shrink-0 overflow-hidden rounded-3xl md:size-384 lg:size-384">
      <Link href={`/activity/${id}`}>
        <div className="relative aspect-[1/1] w-186 overflow-hidden rounded-3xl md:w-384 lg:w-384">
          <Image
            src={bannerImageUrl}
            alt={title}
            className="object-cover transition-transform duration-300"
            fill
            sizes="(max-width: 640px) 186px, (max-width: 768px) 384px, 384px"
          />
          <div className="absolute size-full transition group-hover:bg-black group-hover:opacity-40" />
        </div>

        <div className="absolute bottom-12 flex flex-col gap-5 px-20 py-12 md:bottom-0 md:gap-20 md:py-30 md:pr-113 lg:bottom-0 lg:gap-20 lg:py-30 lg:pr-113">
          <div className="flex items-center gap-5">
            <Star width={18} height={18} className="my-3" />
            <p className="font-14px-semibold text-white">
              {rating} ({reviewCount})
            </p>
          </div>
          <p className="md:font-32px-bold lg:font-32px-bold font-18px-bold text-white">
            {title}
          </p>
          <div className="flex items-center gap-5">
            <p className="font-16px-bold md:font-20px-bold lg:font-20px-bold text-white">
              ₩ {price.toLocaleString()}
            </p>
            <p className="font-14px-regular my-1 text-gray-600">/ 인</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularActivityItem;
