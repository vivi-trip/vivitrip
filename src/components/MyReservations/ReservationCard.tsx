import Button from "@/src/components/Button/Button";
import Loading from "@/src/components/Loading";
import PopupModal from "@/src/components/Modal/PopupModal";
import ReviewModal from "@/src/components/Modal/ReviewModal/ReviewModal";
import PATH_NAMES from "@/src/constants/pathname";
import RESERVATION_LABEL from "@/src/constants/reservationStatus";
import { usePatchMyReservation } from "@/src/queries/useMyReservations";
import { getActivity } from "@/src/services/activities";
import useModalStore from "@/src/stores/useModalStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import { Reservation } from "@/src/types/myReservationsResponses";
import { formatDate3 } from "@/src/utils/calendarFormatDate";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

/**
 * @description 내 예약 내용
 * @param id - 체험 id
 * @param teamIdid - 팀 id
 * @param userId - 유저 id
 * @param activity - 체험 내용
 * @param scheduleId - 예약 시간 id
 * @param status - 예약 상태
 * @param reviewSubmitted - 리뷰 가능 여부
 * @param totalPrice - 체험  토탈 가격
 * @param headCount - 체험 신청 인원 수
 * @param date - 체험 예약 날짜
 * @param startTime - 체험 시작 시간
 * @param endTime - 체험 종료 시간
 * @param createdAt - 생성 시간
 * @param updatedAt - 수정 시간
 */
interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const {
    activity,
    status,
    date,
    startTime,
    endTime,
    headCount,
    totalPrice,
    reviewSubmitted,
    id,
  } = reservation;

  const { id: activityId, bannerImageUrl, title } = activity;

  const reviewData = {
    bannerImageUrl,
    title,
    date,
    startTime,
    endTime,
    headCount,
    totalPrice,
    id,
  };

  const { setModalOpen } = useModalStore();
  const { mutate: PatchMyReservation } = usePatchMyReservation();

  const handleCancelReservation = () => {
    PatchMyReservation(
      { reservationId: id, status: "canceled" },
      {
        onSuccess: () => {
          setModalOpen(<PopupModal title="예약이 취소되었습니다." />);
        },
        onError: () => {
          setModalOpen(<PopupModal title="예약취소가 실패했습니다." />);
        },
      },
    );
  };

  const { data, isLoading } = useQuery<ActivityDetailResponse>({
    queryKey: ["activity", activityId],
    queryFn: () => {
      if (activityId === undefined) {
        throw new Error("Activity ID is undefined");
      }
      return getActivity({ activityId });
    },
    retry: 0,
  });

  const Component = data ? Link : "div";
  const options = data
    ? {
        href: `${PATH_NAMES.Activity}/${activityId}`,
      }
    : {
        href: null as unknown as string,
        onClick: () => {
          setModalOpen(<PopupModal title="존재하지 않는 체험입니다." />);
        },
      };

  const label =
    RESERVATION_LABEL[status as keyof typeof RESERVATION_LABEL]?.label ??
    "알 수 없는 상태";
  const colorClass =
    RESERVATION_LABEL[status as keyof typeof RESERVATION_LABEL]?.colorClass ??
    "text-gray-500";

  if (isLoading) {
    return (
      <div
        className={clsx(
          "relative block",
          "mb-8 h-128 w-full min-w-300 rounded-24 bg-white",
          "md:mb-16 md:h-156 md:min-w-540",
          "lg:mb-24 lg:h-204",
        )}>
        <Loading
          isOverlay="node"
          overlayColor="translate"
          isAbsolute="absolute"
          loadingBoxColor="translate"
          size={{ sm: 50, md: 60, lg: 70 }}
          textStyle="font-18px-medium md:font-20px-regular lg:font-24px-regular"
          textColor="text-brand-50"
          className="p-30"
        />
      </div>
    );
  }

  return (
    <Component
      {...options}
      className={clsx(
        "block hover:cursor-pointer",
        "mb-8 h-128 w-full min-w-300 rounded-24 bg-white",
        "md:mb-16 md:h-156 md:min-w-540",
        "lg:mb-24 lg:h-204",
      )}
      style={{ boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)" }}>
      <div className="flex flex-row">
        <div
          className={clsx(
            "relative",
            "h-128 min-w-128",
            "md:h-156 md:min-w-156",
            "lg:h-204 lg:min-w-204",
            "lg:font-20px-bold lg:max-w-480",
          )}>
          <Image
            src={bannerImageUrl}
            alt="체험이미지"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-l-24 bg-brand-400"
          />
        </div>
        <div
          className={clsx(
            "w-full",
            "my-8 ml-8 mr-9 flex flex-col",
            "md:my-12 md:ml-12 md:mr-16",
            "lg:mx-24 lg:my-21",
          )}>
          <span
            className={clsx(
              "font-14px-bold text-left",
              "md:font-16px-bold",
              colorClass,
            )}>
            {label}
          </span>
          <span
            className={clsx(
              "font-14px-bold text-left",
              "w-full max-w-200 truncate",
              "md:font-18px-bold md:max-w-300",
              "lg:font-20px-bold lg:mt-8 lg:max-w-480",
            )}>
            {title}
          </span>
          <div
            className={clsx(
              "mt-4 flex items-center",
              "font-12px-regular gap-4 text-gray-800",
              "md:font-14px-regular",
              "lg:font-18px-regular lg:mt-12",
            )}>
            <p>
              <span>{formatDate3(date)}</span> · <span>{startTime}</span> -
              <span> {endTime}</span> · <span>{headCount}명</span>
            </p>
          </div>
          <div
            className={clsx(
              "flex w-full items-center justify-between",
              "font-16px-medium text-left",
              "md:font-20px-medium md:mt-10",
              "lg:font-24px-medium lg:mt-16",
            )}>
            <span>{`₩${totalPrice.toLocaleString("ko-KR")}`}</span>

            {status === "pending" && (
              <Button
                type="button"
                radius="6"
                gap="8"
                backgroundColor="white_green"
                onClick={handleCancelReservation}
                className={clsx(
                  "font-12px-bold h-32 min-w-80 max-w-160 px-14 py-6 text-brand-500",
                  "md:font-16px-bold md:h-40 md:px-26 md:py-7",
                  "lg:h-43 lg:px-42 lg:py-8",
                )}>
                예약 취소
              </Button>
            )}

            {status === "completed" && (
              <Button
                type="button"
                radius="6"
                gap="8"
                backgroundColor={reviewSubmitted ? "gray" : "black"}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  event.preventDefault();

                  getActivity({ activityId })
                    .then(() => {
                      setModalOpen(<ReviewModal reviewData={reviewData} />, {
                        customClass:
                          "size-full md:w-480 md:h-750 p-24 md:px-24 md:pt-23 min-w-375 rounded-none md:rounded-3xl",
                      });
                    })
                    .catch((error) => {
                      if (error instanceof AxiosError && error.response) {
                        setModalOpen(
                          <PopupModal title={error.response.data.message} />,
                        );
                      }
                    });
                }}
                disabled={reviewSubmitted}
                className={clsx(
                  "font-14px-bold h-32 min-w-80 px-16 text-brand-500",
                  "md:font-16px-bold md:h-40 md:min-w-120",
                  "lg:h-43 lg:min-w-160",
                )}>
                {reviewSubmitted ? "후기 작성 완료" : "후기 작성"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Component>
  );
};

export default ReservationCard;
