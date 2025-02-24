import ReservationList from "@/src/components/MyReservations/ReservationList";
import ReservationStatusDropdown from "@/src/components/MyReservations/ReservationStatusDropdown";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import { ReservationStatus } from "@/src/types/my-reservations";
import { useState } from "react";

const MyReservations = () => {
  const [status, setStatus] = useState<ReservationStatus | "">("");

  const handleStatusChange = (newStatus: ReservationStatus) => {
    setStatus(newStatus);
  };

  return (
    <div>
      <div className="mx-auto flex w-full min-w-344 justify-center gap-24 pt-72">
        <SideNavigationMenu />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-32px-bold">예약 내역</p>
            <ReservationStatusDropdown
              handleStatusChange={handleStatusChange}
            />
          </div>
          <div className="">
            <ReservationList status={status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
