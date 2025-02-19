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
  const {
    isExtraXsScreen,
    isXsScreen,
    isSmallerXsScreen,
    getActivityTextWrapperStyle,
    getActivityRatingTextStyle,
    getActivityTitleTextStyle,
    getActivityPriceTextStyle,
  } = useResponsiveTextStyle();

  // loading spinner
  const { loadingButtons, showLoadingButtons, hideLoadingButtons } =
    useLoadingStore();

  useEffect(() => {
    return () => {
      hideLoadingButtons(id);
    };
  }, [hideLoadingButtons, id]);

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
        {!isExtraXsScreen && (
          <div
            className={clsx(
              "absolute bottom-12 flex flex-col gap-5 px-20 py-12 md:bottom-0 md:gap-10 md:py-30 md:pr-60 lg:gap-20 lg:pr-90",
              getActivityTextWrapperStyle(),
            )}>
            <div className="flex items-center gap-5">
              <Star
                width={isXsScreen || isSmallerXsScreen ? 16 : 20}
                height={isXsScreen || isSmallerXsScreen ? 16 : 20}
                className="my-2 block"
              />
              <p className={clsx("text-white", getActivityRatingTextStyle())}>
                {rating} ({reviewCount})
              </p>
            </div>
            <p
              className={clsx(
                "line-clamp-2 overflow-hidden text-white",
                getActivityTitleTextStyle(),
              )}>
              {title}
            </p>
            <div
              className={clsx(
                "flex items-center gap-5",
                isSmallerXsScreen && "gap-2",
              )}>
              <p className={clsx("text-white", getActivityPriceTextStyle())}>
                ₩ {price.toLocaleString()}
              </p>
              <p
                className={clsx(
                  "font-14px-regular my-1 line-clamp-1 text-gray-600",
                  isSmallerXsScreen && "font-12px-regular",
                )}>
                / 인
              </p>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default PopularActivityItem;
