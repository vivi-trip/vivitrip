import review_basic_profile_image from "@/assets/pngs/review_basic_profile_image.png";
import StarSmIcon from "@/assets/svgs/ic_star_sm.svg";
import { ReviewItem, ReviewListProps } from "@/src/types/review";
import clsx from "clsx";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const ReviewList = ({ fetchedReviews }: ReviewListProps) => {
  // 날짜 형식 변환
  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <article className="flex flex-col gap-24">
      {fetchedReviews.length > 0 ? (
        fetchedReviews.map((review: ReviewItem, idx) => (
          <section key={review.id} className="flex flex-col gap-24">
            <div className="flex gap-16">
              <Image
                src={review.user.profileImageUrl || review_basic_profile_image}
                width={45}
                height={45}
                alt="후기 작성자 프로필 이미지"
                className={clsx(
                  "size-45 rounded-full border-brand-500 object-cover object-center",
                  { "shadow-md": review.user.profileImageUrl },
                )}
              />
              <div className="flex flex-col gap-8">
                <header className="flex items-center gap-8">
                  <p className="font-16px-bold">{review.user.nickname}</p>
                  <p className="font-14px-regular">|</p>
                  <p className="font-16px-regular text-gray-500">
                    {formatDate(review.createdAt)}
                  </p>
                </header>
                <div className="mr-15 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarSmIcon
                      key={uuidv4()}
                      width={16}
                      height={16}
                      className={
                        index < review.rating
                          ? "text-yellow-200"
                          : "text-gray-200"
                      }
                    />
                  ))}
                  <p className="font-16px-medium ml-5">{review.rating}</p>
                </div>
                <p className="font-16px-regular">{review.content}</p>
              </div>
            </div>
            {idx !== fetchedReviews.length - 1 && (
              <div className="relative">
                <div
                  className="absolute left-1/2 h-0.5 border-b border-brand-500 opacity-25 lg:max-w-1200"
                  style={{
                    width: "calc(100vw - 17px)",
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
            )}
          </section>
        ))
      ) : (
        <article>
          <p>아직 작성된 후기가 없습니다.</p>
          <p>체험 후 첫 번째 후기를 작성해 보세요.</p>
        </article>
      )}
    </article>
  );
};

export default ReviewList;
