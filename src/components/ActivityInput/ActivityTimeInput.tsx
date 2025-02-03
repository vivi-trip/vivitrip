import Button from "../Button/Button";
import ActivityDatePickerInput from "@/src/components/ActivityInput/ActivityDatePickerInput";
import TimeDropdown from "@/src/components/ActivityInput/TimeDropdown";
import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface TimeInputProps {
  control: Control<ActivityFormDataType>;
  fields: FieldArrayWithId<ActivityFormDataType, "schedules", "id">[];
  append: UseFieldArrayAppend<ActivityFormDataType, "schedules">;
  remove: UseFieldArrayRemove;
  onScheduleChange?: (
    addedSchedules: Schedule[],
    removedScheduleIds: number[],
  ) => void;
}

const ActivityTimeInput = ({
  control,
  fields,
  append,
  remove,
  onScheduleChange,
}: TimeInputProps) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);
  const [addedSchedules, setAddedSchedules] = useState<Schedule[]>([]);
  const [removedScheduleIds, setRemovedScheduleIds] = useState<number[]>([]);

  useEffect(() => {
    if (fields.length > 0 && originalSchedules.length === 0) {
      setOriginalSchedules(fields);
    }
  }, [fields, originalSchedules]);

  useEffect(() => {
    if (onScheduleChange) {
      onScheduleChange(addedSchedules, removedScheduleIds);
    }
  }, [addedSchedules, removedScheduleIds, onScheduleChange]);

  const handleAddTime = () => {
    if (selectedDate && startTime && endTime) {
      const newSchedule = {
        date: selectedDate,
        startTime,
        endTime,
      };
      append(newSchedule);
      setAddedSchedules((prev) => [...prev, newSchedule]);
      setStartTime("");
      setEndTime("");
      setSelectedDate(null);
    }
  };

  const handleRemoveTime = (index: number) => {
    const removedSchedule = fields[index];

    if (typeof removedSchedule.id === "number") {
      // 서버에서 가져온 기존 스케줄 삭제
      setRemovedScheduleIds((prev) => [...prev, removedSchedule.id]);
    } else {
      // 새로 추가한 스케줄 삭제
      setAddedSchedules((prev) =>
        prev.filter(
          (s) =>
            s.date !== removedSchedule.date ||
            s.startTime !== removedSchedule.startTime ||
            s.endTime !== removedSchedule.endTime,
        ),
      );
    }

    remove(index);
  };

  return (
    <div>
      <div className="flex w-full min-w-343 gap-5 lg:gap-20">
        <div className="flex-1">
          <ActivityDatePickerInput
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
        <div className="flex min-h-44 min-w-210 flex-col gap-4">
          <div className="flex items-center gap-2">
            <div>
              <div className="font-16px-medium md:font-20px-medium mb-8 md:mb-10">
                시작 시간
              </div>
              <div className="flex-1">
                <TimeDropdown value={startTime} onChange={setStartTime} />
              </div>
            </div>
            <span className="mx-2 mt-26 hidden md:mt-32 lg:mx-15 lg:block">
              ~
            </span>
            <div>
              <div className="font-16px-medium md:font-20px-medium mb-8 md:mb-10">
                종료 시간
              </div>
              <div className="flex-1">
                <TimeDropdown
                  value={endTime}
                  onChange={setEndTime}
                  minTime={startTime}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddTime}
              className={clsx(
                "font-24px-medium ml-2 mt-34 size-44 rounded-7 bg-brand-500 text-white",
                "md:mt-42 md:size-56 lg:ml-20",
                "hover:bg-brand-600",
              )}>
              +
            </button>
          </div>
        </div>
      </div>

      {fields.length > 0 && (
        <>
          <div className="my-16 border-b-2 lg:my-20" />
          <div className="flex flex-col gap-8 md:gap-16 lg:gap-21">
            {fields.map((scheduleField, index) => (
              <div
                key={scheduleField.id}
                className="flex w-full gap-5 lg:gap-20">
                <div className="flex-1">
                  <Controller
                    name={`schedules.${index}.date`}
                    control={control}
                    render={({ field }) => (
                      <div
                        className={clsx(
                          "h-44 w-full px-12 py-10",
                          "md:h-56 md:px-16 md:py-15",
                          "rounded-4 border border-gray-500",
                        )}>
                        {field.value}
                      </div>
                    )}
                  />
                </div>
                <div className="flex min-h-44 min-w-210 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Controller
                        name={`schedules.${index}.startTime`}
                        control={control}
                        render={({ field }) => (
                          <div
                            className={clsx(
                              "h-44 py-10 pl-12",
                              "md:h-56 md:px-16 md:py-15",
                              "rounded-4 border border-gray-500",
                              "flex items-center justify-between",
                              "w-79 md:w-104",
                            )}>
                            {field.value}
                          </div>
                        )}
                      />
                    </div>
                    <span className="mx-2 hidden lg:mx-15 lg:block">~</span>
                    <div className="flex-1">
                      <Controller
                        name={`schedules.${index}.endTime`}
                        control={control}
                        render={({ field }) => (
                          <div
                            className={clsx(
                              "h-44 py-10 pl-12",
                              "md:h-56 md:px-16 md:py-15",
                              "rounded-4 border border-gray-500",
                              "flex items-center justify-between",
                              "w-79 md:w-104",
                            )}>
                            {field.value}
                          </div>
                        )}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTime(index)}
                      className={clsx(
                        "font-24px-medium ml-2 size-44 rounded-7 bg-brand-400 text-white",
                        "md:size-56 lg:ml-20",
                        "hover:bg-brand-600",
                      )}>
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityTimeInput;
