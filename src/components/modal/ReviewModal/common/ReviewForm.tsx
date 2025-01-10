import Button from "../../../Button/Button";
import StarOff from "@/assets/svgs/ic_star_off.svg";
import StarOn from "@/assets/svgs/ic_star_on.svg";
import clsx from "clsx";
import React, { useState } from "react";

const ReviewForm = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  // TODO: 토스트 상태 추가
  // const [showToast, setShowToast] = useState(false);

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewText(event.target.value);
  };

  const handleStars = (clicked: number) => {
    setRating((prev) => (prev === clicked ? null : clicked));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 성공 시 토스트 메시지 표시
    // TODO: API 추가
    // TODO: submit 성공시 rating, reviewText   초기화
  };

  return (
    <>
      <div className="flex h-100 w-432 justify-center gap-8 px-60 py-22">
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            onClick={() => handleStars(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleStars(id);
              }
            }}
            tabIndex={0}
            role="button"
            className="cursor-pointer">
            {rating !== null && id <= rating ? (
              <StarOn width={56} height={56} />
            ) : (
              <StarOff width={56} height={56} />
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={reviewText ? handleSubmit : undefined}
        className="flex w-full flex-col gap-24">
        <textarea
          placeholder="후기를 작성해주세요"
          className={clsx(
            "rounded-4 border border-gray-500 text-basic-black",
            "font-16px-regular",
            "px-16 py-8",
            "h-240 w-full",
            "resize-none",
            "focus:border-brand-500 focus:outline-none",
          )}
          value={reviewText}
          onChange={handleReviewChange}
        />
        <Button
          type="button"
          width="auto"
          height="56"
          radius="4"
          gap="4"
          fontStyle="l"
          disabled={!reviewText}
          className={clsx(
            "lg:w-full",
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
