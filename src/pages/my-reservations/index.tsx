import ReservationList from "@/src/components/MyReservations/ReservationList";
import ReservationStatusDropdown from "@/src/components/MyReservations/ReservationStatusDropdown";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import MyPageWrap from "@/src/containers/MyPageWrap";
import useUserStore from "@/src/stores/useUserStore";
import { ReservationStatus } from "@/src/types/myReservations";
import { useState } from "react";

const MyReservations = () => {
  const { userData } = useUserStore();
  const [status, setStatus] = useState<ReservationStatus | "">("");

  const handleStatusChange = (newStatus: ReservationStatus) => {
    setStatus(newStatus);
  };

  if (!userData) return null;

  return (
    <MyPageWrap>
      <SideNavigationMenu />
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-32px-bold">예약 내역</p>
          <ReservationStatusDropdown handleStatusChange={handleStatusChange} />
        </div>
        <div>
          <ReservationList status={status} />
        </div>
      </div>
    </MyPageWrap>
  );
};

export default MyReservations;
