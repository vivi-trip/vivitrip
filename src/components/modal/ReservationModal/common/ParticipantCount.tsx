import MinusIcon from "@/assets/svgs/ic_minus_btn.svg";
import PlusIcon from "@/assets/svgs/ic_plus_btn.svg";
import { useCalendarStore } from "@/src/stores/CalendarStore";
import React from "react";

interface ParticipantCountProps {
  count: number;
}

const ParticipantCount = ({ count }: ParticipantCountProps) => {
  const { onChangeMembers } = useCalendarStore();

  const handleCountPlus = () => {
    onChangeMembers(count + 1);
  };
  const handleCountMinus = () => {
    onChangeMembers(count > 1 ? count - 1 : 1);
  };

  return (
    <div>
      <div className="mt-16 flex flex-col gap-8 border-t-2 pb-24 pt-12">
        <p className="font-18px-bold">참여 인원 수</p>
        <div className="flex w-120 h-40 items-center rounded-md border bg-white">
          <button
            type="button"
            className="p-10"
            onClick={handleCountMinus}
            disabled={count <= 1}>
            <MinusIcon />
          </button>
          <div className="flex size-40 items-center justify-center p-8">
            {count}
          </div>
          <button
            type="button"
            className="p-10"
            onClick={handleCountPlus}
            disabled={count <= 1}>
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCount;
