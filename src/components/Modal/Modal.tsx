import ModalPotal from "./ModalPortal";
import useModalStore from "@/src/stores/useModalStore";

const Modal = () => {
  const { modal } = useModalStore();

  return <ModalPotal>{modal}</ModalPotal>;
};

// const ModalTitle = () => {
//   return <h2 className="font-18px-medium">모달 타이틀</h2>;
// };

// Modal.title = ModalTitle;

export default Modal;
