import IconFileCloseLg from "@/assets/svgs/ic_file_close_lg.svg";
import IconFileCloseMd from "@/assets/svgs/ic_file_close_md.svg";
import IconFileCloseSm from "@/assets/svgs/ic_file_close_sm.svg";
import IconImageAdd from "@/assets/svgs/ic_image_add.svg";
import { useUploadActivtyAddImage } from "@/src/queries/useActivities";
import { ActivityImageUrl } from "@/src/types/activities";
import { SubImage } from "@/src/types/activitiesResponses";
import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

// interface ImageObject {
//   id?: number; // 서버에서 할당된 ID (있을 수도, 없을 수도 있음)
//   tempId: number; // 클라이언트에서 임시로 할당하는 ID
//   imageUrl: string;
// }

interface ActivityImageInputProps {
  control: Control<ActivityFormDataType>;
  name: "bannerImageUrl" | "subImages";
  maxImages?: number;
  minImages?: number;
  title: string;
  onImageChange?: (addedUrls: string[], removedIds: number[]) => void;
}

/**
 * @description 배너 이미지 프롭스
 * @param maxImages - 최대 배너 이미지
 * @param minImages - 최소 배너 이미지
 * @param title - 배너 타이틀
 * @param onImageUrlsChange - 배너 이미지 url
 */
const ActivityImageInput = ({
  maxImages = 1,
  minImages = 1,
  title = "배너 이미지",
  control,
  name,
  onImageChange,
}: ActivityImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [originalImages, setOriginalImages] = useState<SubImage[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const [addedUrls, setAddedUrls] = useState<string[]>([]);

  useEffect(() => {
    if (name === "subImages" && onImageChange) {
      onImageChange(addedUrls, removedIds);
    }
  }, [name, addedUrls, removedIds, onImageChange]);

  const { mutate } = useUploadActivtyAddImage();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `최소 ${minImages}개의 이미지가 필요합니다.` }}
      render={({ field: { value, onChange } }) => {
        (() => {
          if (
            name === "subImages" &&
            Array.isArray(value) &&
            value !== originalImages
          ) {
            setOriginalImages(value);
          }
        })();

        const selectedImages = Array.isArray(value) ? value : [];
        const newValue = value;

        const isImageCountInsufficient = () => {
          if (name === "bannerImageUrl") {
            return !newValue; // newValue가 없으면 true 반환
          }
          return selectedImages.length < minImages;
        };

        const handleImageChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const file = event.target.files?.[0];
          if (file && selectedImages.length < maxImages) {
            mutate(file, {
              onSuccess: (data: ActivityImageUrl) => {
                const newImageUrl: string = data.activityImageUrl;

                if (name === "bannerImageUrl") {
                  // 배너 이미지의 경우: 단일 문자열로 전달
                  onChange(newImageUrl);
                } else {
                  // subImages의 경우: URL 문자열 배열에 추가
                  const currentImages = Array.isArray(value) ? value : [];
                  if (currentImages.length < maxImages) {
                    const newImages = [...currentImages, newImageUrl];
                    onChange(newImages);
                    setAddedUrls((prev) => [...prev, newImageUrl]);
                  }
                }
              },
            });
          }
        };

        const handleRemoveImage = (indexToRemove: number) => {
          const removedImage = selectedImages[indexToRemove];
          const newImages = selectedImages.filter(
            (_, index) => index !== indexToRemove,
          );

          if (name === "subImages") {
            if (removedImage.id) {
              setRemovedIds((prev) => [...prev, removedImage.id!]);
              onChange(newImages);
            } else if (addedUrls.includes(removedImage.imageUrl)) {
              setAddedUrls((prev) =>
                prev.filter((url) => url !== removedImage.imageUrl),
              );
            }
            onChange(newImages);
          } else if (name === "bannerImageUrl") {
            onChange("");
          }
        };

        return (
          <div className="flex flex-col gap-24">
            <div className="font-20px-bold md:font-24px-bold">{title}</div>
            <div className="grid grid-cols-2 gap-8 md:gap-16 lg:grid-cols-3 lg:gap-24">
              <button
                type="button"
                onClick={handleUploadClick}
                className={clsx(
                  "rounded-12 border-2 border-dashed border-gray-300 bg-white",
                  "aspect-square w-full",
                  "flex cursor-pointer flex-col items-center justify-center",
                  "transition-colors duration-300 hover:border-gray-400 hover:bg-gray-100",
                )}>
                <div className="flex flex-col items-center gap-30">
                  <IconImageAdd />
                  <div className="font-24px-regular md:font-24px-regular text-gray-500">
                    이미지 등록
                  </div>
                </div>
              </button>
              <input
                id="file-input"
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

              {maxImages < 2 && newValue ? (
                <div className="relative">
                  <div
                    className={clsx(
                      "relative",
                      "rounded-24",
                      "aspect-square w-full",
                      "flex cursor-pointer flex-col items-center justify-center",
                      "transition-colors duration-300 hover:border-gray-400 hover:bg-gray-100",
                    )}>
                    <div className="absolute inset-0 overflow-hidden rounded-24">
                      <Image
                        src={
                          typeof newValue === "string"
                            ? newValue
                            : newValue[0]?.imageUrl || ""
                        }
                        fill
                        alt="이미지"
                        objectFit="cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onChange("")}
                      className={clsx(
                        "absolute -right-10 -top-10 z-10",
                        "md:-right-14 md:-top-14",
                        "lg:-right-20 lg:-top-20",
                      )}>
                      <IconFileCloseSm className="block md:hidden" />
                      <IconFileCloseMd className="hidden md:block lg:hidden" />
                      <IconFileCloseLg className="hidden lg:block" />
                    </button>
                  </div>
                </div>
              ) : (
                selectedImages.map((image, index) => (
                  <div
                    key={`formImages${image.id || index}`}
                    className="relative">
                    <div
                      className={clsx(
                        "relative",
                        "rounded-24",
                        "aspect-square w-full",
                        "flex cursor-pointer flex-col items-center justify-center",
                        "transition-colors duration-300 hover:border-gray-400 hover:bg-gray-100",
                      )}>
                      <div className="absolute inset-0 overflow-hidden rounded-24">
                        <Image
                          src={
                            typeof image === "string" ? image : image.imageUrl
                          }
                          fill
                          alt="이미지"
                          objectFit="cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className={clsx(
                          "absolute -right-10 -top-10 z-10",
                          "md:-right-14 md:-top-14",
                          "lg:-right-20 lg:-top-20",
                        )}>
                        <IconFileCloseSm className="block md:hidden" />
                        <IconFileCloseMd className="hidden md:block lg:hidden" />
                        <IconFileCloseLg className="hidden lg:block" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {isImageCountInsufficient() && (
              <div className="mt-2 text-sm text-red-500">
                최소 {minImages}개의 이미지가 필요합니다.
              </div>
            )}
            {maxImages > 2 && <p>*이미지는 최대 4개까지 등록 가능합니다.</p>}
          </div>
        );
      }}
    />
  );
};

export default ActivityImageInput;
