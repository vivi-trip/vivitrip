import Dropdown from "../Dropdown";
import TwoButtonModal from "../modal/TwoButtonModal";
import IconKebab from "@/assets/svgs/ic_kebab.svg";
import IconKebabSmall from "@/assets/svgs/ic_kebab_small.svg";
import IconStar from "@/assets/svgs/ic_star.svg";
import { useDeleteArticle } from "@/src/hooks/useMyActivities";
import useModalStore from "@/src/stores/ModalStore";
import { Activity } from "@/src/types/activitiesReservationType";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";

interface ActivitiesCardProps {
  activity: Activity;
}

const ActivitiesCard = ({ activity }: ActivitiesCardProps) => {
  const {
    id: activityId,
    bannerImageUrl,
    rating,
    reviewCount,
    title,
    price,
  } = activity;

  const router = useRouter();
  const { setModalOpen, setModalClose } = useModalStore();
  const { mutate } = useDeleteArticle();

  const handleMoveToEditPage = () => {
    router.push(`/my-activities/registration/${activityId}`);
  };

  const handleDeleteData = () => {
    mutate(activityId, {
      onSuccess: () => {
        /**
         * @todo 차후  토스트로 대체
         */
        console.log("체험이 성공적으로 삭제되었습니다.");

        setModalClose();
        router.push("/my-activities");
      },
      onError: (error) => {
        // 삭제 실패 시 실행할 로직
        console.error("체험 삭제 중 오류 발생:", error);
      },
    });
  };

  return (
    <div
      className={clsx(
        "relative mt-24 h-128 w-full min-w-344",
        "md:h-156",
        "lg:h-204",
      )}>
      <button
        type="button"
        onClick={() => {
          router.push(`activities/${activityId}`);
        }}
        className={clsx(
          "h-128 w-full min-w-344 rounded-24 border border-white",
          "md:h-156",
          "lg:h-204",
        )}
        style={{ boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)" }}>
        <div className="flex">
          <div
            className={clsx(
              "relative",
              "h-128 min-w-128",
              "md:h-156 md:min-w-156",
              "lg:h-204 lg:min-w-204",
            )}>
            <Image
              src={bannerImageUrl}
              alt="체험 이미지"
              fill
              object-fit="cover"
              className="rounded-l-24 bg-brand-400"
            />
          </div>
          <div className="my-9 ml-8 flex flex-col gap-6">
            <div className="flex gap-6">
              <IconStar />
              <span className="font-14px-regular md:font-16px-regular">
                {rating} ({reviewCount})
              </span>
            </div>
            <div className="flex h-full flex-col justify-between">
              <p className="font-14px-bold md:font-20px-bold">{title}</p>
              <p className="font-16px-medium md:font-24px-medium">
                ₩{price?.toLocaleString("ko-KR")} /인
              </p>
            </div>
          </div>
        </div>
      </button>
      <div className="absolute bottom-14 right-24 z-10">
        <Dropdown className="flex w-160">
          <Dropdown.Trigger className="flex justify-end">
            <div className="hidden md:block">
              <IconKebab />
            </div>
            <div className="block md:hidden">
              <IconKebabSmall />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={handleMoveToEditPage}
              className="px-48 py-17">
              수정하기
            </Dropdown.Item>
            <div className="border-b border-gray-200" />
            <Dropdown.Item
              onClick={() => {
                setModalOpen(
                  <TwoButtonModal
                    title="체험을 삭제하시겠습니까?"
                    negativeContent="취소하기"
                    interactiveContent="삭제하기"
                    onCancel={handleDeleteData}
                  />,
                );
              }}
              className="px-48 py-17">
              삭제하기
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ActivitiesCard;
