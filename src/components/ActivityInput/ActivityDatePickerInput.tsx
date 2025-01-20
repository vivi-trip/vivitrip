import IconCalendarMini from "@/assets/svgs/ic_calendar_mini.svg";
import formatDateToYYYYMMDD from "@/src/utils/calendarFormatDate";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateType = string | null;

interface ActivityDatePickerInputProps {
  selectedDate: DateType;
  onChange: (date: DateType) => void;
}

const ActivityDatePickerInput = ({
  selectedDate,
  onChange,
}: ActivityDatePickerInputProps) => {
  return (
    <div className="flex flex-col">
      <div className="font-16px-medium md:font-20px-medium mb-8 md:mb-10">
        날짜
      </div>
      <div className="relative w-full min-w-132">
        <DatePicker
          wrapperClassName="!w-full"
          className={clsx(
            "!w-full",
            "font-14px-regular text-black",
            "md:font-16px-regular md:h-56",
            "rounded-4 border border-gray-500",
            "min-h-44 px-16 py-8",
          )}
          dateFormat="yyyy-MM-dd"   
          placeholderText="YYYY-MM-DD"
          selected={selectedDate ? new Date(selectedDate) : null} 
          onChange={(date: Date | null) => {
            onChange(date ? formatDateToYYYYMMDD(date) : null);
          }}
        />
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 pr-12 lg:first-letter:pr-24">
          <IconCalendarMini />
        </div>
      </div>
    </div>
  );
};

export default ActivityDatePickerInput;
