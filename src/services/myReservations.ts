/**
 * @description API 호출 함수 - MyReservations
 */
import api from "@/src/services/axios";
import {
  CreateMyReservationReviewProps,
  ListMyReservationsProps,
  UpdateMyReservationProps,
} from "@/src/types/myReservations";
import {
  GetMyReservations,
  MyReservationsPatchResponses,
  PostMyReviwsResponses,
} from "@/src/types/myReservationsResponses";

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
}: ListMyReservationsProps): Promise<GetMyReservations> => {
  const params: string[] = [];

  if (cursorId) {
    params.push(`cursorId=${cursorId}`);
  }

  if (status) {
    params.push(`status=${status}`);
  }

  if (size) {
    params.push(`size=${size}`);
  }

  // 쿼리 파라미터가 하나 이상 있을 경우 ?로 시작하고, 나머지는 &로 연결
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";

  const response = await api.get(`/my-reservations${queryString}`);
  return response.data;
};

/**
 * @description 내 예약 수정(취소)
 * @param reservationId - 예약 아이디
 * @param status - 예약 상태
 */
export const UpdateMyReservation = async ({
  reservationId,
  status,
}: UpdateMyReservationProps): Promise<PostMyReviwsResponses> => {
  const response = await api.patch(`/my-reservations/${reservationId}`, {
    status,
  });
  return response.data;
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
}: CreateMyReservationReviewProps): Promise<MyReservationsPatchResponses> => {
  const response = await api.post(
    `/my-reservations/${reservationId}/reviews
`,
    {
      rating,
      content,
    },
  );
  return response.data;
};
