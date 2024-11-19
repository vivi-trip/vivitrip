import ModalTest from "@/src/components/modal/ModalTest";
import useModalStore from "@/src/stores/ModalStore";

const OpenModalButton = () => {
  const { setModalOpen } = useModalStore();

  return (
    <button type="button" onClick={() => setModalOpen(<ModalTest />)}>
      모달닫기
    </button>
  );
};

export default OpenModalButton;
