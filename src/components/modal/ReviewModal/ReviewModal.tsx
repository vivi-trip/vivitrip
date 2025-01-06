import ReviewContent from "./common/ReviewContent";
import ReviewForm from "./common/ReviewForm";
import CloseIcon from "@/assets/svgs/btnXbig.svg";
import useModalStore from "@/src/stores/ModalStore";

const ReviewModal = () => {
  const { setModalClose } = useModalStore();

  return (
    <div className="flex max-h-686 w-full max-w-432 flex-col items-center">
      <div className="flex w-full justify-between">
        <h1 className="font-24px-bold text-black">후기 작성</h1>
        <CloseIcon onClick={setModalClose} />
      </div>
      <div className="mt-41 flex flex-col gap-24">
        <ReviewContent
          title="[예시] 함께 배우면 즐거운 스트릿 댄스"
          bannerImageUrl="/images/test_img.png"
          date="2024.12.25"
          startTime="11:00"
          endTime="12:00"
          headCount={2}
          totalPrice={10000}
        />
        <ReviewForm />
      </div>
    </div>
  );
};

export default ReviewModal;
