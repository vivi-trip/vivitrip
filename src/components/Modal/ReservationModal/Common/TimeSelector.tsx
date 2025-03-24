import Button from "@/src/components/Button/Button";
import { useCalendar } from "@/src/stores/calendarStore";
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
          className={clsx("mr-10 h-46 px-12 py-10", {
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
    const filteredSchedules = schedules
      .filter((v) => v.date === formatDate) // 선택한 날짜에 해당하는 데이터만 필터링
      .sort((a, b) => {
        const timeA = Number(a.startTime.replace(":", "")); // "09:00" → 900, "23:00" → 2300
        const timeB = Number(b.startTime.replace(":", ""));
        return timeA - timeB;
      });

    if (filteredSchedules.length === 0) {
      return (
        <div className="font-14px-medium text-gray-800">
          예약가능한 시간이 없습니다
        </div>
      );
    }

    return filteredSchedules.map((data) => handleIsDateButtons(data));
  };

  return (
    <div>
      <p className="font-18px-bold mt-20">예약 가능한 시간</p>
      <div className="scrollbar-none mx-10 overflow-x-auto">
        <div className="my-16 flex whitespace-nowrap">{renderSchedules()}</div>
      </div>
    </div>
  );
};

export default TimeSelector;
