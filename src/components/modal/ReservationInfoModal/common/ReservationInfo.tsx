import Button from "@/src/components/Button/Button";
import { usePatchReservationState } from "@/src/hooks/useMyActivities";
import { ReservationInfoType } from "@/src/types/activitiesReservationType";

interface ReservationInfoProps {
  selectTab: string;
  reservationInfo: ReservationInfoType;
}

const ReservationInfo = ({
  selectTab,
  reservationInfo,
}: ReservationInfoProps) => {
  const {
    nickname,
    headCount,
    activityId,
    id: reservationId,
  } = reservationInfo;

  const { mutate } = usePatchReservationState();

  const handleResultUpdate = (status: string) => {
    mutate({
      activityId,
      reservationId,
      status,
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-10">
          <p className="font-16px-semibold text-gray-500">닉네임</p>{" "}
          <p className="font-16px-regular text-black"> {nickname}</p>
        </div>
        <div className="flex gap-10">
          <p className="font-16px-semibold text-gray-500">인원</p>{" "}
          <p className="font-16px-regular text-black">{headCount}명</p>
        </div>
        <div className="flex justify-end gap-4">
          {selectTab === "pending" && (
            <>
              <Button
                type="button"
                width="82"
                height="38"
                fontStyle="xl"
                backgroundColor="black"
                radius="6"
                gap="8"
                onClick={() => handleResultUpdate("confirmed")}>
                승인하기
              </Button>
              <Button
                type="button"
                width="82"
                height="38"
                fontStyle="xl"
                backgroundColor="black"
                radius="6"
                gap="8"
                onClick={() => handleResultUpdate("declined")}>
                거절하기
              </Button>
            </>
          )}
          {selectTab === "confirmed" && (
            <p className="flex h-38 w-85 items-center justify-center rounded-3xl bg-[#FFF4E8] text-[#FF7C1D]">
              예약승인
            </p>
          )}
          {selectTab === "declined" && (
            <p className="flex h-38 w-85 items-center justify-center rounded-3xl bg-[#FFF4E8] text-[#FF472E]">
              예약거절
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;
