import ReservationCard from "./ReservationCard";
import mockReservationData from "./mockdata";
import IconEmpty from "@/assets/svgs/ic_empty.svg";
import { useGetMyReservations } from "@/src/queries/useMyReservations";
import { ReservationStatus } from "@/src/types/my-reservations";

const ReservationList = ({ status }: { status: ReservationStatus }) => {
  const { data, ref } = useGetMyReservations({
    size: 10,
    status: status === "" || status === "all" ? undefined : status,
  });

  const filteredMockData = mockReservationData.pages.map((page) => ({
    ...page,
    reservations:
      status === "all" || status === ""
        ? page.reservations
        : page.reservations.filter(
            (reservation) => reservation.status === status,
          ),
  }));

  // 🔹 전체 예약 데이터가 없는 경우 
  const isAllReservationsEmpty = mockReservationData.pages.every(
    (page) => page.totalCount === 0,
  );

  // 🔹 특정 status에 맞는 데이터가 없는 경우
  const isStatusNotFound =
    !isAllReservationsEmpty &&
    filteredMockData.every((page) => page.reservations.length === 0);

  return (
    <div className="mb-120 mt-12 md:mt-24 lg:mt-16">
      {isAllReservationsEmpty && (
        <div className="mt-80 items-center gap-20">
          <IconEmpty />
          <p className="">아직 등록한 체험이 없어요</p>
        </div>
      )}

      {!isAllReservationsEmpty && isStatusNotFound && (
      <div className="mt-80 text-center">
      <IconEmpty className="mx-auto" />
      <p className="mt-20 font-18px-medium"> 체험이 없습니다.</p>
    </div>
      )}

      {!isAllReservationsEmpty &&
        !isStatusNotFound &&
        filteredMockData.map((page) =>
          page.reservations.map((item) => (
            <ReservationCard key={item.id} reservation={item} />
          )),
        )}
      <div ref={ref} />
    </div>
  );
};

export default ReservationList;
