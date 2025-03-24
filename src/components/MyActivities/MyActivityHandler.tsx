/* eslint-disable no-console */
import IconKebab from "@/assets/svgs/ic_kebab.svg";
import IconKebabSmall from "@/assets/svgs/ic_kebab_small.svg";
import Dropdown from "@/src/components/Dropdown";
import PopupModal from "@/src/components/Modal/PopupModal";
import TwoButtonModal from "@/src/components/Modal/TwoButtonModal";
import PATH_NAMES from "@/src/constants/pathname";
import { useDeleteArticle } from "@/src/hooks/useMyActivities";
import useModalStore from "@/src/stores/useModalStore";
import { ActivityId } from "@/src/types/activitiesReservationType";
import deleteThumbnailImage from "@/src/utils/deleteThumbnailImage";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const MyActivityHandler = ({ activityId }: ActivityId) => {
  const router = useRouter();
  const { setModalOpen } = useModalStore();
  const { mutate } = useDeleteArticle();

  const handleMoveToEditPage = () => {
    router.push(`${PATH_NAMES.MyActivitiesRegistration}/${activityId}`);
  };

  const handleDeleteData = () => {
    mutate(activityId, {
      onSuccess: () => {
        setModalOpen(<PopupModal title="체험이 성공적으로 삭제되었습니다." />);
        deleteThumbnailImage({ id: activityId });
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          setModalOpen(<PopupModal title={error.response.data.message} />);
        }
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
