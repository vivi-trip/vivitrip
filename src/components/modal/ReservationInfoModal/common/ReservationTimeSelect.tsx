
import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import Dropdown from "@/src/components/Dropdown";
import { ReservationScheduleType } from "@/src/types/activitiesReservationType";
import { useState } from "react";


interface ReservationTimeSelectProps {
  reservations?: ReservationScheduleType[];
  onSelect: (id: number) => void;
}

const ReservationTimeSelect = ({
  reservations,
  onSelect,
}: ReservationTimeSelectProps) => {
  const [selectReservation, setSelectReservation] =
    useState("예약 시간을 선택해주세요");

  const handleReservationSelect = (
    scheduleId: number,
    reservationTime: string,
  ) => {
    setSelectReservation(reservationTime);
    onSelect(scheduleId);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex justify-between h-56 w-full py-8 px-16 border rounded-4">
        {selectReservation} <IconArrowDown />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {reservations?.map((reservation) => {
          const reservationTime = `${reservation.startTime} ~ ${reservation.endTime}`;
          return (
            <Dropdown.Item
              key={reservation.scheduleId}
              className="font-16px-regular px-4 py-2 hover:bg-gray-200"
              onClick={() =>
                handleReservationSelect(reservation.scheduleId, reservationTime)
              }>
              {reservationTime}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ReservationTimeSelect;
