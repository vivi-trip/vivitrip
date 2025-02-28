import ActivityReservationBar from "@/src/components/ActivityReservation/ActivityReservationBar";
import PopupModal from "@/src/components/modal/PopupModal";
import ReservationCancelModal from "@/src/components/modal/ReservationCancelModal";
import ReservationInfoModal from "@/src/components/modal/ReservationInfoModal/ReservationInfoModal";
import ReservationModal from "@/src/components/modal/ReservationModal/ReservationModal";
import ReviewModal from "@/src/components/modal/ReviewModal/ReviewModal";
import { useGetActivities } from "@/src/queries/useActivities";
import useModalStore from "@/src/stores/ModalStore";

const OpenModalButton = () => {
  const { setModalOpen } = useModalStore();
  const { data } = useGetActivities(3622);

  return (
    <div className="flex flex-col gap-23">
      <button
        type="button"
        className="font-24px-bold"
        onClick={() =>
          setModalOpen(
            <PopupModal
              title="예약이 신청 되었습니다."
              content="예약 관리자가 예약 승인을 하면 
              예약이 완료 됩니다."
            />,
            {
              customClass: "md:p-32",
            },
          )
        }>
        모달열기
      </button>
      <button
        type="button"
        className="font-24px-bold"
        onClick={() =>
          setModalOpen(<ReservationCancelModal onCancel={() => {}} />)
        }>
        모달열기
      </button>

      <button
        type="button"
        className="font-24px-bold"
        onClick={() =>
          setModalOpen(<ReservationModal />, {
            customClass: "w-full h-750",
          })
        }>
        예약하기
      </button>

      {/* <button
        type="button"
        className="font-24px-bold"
        onClick={() =>
          setModalOpen(<ReviewModal />, {
            customClass: "w-480 h-750",
          })
        }>
        리뷰
      </button> */}

      <button
        type="button"
        className="font-24px-bold"
        onClick={() =>
          setModalOpen(
            <ReservationInfoModal
              selectedActivityId={1}
              selectedDate="2024-01-01"
            />,
            {
              customClass: "w-429 h-750 min-h-750 p-24",
            },
          )
        }>
        예약확인
      </button>

      {data && <ActivityReservationBar activityData={data} />}
    </div>
  );
};

export default OpenModalButton;
