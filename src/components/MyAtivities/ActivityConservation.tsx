import ActivityAddressInput from "../ActivityInput/ActivityAddressInput";
import ActivityCategoryInput from "../ActivityInput/ActivityCategoryInput";
import ActivityImageInput from "../ActivityInput/ActivityImageInput";
import ActivityPriceInput from "../ActivityInput/ActivityPriceInput";
import ActivityTextArea from "../ActivityInput/ActivityTextArea";
import ActivityTimeInput from "../ActivityInput/ActivityTimeInput";
import ActivityTitleInput from "../ActivityInput/ActivityTitleInput";
import Button from "../Button/Button";
import TwoButtonModal from "../modal/TwoButtonModal";
import {
  useCreateActivity,
  useGetActivities,
  usePatchMyActivity,
} from "@/src/queries/useActivities";
import useModalStore from "@/src/stores/ModalStore";
import { ActivityUpdateRequest } from "@/src/types/activitiesReservationType";
import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface RegisterPageProps {
  activityId?: number;
}

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

const ActivityConservation = ({ activityId }: RegisterPageProps) => {
  const [isModification, setIsModification] = useState(false);
  const [addedUrls, setAddedUrls] = useState<string[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [addedSchedules, setAddedSchedules] = useState<Schedule[]>([]);
  const [removedScheduleIds, setRemovedScheduleIds] = useState<number[]>([]);

  const router = useRouter();

  const { data: ActivitiesDetail } = useGetActivities(activityId);
  const { mutate: createActivity } = useCreateActivity();
  const { mutate: PatchMyActivity } = usePatchMyActivity();

  const { setModalOpen, setModalClose } = useModalStore();

  const handleCancelClick = () => {
    setModalOpen(
      <TwoButtonModal
        onCancel={() => {
          router.push("/my-activities");
          setModalClose();
        }}
        title="작성을 취소하시겠습니까?"
        negativeContent="아니오"
        interactiveContent="작성취소"
      />,
    );
  };

  const handleCreateActivity = (data: ActivityFormDataType) => {
    const { subImages, ...rest } = data;

    const requestData = {
      ...rest,
      subImageUrls: subImages,
    };

    createActivity(requestData, {
      onSuccess: () => {
        router.push("/my-activities");
      },
    });
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ActivityFormDataType>({ mode: "onChange" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
    keyName: "rhfId"
  });

  useEffect(() => {
    if (activityId) {
      setIsModification(true);
      if (ActivitiesDetail) {
        const {
          title,
          category,
          description,
          address,
          price,
          bannerImageUrl,
          subImages,
          schedules,
        } = ActivitiesDetail;

        const formData: ActivityFormDataType = {
          title,
          category,
          description,
          address,
          price,
          bannerImageUrl,
          subImages: subImages.map((img) => ({
            id: img.id,
            imageUrl: img.imageUrl,
          })),
          schedules: schedules.map(({ id, date, startTime, endTime }) => ({
            id,
            date,
            startTime,
            endTime,
          })),
        };

        reset(formData);
      }
    }
  }, [activityId, ActivitiesDetail, reset]);

  const handleImageChange = (added: string[], removedIds: number[]) => {
    setAddedUrls(added);
    setRemovedImageIds(removedIds);
  };

  const handleScheduleChange = (added: Schedule[], removedIds: number[]) => {
    setAddedSchedules(added);
    setRemovedScheduleIds(removedIds);
  };

  const onSubmit = (data: ActivityFormDataType) => {
    if (isModification && activityId) {
      const { title, category, description, price, address, bannerImageUrl } =
        data;
      const updateData: ActivityUpdateRequest = {
        title,
        category,
        description,
        price,
        address,
        bannerImageUrl,
        subImageUrlsToAdd: addedUrls,
        subImageIdsToRemove: removedImageIds,
        schedulesToAdd: addedSchedules,
        scheduleIdsToRemove: removedScheduleIds,
      };
      PatchMyActivity(
        {
          activityId,
          updateData,
        },
        {
          onSuccess: () => {
            router.push("/my-activities");
          },
        },
      );
    } else {
      handleCreateActivity(data);
    }
  };

  return (
    <div className="mb-120 min-w-343 px-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-24 flex justify-between">
          <p className="font-32px-bold">
            {isModification ? "내 체험 수정" : "내 체험 등록"}
          </p>
          <Button
            type="submit"
            width="120"
            height="48"
            radius="4"
            gap="4"
            fontStyle="l"
            backgroundColor="black"
            disabled={!isValid}
            className="disabled:border-none disabled:bg-gray-500 disabled:text-white">
            {isModification ? "체험 수정하기" : "체험 등록하기"}
          </Button>
        </div>
        <div className="flex flex-col gap-24">
          <ActivityTitleInput control={control} />
          <ActivityCategoryInput control={control} />
          <ActivityTextArea control={control} />
          <ActivityPriceInput control={control} />
          <ActivityAddressInput control={control} />
          <ActivityTimeInput
            control={control}
            fields={fields}
            append={append}
            remove={remove}
            onScheduleChange={handleScheduleChange}
          />
          <ActivityImageInput
            minImages={1}
            maxImages={1}
            title="배너 이미지"
            control={control}
            name="bannerImageUrl"
          />
          <ActivityImageInput
            minImages={1}
            maxImages={4}
            title="소개 이미지"
            control={control}
            name="subImages"
            onImageChange={handleImageChange}
          />
        </div>
        <div className="mt-20 flex justify-end gap-10">
          <Button
            type="submit"
            width="120"
            height="48"
            radius="4"
            gap="4"
            fontStyle="l"
            backgroundColor="black"
            disabled={!isValid}
            className="disabled:border-none disabled:bg-gray-500 disabled:text-white">
            {isModification ? "체험 수정하기" : "체험 등록하기"}
          </Button>
          <Button
            type="button"
            width="120"
            height="48"
            radius="4"
            gap="4"
            fontStyle="l"
            onClick={handleCancelClick}
            backgroundColor="white_green"
            className="disabled:border-none disabled:bg-gray-500 disabled:text-white">
            {isModification ? "수정 취소하기" : "체험 취소하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActivityConservation;
