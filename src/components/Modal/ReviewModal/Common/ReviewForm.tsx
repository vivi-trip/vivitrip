import IconStar from "@/assets/svgs/ic_pretty_star.svg";
import Button from "@/src/components/Button/Button";
import PopupModal from "@/src/components/Modal/PopupModal";
import { useCreateReviews } from "@/src/queries/useMyReservations";
import useModalStore from "@/src/stores/useModalStore";
import { ReservationRating } from "@/src/types/myReservations";
import { AxiosError } from "axios";
import clsx from "clsx";
import React, { useState } from "react";

interface ReviewFromProps {
  reservationId: number;
}

const ReviewForm = ({ reservationId }: ReviewFromProps) => {
  const [rating, setRating] = useState<ReservationRating>(1);
  const [reviewText, setReviewText] = useState("");
  const { setModalOpen } = useModalStore();

  const { mutate: createReview } = useCreateReviews();

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewText(event.target.value);
  };

  const handleStars = (clicked: ReservationRating) => {
    if (rating === clicked) {
      // 동일한 별점을 다시 클릭하면 하나 줄어든 값으로 설정
      const newRating = clicked > 1 ? clicked - 1 : 1; // 최소값은 1으로 유지
      setRating(newRating as ReservationRating);
    } else {
      // 다른 별점을 클릭하면 해당 값으로 설정
      setRating(clicked);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reviewData = { reservationId, rating, content: reviewText };

    createReview(reviewData, {
      onSuccess: () => {
        setModalOpen(<PopupModal title="리뷰가 등록 되었습니다." />);
        setReviewText("");
        setRating(1);
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          setModalOpen(<PopupModal title={error.response.data.message} />);
        }
      },
    });
  };

  return (
    <>
      <div className="flex h-100 w-full items-center justify-center gap-8 px-48 py-22">
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            onClick={() => handleStars(id as ReservationRating)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleStars(id as ReservationRating);
              }
            }}
            tabIndex={0}
            role="button"
            className="cursor-pointer">
            {rating !== null && id <= rating ? (
              <IconStar className="size-50 text-yellow-400" />
            ) : (
              <IconStar className="size-50 stroke-gray-400 text-transparent" />
            )}
          </div>
        ))}
      </div>
      <form onSubmit={reviewText ? handleSubmit : undefined} className="w-full">
        <textarea
          placeholder="후기를 작성해주세요"
          className={clsx(
            "rounded-4 border border-gray-500 text-basic-black",
            "font-16px-regular",
            "mt-24 px-16 py-8",
            "h-240 w-full",
            "resize-none",
            "focus:border-brand-500 focus:outline-none",
          )}
          value={reviewText}
          onChange={handleReviewChange}
        />
        <Button
          type="submit"
          width="auto"
          height="56"
          radius="4"
          gap="4"
          fontStyle="l"
          disabled={!reviewText}
          className={clsx(
            "mt-24 w-full",
            !reviewText
              ? "cursor-not-allowed bg-gray-500 text-gray-600"
              : "border-none bg-brand-500 text-white",
          )}>
          작성하기
        </Button>
      </form>
    </>
  );
};

export default ReviewForm;
