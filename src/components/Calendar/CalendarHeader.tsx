import NextIcon from "@/assets/svgs/next.svg";
import PrevIcon from "@/assets/svgs/prev.svg";

interface CalendarHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

const CalendarHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
}: CalendarHeaderProps) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[month];
  return (
    <div className="customHeader">
      <button
        className="button"
        type="button"
        onClick={decreaseMonth}
        aria-label="이전 달">
        <PrevIcon />
      </button>
      <p className="date-text">{`${monthName} ${year}`}</p>
      <button
        className="button"
        type="button"
        onClick={increaseMonth}
        aria-label="다음 달">
        <NextIcon />
      </button>
    </div>
  );
};

export default CalendarHeader;
