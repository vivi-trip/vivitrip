import Button from "@/src/components/Button/Button";
import { useCalendarStore } from "@/src/stores/CalendarStore";
import { Schedule } from "@/src/types/schedule";
import React from "react";

const TimeSelector = (schedules) => {
  const { onChangeSchedule, selectSchedule, formatDate } = useCalendarStore();

  const handleIsDateButtons = (data: Schedule) => {
    const isSelected = selectSchedule?.id === data.id;
    const isDate = formatDate === data.date;
    if (isDate) {
      return (
        <Button
          type="button"
          width="127"
          height="58"
          radius="8"
          gap="10"
          fontStyle="xxxl"
          className={`px-12 py-10 ${
            isSelected ? "bg-brand-500 text-white" : "bg-white text-brand-500"
          } `}
          key={data.id}
          onClick={() => onChangeSchedule(data)}>
          {data.startTime}~{data.endTime}
        </Button>
      );
    }
    return <div />;
  };

  const renderSchedules = () => {
    const filter = schedules.find((v) => v.date === formatDate);
    if (!filter) {
      return (
        <div className="font-18px-medium text-basic-black">
          예약가능한 시간이 없습니다.
        </div>
      );
    }
    return schedules.map((data) => handleIsDateButtons(data));
  };
  return (
    <div>
      <p className="font-18px-bold">예약 가능한 시간</p>
      <div>{renderSchedules}</div>
    </div>
  );
};

export default TimeSelector;
