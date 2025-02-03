import ReservationCard from "./ReservationCard";
import mockReservationData from "./mockdata";
import IconEmpty from "@/assets/svgs/ic_empty.svg";
import { useGetMyReservations } from "@/src/queries/useMyReservations";
import { ReservationStatus } from "@/src/types/my-reservations";

const ReservationList = ({ status }: { status: ReservationStatus | "" }) => {
  const { data, ref } = useGetMyReservations({
    size: 10,
    status: status === "" ? undefined : status,
  });

  const filteredMockData = mockReservationData.pages.map(page => ({
    ...page,
    reservations: status === "" 
      ? page.reservations 
      : page.reservations.filter(reservation => reservation.status === status)
  }));
  


  return (
    <div className="mb-120 mt-12 md:mt-24 lg:mt-16 flex flex-col gap-8 md:gap-16 lg:gap-24">
      {filteredMockData?.map((page) => {
        if (page.totalCount === 0) {
          return (
            <div
              key="no-activities"
              className="mt-80 flex flex-col items-center gap-20">
              <div className="">
                <IconEmpty />
              </div>
              <p className="">아직 등록한 체험이 없어요</p>
            </div>
          );
        }

        return page.reservations.map((item) => (
          <ReservationCard key={item.id} reservation={item} />
        ));
      })}
      <div ref={ref} />
    </div>
  );
};

export default ReservationList;
