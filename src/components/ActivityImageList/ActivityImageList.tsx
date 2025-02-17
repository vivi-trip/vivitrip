import Style from "./ActivityImageList.module.css";
import IconLeftArrow from "@/assets/svgs/btnArrow48pxDefault.svg";
import IconRightArrow from "@/assets/svgs/btnArrow48pxVariant4.svg";
import IconMinus from "@/assets/svgs/ic_minus_btn.svg";
import IconPlus from "@/assets/svgs/ic_plus_btn.svg";
import IconRefresh from "@/assets/svgs/ic_refresh.svg";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const Space = dynamic(() => import("antd/es/space"), { ssr: false });
const Image = dynamic(() => import("antd/es/image"), { ssr: false });
const PreviewGroup = dynamic(() => import("antd/es/image/PreviewGroup"), {
  ssr: false,
});

const ActivityImageList = ({
  bannerImageUrl,
  subImages,
}: Pick<ActivityDetailResponse, "bannerImageUrl" | "subImages">) => {
  const imageList = useMemo<string[]>(() => {
    const list = [bannerImageUrl];
    subImages.forEach(({ imageUrl }) => list.push(imageUrl));
    return list;
  }, [bannerImageUrl, subImages]);

  if (imageList.length === 0) return null;

  return (
    <div className="mt-24 grid h-320 grid-cols-4 grid-rows-4 gap-8 overflow-hidden rounded-12 md:h-480 lg:h-560">
      <PreviewGroup
        preview={{
          // eslint-disable-next-line react/no-unstable-nested-components
          toolbarRender: (
            _,
            {
              transform: { scale },
              actions: { onActive, onZoomOut, onZoomIn, onReset },
            },
          ) => (
            <Space size={12} className={Style["toolbar-wrapper"]}>
              <IconLeftArrow
                width={24}
                height={24}
                viewBox="0 0 44 44"
                className="m-4 cursor-pointer text-white"
                onClick={() => onActive?.(-1)}
              />
              <IconRightArrow
                width={24}
                height={24}
                viewBox="0 0 44 44"
                className="m-4 cursor-pointer text-white"
                onClick={() => onActive?.(1)}
              />
              <IconPlus
                width={24}
                height={24}
                viewBox="0 0 20 20"
                className="m-4 cursor-pointer text-white"
                disabled={scale === 50}
                onClick={onZoomIn}
              />
              <IconMinus
                width={24}
                height={24}
                viewBox="0 0 20 20"
                className="m-4 cursor-pointer text-white"
                disabled={scale === 1}
                onClick={onZoomOut}
              />
              <IconRefresh
                width={24}
                height={24}
                viewBox="0 0 512 512"
                className="m-4 cursor-pointer text-white"
                onClick={onReset}
              />
            </Space>
          ),
        }}>
        {imageList.map((item, idx) => {
          return (
            <div
              key={item}
              className={clsx(
                "size-full overflow-hidden",
                idx === 0 &&
                  "col-span-4 row-span-3 lg:col-span-2 lg:row-span-full",
                idx !== 0 && "lg:row-span-2",
              )}>
              <div className="font-32px-bold relative flex size-full items-center justify-center bg-brand-200 text-brand-600">
                <Image
                  src={item}
                  width="100%"
                  height="100%"
                  alt={item}
                  className="size-full object-cover"
                  preview={{
                    mask: <p>원본보기</p>,
                  }}
                />
              </div>
            </div>
          );
        })}
      </PreviewGroup>
    </div>
  );
};

export default ActivityImageList;
