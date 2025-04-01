import IconLeftArrow from "@/assets/svgs/btnArrow48pxDefault.svg";
import IconRightArrow from "@/assets/svgs/btnArrow48pxVariant4.svg";
import IconMinus from "@/assets/svgs/ic_minus_btn.svg";
import IconPlus from "@/assets/svgs/ic_plus_btn.svg";
import IconRefresh from "@/assets/svgs/ic_refresh.svg";
import ActivityImage from "@/src/components/ActivityImageList/ActivityImage";
import Style from "@/src/components/ActivityImageList/ActivityImageList.module.css";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Space = dynamic(() => import("antd/es/space"), { ssr: false });
const PreviewGroup = dynamic(() => import("antd/es/image/PreviewGroup"), {
  ssr: false,
});

const gridLength: number = 12;
const ImageGridClassName: Record<string, string | string[] | string[][]> = {
  size: `grid-cols-${gridLength} grid-rows-${gridLength}`,

  banner: [
    "row-span-full",
    "row-span-8 lg:col-span-7",
    "row-span-8 lg:col-span-7",
    "row-span-8 lg:col-span-7",
    "row-span-8 lg:col-span-6",
  ],

  sub: [
    "",
    "col-span-full row-span-4 lg:col-span-5 lg:row-span-full",
    "col-span-6 row-span-4 lg:col-span-5 lg:row-span-6",
    "col-span-4 row-span-4 lg:col-span-5 lg:row-span-4",
    "col-span-3 row-span-4 lg:col-span-3 lg:row-span-6",
  ],

  rounded: [
    ["rounded-t-12 lg:rounded-l-12 lg:rounded-tr-none"],
    ["rounded-b-12 lg:rounded-r-12 lg:rounded-bl-none"],
    ["rounded-bl-12 lg:rounded-tr-12 lg:rounded-bl-none", "rounded-br-12"],
    ["rounded-bl-12 lg:rounded-tr-12 lg:rounded-bl-none", "", "rounded-br-12"],
    [
      "rounded-bl-12 lg:rounded-bl-none",
      "lg:rounded-tr-12 lg:rounded-bl-none",
      "",
      "rounded-br-12",
    ],
  ],
};

const ActivityImageList = ({
  bannerImageUrl,
  subImages,
}: Pick<ActivityDetailResponse, "bannerImageUrl" | "subImages">) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridHeight, setGridHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      const scale = window.innerWidth >= 1024 ? 6 : 9;
      if (gridRef.current) {
        setGridHeight(
          Math.floor(gridRef.current.clientWidth / gridLength) * scale,
        );
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      ref={gridRef}
      className={clsx(ImageGridClassName.size, "mt-24 grid gap-10")}
      style={{
        height: `${gridHeight}px`,
      }}>
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
        <ActivityImage
          className={clsx(
            "col-span-full lg:row-span-full",
            ImageGridClassName.banner[
              subImages.length > 4 ? 4 : subImages.length
            ],
            ImageGridClassName.rounded[0][0],
          )}
          imageUrl={bannerImageUrl}
        />
        {subImages.map((item, idx) => {
          if (subImages.length <= idx || idx > 3) {
            return null;
          }

          return (
            <ActivityImage
              key={item.id}
              className={clsx(
                ImageGridClassName.sub[
                  subImages.length > 4 ? 4 : subImages.length
                ],
                ImageGridClassName.rounded[
                  subImages.length > 4 ? 4 : subImages.length
                ][idx],
              )}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </PreviewGroup>
    </div>
  );
};

export default ActivityImageList;
