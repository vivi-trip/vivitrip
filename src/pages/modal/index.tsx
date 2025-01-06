
import PopupModal from "@/src/components/modal/PopupModal";
import ReservationCancelModal from "@/src/components/modal/ReservationCancelModal";
import useModalStore from "@/src/stores/ModalStore";

const OpenModalButton = () => {
  const { setModalOpen } = useModalStore();

  return (

    <>
      <button
        type="button"
        onClick={() => setModalOpen(<PopupModal title="가입이완료 됬지롱!" />)}>
        모달열기
      </button>
      <button
        type="button"
        onClick={() => setModalOpen(<ReservationCancelModal />)}>
        모달열기
      </button>
    </>

  );
};

export default OpenModalButton;
