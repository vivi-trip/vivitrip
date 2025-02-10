import Button from "@/src/components/Button/Button";
import { useCalendar } from "@/src/stores/CalendarStore";
import { Schedule, Schedules } from "@/src/types/activitiesResponses";
import clsx from "clsx";
import React, { useState } from "react";

const TimeSelector = ({ schedules }: Schedules) => {
  const { onChangeSchedule, selectSchedule, formatDate } = useCalendar();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleButtonClick = (data: Schedule) => {
    if (selectedId === data.id) {
      setSelectedId(null);
      onChangeSchedule(null);
    } else {
      setSelectedId(data.id ?? null);
      onChangeSchedule(data);
    }
  };

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
          className={clsx("mt-16 h-46 px-12 py-10", {
            "bg-brand-500 text-white": isSelected,
            "border border-brand-500 text-brand-500": !isSelected,
          })}
          key={data.id}
          onClick={() => handleButtonClick(data)}>
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
        <div className="font-16px-bold my-10">예약가능한 시간이 없습니다</div>
      );
    }
    return schedules.map((data) => handleIsDateButtons(data));
  };

  return (
    <div>
      <p className="font-18px-bold">예약 가능한 시간</p>
      <div>{renderSchedules()}</div>
    </div>
  );
};

export default TimeSelector;
