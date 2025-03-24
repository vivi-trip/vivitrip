import CloseIcon from "@/assets/svgs/btnXbig.svg";
import ReviewContent from "@/src/components/Modal/ReviewModal/Common/ReviewContent";
import ReviewForm from "@/src/components/Modal/ReviewModal/Common/ReviewForm";
import useModalStore from "@/src/stores/useModalStore";
import { ReviewData } from "@/src/types/myReservationsResponses";
import { formatDate3 } from "@/src/utils/calendarFormatDate";
import clsx from "clsx";

interface ReviewModalProps {
  riviewData: ReviewData;
}

const ReviewModal = ({ riviewData }: ReviewModalProps) => {
  const { setModalClose } = useModalStore();
  const {
    bannerImageUrl,
    title,
    date,
    startTime,
    endTime,
    headCount,
    totalPrice,
    id: reservationId,
  } = riviewData;

  return (
    <div className={clsx("mx-auto")}>
      <div className="flex w-full justify-between">
        <h1 className="font-24px-bold text-black">후기 작성</h1>
        <button type="button" onClick={setModalClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="mt-41">
        <ReviewContent
          title={title}
          bannerImageUrl={bannerImageUrl}
          date={formatDate3(date)}
          startTime={startTime}
          endTime={endTime}
          headCount={headCount}
          totalPrice={totalPrice}
        />
        <ReviewForm reservationId={reservationId} />
      </div>
    </div>
  );
};

export default ReviewModal;
