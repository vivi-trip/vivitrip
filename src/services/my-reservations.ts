/**
 * @description API 호출 함수 - MyReservations
 */
import api from "@/src/services/axios";
import {
  CreateMyReservationReviewProps,
  ListMyReservationsProps,
  UpdateMyReservationProps,
} from "@/src/types/my-reservations";

/**
 * @description 내 예약 리스트 조회
 * @param size - 예약 갯수
 * @param status - 예약 상태
 * @param cursorId - 예약 커서 아이디
 */
export const listMyReservations = async ({
  size,
  status,
  cursorId,
}: ListMyReservationsProps) => {
  const context = {
    query: cursorId || size ? "?" : "",
    size: cursorId ? `cursorId=${cursorId}` : "",
    status: status ? `status=${status}` : "",
    cursorId: size ? `size=${size}` : "",
  };
  const response = await api.get(
    `/my-reservations${context.query}${context.size}${context.status}${context.cursorId}`,
  );
  return response;
};

/**
 * @description 내 예약 수정(취소)
 * @param reservationId - 예약 아이디
 * @param status - 예약 상태
 */
export const UpdateMyReservation = async ({
  reservationId,
  status,
}: UpdateMyReservationProps) => {
  const response = await api.patch(`/my-reservations/${reservationId}`, {
    status,
  });
  return response;
};

/**
 * @description 내 예약 리뷰 작성
 * @param reservationId - 예약 아이디
 * @param rating - 예약 리뷰 별점
 * @param content - 예약 리뷰 내용
 */
export const createMyReservationReview = async ({
  reservationId,
  rating,
  content,
}: CreateMyReservationReviewProps) => {
  const response = await api.post(`/my-reservations/${reservationId}`, {
    rating,
    content,
  });
  return response;
};
