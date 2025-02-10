import CloseIcon from "@/assets/svgs/btnXbig.svg";
import MyPage from "@/src/components/MyPage";
import useModalStore from "@/src/stores/ModalStore";
import { MyPageProps } from "@/src/types/user";

const MyPageModal = ({ handleSubmit, isPending }: MyPageProps) => {
  const { setModalClose } = useModalStore();


  return (
    <div className="z-50 flex size-full items-center justify-center">
      <div className="relative w-full rounded-none bg-white p-6">
        <div className="flex justify-end pr-100">
          <CloseIcon onClick={setModalClose} />
        </div>
        <MyPage handleSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
};

export default MyPageModal;
