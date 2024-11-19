import Button from "../Button/Button";
import useModalStore from "@/src/stores/ModalStore";

const ModalTest = () => {
  const { setModalClose } = useModalStore();

  return (
    <>
      <div>모달 테스트</div>
      <Button type="button" width="120" height="30" onClick={setModalClose}>
        닫기
      </Button>
    </>
  );
};

export default ModalTest;
