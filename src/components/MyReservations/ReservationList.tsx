import ReservationCard from "./ReservationCard";
import IconEmpty from "@/assets/svgs/ic_empty.svg";
import Loading from "@/src/components/Loading";
import { useGetMyReservations } from "@/src/queries/useMyReservations";
import { ReservationStatus } from "@/src/types/my-reservations";

const ReservationList = ({ status }: { status: ReservationStatus }) => {
  const { data, ref, isLoading, isError } = useGetMyReservations({
    size: 20,
    status: status === "" ? undefined : status,
  });

  if (isLoading) {
    return (
      <Loading
        isOverlay="window"
        overlayColor="blue"
        isAbsolute="static"
        loadingBoxColor="black"
        size={{ sm: 50, md: 60, lg: 70 }}
        loadingText="잠시만 기다려주세요."
        textStyle="font-18px-medium md:font-20px-regular lg:font-24px-regular"
        textColor="text-brand-50"
        className="p-30"
      />
    );
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  const isAllReservationsEmpty =
    !data || data.pages.every((page) => page.totalCount === 0);

  const isStatusNotFound =
    !isAllReservationsEmpty &&
    data.pages.every((page) => page.reservations.length === 0);

  const filteredData = data?.pages.map((page) => ({
    ...page,
    reservations:
      status === ""
        ? page.reservations
        : page.reservations.filter(
            (reservation) => reservation.status === status,
          ),
  }));

  return (
    <div className="my-48">
      {isAllReservationsEmpty && (
        <div className="flex flex-col items-center gap-16">
          <IconEmpty />
          <p className="font-18px-medium">체험이 없습니다.</p>
        </div>
      )}

      {!isAllReservationsEmpty &&
        !isStatusNotFound &&
        filteredData?.map((page) =>
          page.reservations.map((item) => (
            <ReservationCard key={item.id} reservation={item} />
          )),
        )}
      <div ref={ref} />
    </div>
  );
};

export default ReservationList;
