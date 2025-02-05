import {
  UpdateMyReservation,
  createMyReservationReview,
  listMyReservations,
} from "../services/my-reservations";
import {
  CreateMyReservationReviewProps,
  ListMyReservationsProps,
  UpdateMyReservationProps,
} from "../types/my-reservations";
import { GetMyReservations } from "@/src/types/my-reservatios-responses";
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/**
 * @description 내 예약 리스트 조회
 * @param size - 예약 갯수
 * @param cursorId - 예약 커서 id
 * @param status - 예약 상태
 */

export const useGetMyReservations = ({
  size,
  status,
}: Partial<Omit<ListMyReservationsProps, "cursorId">>) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery(
    infiniteQueryOptions<GetMyReservations>({
      queryKey: ["myReservations", { size, status }],
      queryFn: ({ pageParam }) => {
        const cursorId = typeof pageParam === "number" ? pageParam : undefined;
        return listMyReservations({ size, cursorId, status });
      },
      getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
      initialPageParam: 1,
    }),
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    ref,
  };
};

/**
 * @description 내 예약 수정
 * @param reservationId - 예약 id
 * @param status - 예약 상태
 */
export const usePatchMyReservation = () => {
  return useMutation({
    mutationKey: ["myReservation"],
    mutationFn: ({ reservationId, status }: UpdateMyReservationProps) =>
      UpdateMyReservation({ reservationId, status }),
  });
};

/**
 * @description 내 예약 리뷰 작성
 * @param reservationId - 예약 id
 * @param rating - 예약 별점
 * @param content - 평점
 */
export const useCreateReviews = () => {
  return useMutation({
    mutationFn: ({
      reservationId,
      rating,
      content,
    }: CreateMyReservationReviewProps) =>
      createMyReservationReview({ reservationId, rating, content }),
  });
};
