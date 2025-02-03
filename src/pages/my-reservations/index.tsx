import ActivityList from "@/src/components/MyAtivities/ActivityList";
import ReservationList from "@/src/components/MyReservations/ReservationList";
import ReservationStatusDropdown from "@/src/components/MyReservations/ReservationStatusDropdown";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import { ReservationStatus } from "@/src/types/my-reservations";
import { GetMyReservations } from "@/src/types/my-reservatios-responses";
import { useRouter } from "next/router";
import { useState } from "react";

const MyReservations = () => {
  const [status, setStatus] = useState<ReservationStatus | "">("");

  const router = useRouter();

  const handleStatusChange = (newStatus: ReservationStatus) => {
    setStatus(newStatus);
  };

  return (
    <div>
      <div className="flex w-full justify-center gap-24 pt-72">
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
