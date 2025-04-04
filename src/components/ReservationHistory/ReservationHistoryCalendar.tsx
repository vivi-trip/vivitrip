import IconNext from "@/assets/svgs/ic_next.svg";
import IconPrev from "@/assets/svgs/ic_prev.svg";
import ReservationInfoModal from "@/src/components/Modal/ReservationInfoModal/ReservationInfoModal";
import styles from "@/src/components/ReservationHistory/ReservationHistoryCalendar.module.scss";
import { useGetMyReservationDashboard } from "@/src/hooks/useMyActivities";
import useModalStore from "@/src/stores/useModalStore";
import useReservationStore from "@/src/stores/useReservationStore";
import { clsx } from "clsx";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { Calendar, EventProps, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface Event {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

interface CalendarEvent {
  start: Date;
  end: Date;
  allDay: boolean;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

interface CustomToolbarProps {
  label: string;
  onNavigate: (action: "PREV" | "NEXT") => void;
}

type NavigateAction = "PREV" | "NEXT" | "TODAY" | "DATE";

const locales = { ko };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomEvent = ({ event }: EventProps<CalendarEvent>) => {
  const { completed, confirmed, pending } = event.reservations;
  return (
    <div className="flex flex-col gap-2">
      {completed > 0 && (
        <div className="font-12px-medium md:font-14px-medium rounded-4 bg-gray-100 py-1 pl-4 text-gray-800">
          완료 {completed}
        </div>
      )}
      {confirmed > 0 && (
        <div className="font-12px-medium md:font-14px-medium rounded-4 bg-orange-50 py-1 pl-4 text-orange-100">
          승인 {confirmed}
        </div>
      )}
      {pending > 0 && (
        <div className="font-12px-medium md:font-14px-medium rounded-4 bg-blue-100 py-1 pl-4 text-white">
          예약 {pending}
        </div>
      )}
    </div>
  );
};

const getReservationCircles = (events: Event[]) => {
  return (
    <div className="relative items-center md:mt-12">
      {events.map((event) => {
        const { completed, confirmed, pending } = event.reservations;
        const circles = [];

        if (completed > 0) circles.push("bg-gray-800");
        if (confirmed > 0) circles.push("bg-orange-100");
        if (pending > 0) circles.push("bg-blue-100");

        return (
          <div key={`event-${event.date}`} className="flex gap-5 pl-5">
            {circles.map((circleColor) => (
              <div
                key={`${event.date}-${circleColor}`}
                className={`mt-5 size-8 rounded-full ${circleColor}`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const MyDateHeader = ({ label, date }: { label: string; date: Date }) => {
  const { data } = useReservationStore();

  // 해당 날짜에 예약 정보가 있는지 확인
  const eventsForDate = data?.filter(
    (event) => event.date === format(date, "yyyy-MM-dd"),
  );

  return (
    <div className={clsx("flex w-full flex-col items-start", "md:flex-row")}>
      <button
        type="button"
        className={clsx(
          "font-20px-semibold border-none bg-transparent pl-12 pt-12 text-left text-gray-500",
          // 모바일에서만 이벤트가 있을 때 다른 폰트 크기 적용
          eventsForDate?.length > 0 && "font-16px-semibold pl-8 pt-8",
        )}>
        {label}
      </button>
      {/* 해당 날짜에 예약 정보가 있을 경우 원을 표시 */}
      {eventsForDate?.length > 0 && (
        <div className="relative">{getReservationCircles(eventsForDate)}</div>
      )}
    </div>
  );
};

const CustomToolbar = ({ label, onNavigate }: CustomToolbarProps) => (
  <div className="mx-auto mb-17 flex max-w-342 items-center justify-between px-4 py-5 md:mb-18">
    <button type="button" onClick={() => onNavigate("PREV")}>
      <IconPrev />
    </button>
    <span className="font-24px-bold">{label}</span>
    <button type="button" onClick={() => onNavigate("NEXT")}>
      <IconNext />
    </button>
  </div>
);

interface ReservationHistoryCalendarProps {
  activityId: number;
}

const ReservationHistoryCalendar = ({
  activityId,
}: ReservationHistoryCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택된 날짜

  const { setModalOpen, isModalOpen } = useModalStore();
  const setData = useReservationStore((state) => state.setData);

  const { data } = useGetMyReservationDashboard({
    activityId,
    year: currentYear.toString(),
    month: (currentMonth + 1).toString().padStart(2, "0"),
  });

  useEffect(() => {
    if (data) {
      setData(data.MonthReservations);
    }
  }, [data, setData]);

  const events: CalendarEvent[] = useMemo(() => {
    if (!data || !data.MonthReservations) return [];
    return data.MonthReservations.map((item) => ({
      start: new Date(item.date),
      end: new Date(item.date),
      allDay: true,
      reservations: item.reservations,
    }));
  }, [data]);

  const handleNavigate = (action: NavigateAction) => {
    let newDate = new Date();

    if (action === "PREV") {
      newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    } else if (action === "NEXT") {
      newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    } else if (action === "TODAY") {
      newDate = new Date();
    } else {
      return;
    }

    setCurrentDate(newDate);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const formattedDate = format(start, "yyyy-MM-dd");

    setSelectedDate(start);

    setModalOpen(
      <ReservationInfoModal
        selectedActivityId={activityId}
        selectedDate={formattedDate}
      />,
      {
        customClass: "md:w-400",
      },
    );
  };

  const dayPropGetter = (date: Date) => {
    const isSelected =
      selectedDate &&
      format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

    return {
      className: clsx(
        isSelected &&
          isModalOpen !== false &&
          "bg-brand-400 font-bold text-white",
        isModalOpen === false && "bg-transparent font-normal text-gray-500",
      ),
    };
  };

  return (
    <div className="mx-auto mt-10 w-full">
      <CustomToolbar
        label={format(currentDate, "yyyy년 MM월")}
        onNavigate={(action) => {
          if (action === "PREV" || action === "NEXT") {
            handleNavigate(action);
          }
        }}
      />

      <div className={clsx(styles.custom, "overflow-hidden rounded-12 border")}>
        <Calendar<CalendarEvent>
          localizer={localizer}
          events={events}
          style={{ height: 800 }}
          views={["month"]}
          defaultView="month"
          toolbar={false}
          date={currentDate}
          onNavigate={setCurrentDate}
          components={{
            event: CustomEvent,
            month: {
              dateHeader: MyDateHeader,
            },
          }}
          dayPropGetter={dayPropGetter}
          onSelectEvent={undefined}
          onSelectSlot={handleSelectSlot}
          selectable
          className="w-full cursor-pointer bg-white"
        />
      </div>
    </div>
  );
};

export default ReservationHistoryCalendar;
