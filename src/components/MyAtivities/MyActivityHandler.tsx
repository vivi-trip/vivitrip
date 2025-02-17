/* eslint-disable no-console */
import Dropdown from "../Dropdown";
import TwoButtonModal from "../modal/TwoButtonModal";
import IconKebab from "@/assets/svgs/ic_kebab.svg";
import IconKebabSmall from "@/assets/svgs/ic_kebab_small.svg";
import PATH_NAMES from "@/src/constants/pathname";
import { useDeleteArticle } from "@/src/hooks/useMyActivities";
import useModalStore from "@/src/stores/ModalStore";
import { ActivityId } from "@/src/types/activitiesReservationType";
import { useRouter } from "next/router";

const MyActivityHandler = ({ activityId }: ActivityId) => {
  const router = useRouter();
  const { setModalOpen, setModalClose } = useModalStore();
  const { mutate } = useDeleteArticle();

  const handleMoveToEditPage = () => {
    router.push(`${PATH_NAMES.MyActivitiesRegistration}/${activityId}`);
  };

  const handleDeleteData = () => {
    mutate(activityId, {
      onSuccess: () => {
        /**
         * @todo 차후  토스트로 대체
         */
        console.log("체험이 성공적으로 삭제되었습니다.");

        setModalClose();
        router.push(PATH_NAMES.MyActivities);
      },
      onError: (error) => {
        // 삭제 실패 시 실행할 로직
        console.error("체험 삭제 중 오류 발생:", error);
      },
    });
  };

  return (
    <Dropdown className="flex">
      <Dropdown.Trigger className="flex justify-end">
        <div className="hidden md:block">
          <IconKebab />
        </div>
        <div className="block md:hidden">
          <IconKebabSmall />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu className="left-auto right-0 !border-gray-200 !bg-gray-200 shadow-lg">
        <Dropdown.Item
          className="min-h-60 min-w-160 bg-white"
          onClick={handleMoveToEditPage}>
          수정하기
        </Dropdown.Item>
        <Dropdown.Item
          className="mt-1 min-h-60 min-w-160 bg-white"
          onClick={() => {
            setModalOpen(
              <TwoButtonModal
                title="체험을 삭제하시겠습니까?"
                negativeContent="취소하기"
                interactiveContent="삭제하기"
                onCancel={handleDeleteData}
              />,
            );
          }}>
          삭제하기
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MyActivityHandler;
