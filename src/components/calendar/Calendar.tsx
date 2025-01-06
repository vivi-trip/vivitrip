import CalendarHeader from "./CalendarHeader";
import { useCalendarStore } from "@/src/stores/CalendarStore";
import { Locale, enUS } from "date-fns/locale";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customLocale: Locale = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n: number) => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][n],
  },
  options: {
    ...enUS.options,
    weekStartsOn: 0,
  },
};

const Calendar = () => {
  const {
    selectDate,
    selectMonth,
    onChangeSelectDate,
    onChangeSelectMonth,
    data,
  } = useCalendarStore();

  const handleMonthChange = (date: Date) => {
    onChangeSelectMonth(date.getMonth());
  };

  const isScheduledDate = () => {
    return data.schedules?.map((schedule) => new Date(schedule.date)) || [];
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <DatePicker
        selected={selectDate}
        onChange={(date: Date | null) => {
          if (date) {
            onChangeSelectDate(date);
          }
        }}
        inline
        autoComplete="off"
        locale={customLocale}
        minDate={new Date()}
        onMonthChange={handleMonthChange}
        highlightDates={isScheduledDate()}
        calendarClassName="react-datepicker"
        dayClassName={(d) => {
          return d.getMonth() === selectMonth
            ? "custom-day"
            : "custom-day gray-day";
        }}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <CalendarHeader
            date={date}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
          />
        )}
      />
    </div>
  );
};

export default Calendar;
