import Star from "@/assets/svgs/star.svg";
import Loading from "@/src/components/Loading";
import useResponsiveTextStyle from "@/src/hooks/Activity/useResponsiveTextStyle";
import useLoadingStore from "@/src/stores/loadingStore";
import type { PopularActivityItemProps } from "@/src/types/activity";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PopularActivityItem = ({
  id,
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
  onImageLoad,
}: PopularActivityItemProps) => {
  // 인기 체험 이미지 너비 계산
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      onImageLoad(
        Number(imgRef.current.getBoundingClientRect().width.toFixed(2)),
      );
    }
  }, [onImageLoad]);

  // 화면 크기 별 폰트 크기
  const { isXsScreen, getActivityTextStyle } = useResponsiveTextStyle();

  // loading spinner
  const { loadingButtons, showLoadingButtons } = useLoadingStore();

  return (
    <div className="relative aspect-[1/1] w-full overflow-hidden rounded-3xl border border-gray-200">
      <Link
        href={`/activity/${id}`}
        onClick={() => {
          showLoadingButtons(id);
        }}>
        <Image
          src={bannerImageUrl}
          ref={imgRef}
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

        <div
          className={clsx(
            "absolute flex flex-col gap-5 px-20 py-12 md:gap-10 md:py-30 md:pr-60 lg:gap-20 lg:pr-90",
            isXsScreen ? "bottom-5" : "bottom-12 md:bottom-0",
          )}>
          <div className="flex items-center gap-5">
            <Star
              width={isXsScreen ? 16 : 20}
              height={isXsScreen ? 16 : 20}
              className="my-2 block"
            />
            <p
              className={clsx(
                "text-white",
                isXsScreen ? "font-14px-semibold" : "font-14px-semibold",
              )}>
              {rating} ({reviewCount})
            </p>
          </div>
          <p
            className={clsx(
              "line-clamp-2 overflow-hidden text-white",
              getActivityTextStyle(),
            )}>
            {title}
          </p>
          <div className="flex items-center gap-5">
            <p
              className={clsx(
                "text-white",
                isXsScreen
                  ? "font-14px-bold"
                  : "font-16px-bold md:font-18px-bold lg:font-20px-bold",
              )}>
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
