import Star from "@/assets/svgs/star.svg";
import { Activity } from "@/src/types/activities";
import Image from "next/image";
import Link from "next/link";

const AllActivityItem = ({
  id,
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
}: Activity) => {
  return (
    <div className="flex flex-col gap-16">
      <div
        className="relative w-full overflow-hidden rounded-3xl"
        style={{ paddingTop: "100%" }}>
        <Link href={`/activities/${id}`} className="absolute inset-0">
          <Image
            src={bannerImageUrl}
            alt={title}
            className="object-cover transition-transform duration-300 hover:scale-110"
            fill
            sizes="(max-width: 640px) 168px, (max-width: 768px) 221px, 283px"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-15">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <Star width={20} height={20} />
            <p className="font-16px-medium text-basic-black">{rating}</p>
            <p className="font-16px-medium text-gray-600">({reviewCount})</p>
          </div>
          <p className="font-18px-semibold md:font-24px-semibold lg:font-24px-semibold text-basic-black">
            {title}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p className="font-20px-bold md:font-28px-bold lg:font-24px-bold text-basic-black">
            ₩ {price.toLocaleString()}
          </p>
          <p className="font-16px-regular md:font-20px-regular lg:font-20px-regular text-gray-800">
            / 인
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllActivityItem;
