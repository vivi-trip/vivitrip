import Star from "@/assets/svgs/star.svg";
import Loading from "@/src/components/Loading";
import useLoadingStore from "@/src/stores/loadingStore";
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
  // loading spinner
  const { loadingButtons, showLoadingButtons } = useLoadingStore();

  return (
    <div className="group relative size-186 shrink-0 overflow-hidden rounded-3xl border border-gray-200 md:size-384 lg:size-384">
      <Link
        href={`/activity/${id}`}
        onClick={() => {
          showLoadingButtons(id);
        }}>
        <div className="relative aspect-[1/1] w-186 overflow-hidden rounded-3xl md:w-384 lg:w-384">
          <Image
            src={bannerImageUrl}
            alt={title}
            className="object-cover transition-transform duration-300"
            fill
            sizes="(max-width: 640px) 186px, (max-width: 768px) 384px, 384px"
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/30 to-black/80" />
          <div className="absolute size-full transition group-hover:bg-black group-hover:opacity-40" />
        </div>

        <div className="absolute bottom-12 flex flex-col gap-5 px-20 py-12 md:bottom-0 md:gap-20 md:py-30 md:pr-113 lg:bottom-0 lg:gap-20 lg:py-30 lg:pr-113">
          <div className="flex items-center gap-5">
            <Star width={20} height={20} className="my-2" />
            <p className="font-14px-semibold text-white">
              {rating} ({reviewCount})
            </p>
          </div>
          <p className="md:font-32px-bold lg:font-32px-bold font-18px-bold line-clamp-2 h-52 overflow-hidden text-white md:h-84">
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
