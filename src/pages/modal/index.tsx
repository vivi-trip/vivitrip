import ModalPopup from "@/src/components/modal/ModalPopup";
import useModalStore from "@/src/stores/ModalStore";

const OpenModalButton = () => {
  const { setModalOpen } = useModalStore();

  return (
    <button type="button" onClick={() => setModalOpen(<ModalPopup />)}>
      모달열기
    </button>
  );
};

export default OpenModalButton;
