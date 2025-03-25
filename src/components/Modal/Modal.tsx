import ModalPortal from "@/src/components/Modal/ModalPortal";
import useModalStore from "@/src/stores/useModalStore";

const Modal = () => {
  const { modal } = useModalStore();

  return <ModalPortal>{modal}</ModalPortal>;
};

// const ModalTitle = () => {
//   return <h2 className="font-18px-medium">모달 타이틀</h2>;
// };

// Modal.title = ModalTitle;

export default Modal;
