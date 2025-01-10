import MinusIcon from "@/assets/svgs/ic_minus_btn.svg";
import PlusIcon from "@/assets/svgs/ic_plus_btn.svg";
import { useCalendarStore } from "@/src/stores/CalendarStore";
import React, { useState } from "react";

const ParticipantCount = () => {
  const { onChangeMembers } = useCalendarStore();

  const [members, setMembers] = useState(1);

  const handleCountPlus = () => {
    const newMembers = members + 1;
    setMembers(newMembers);
    onChangeMembers(newMembers);
  };

  const handleCountMinus = () => {
    const newMembers = members > 1 ? members - 1 : 1;
    setMembers(newMembers);
    onChangeMembers(newMembers);
  };

  return (
    <div>
      <div className="mt-16 flex flex-col gap-8 border-t-2 pb-24 pt-12">
        <p className="font-18px-bold">참여 인원 수</p>
        <div className="flex h-40 w-120 items-center rounded-md border bg-white">
          <button
            type="button"
            className="p-10"
            onClick={handleCountMinus}
            disabled={members <= 1}>
            <MinusIcon />
          </button>
          <div className="flex size-40 items-center justify-center p-8">
            {members}
          </div>
          <button type="button" className="p-10" onClick={handleCountPlus}>
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCount;
