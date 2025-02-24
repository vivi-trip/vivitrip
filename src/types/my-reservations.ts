/**
 * @description API 호출 타입 - MyReservations
 */

export type ReservationId = number;
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed"
  | ""
  | "all";
export type ReservationRating = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * @description 내 예약 리스트 조회
 * @param size - 예약 갯수
 * @param status - 예약 상태
 * @param cursorId - 예약 커서 아이디
 */
export interface ListMyReservationsProps {
  size?: number;
  status?: ReservationStatus;
  cursorId?: number;
}

/**
 * @description 내 예약 수정(취소)
 * @param reservationId - 예약 아이디
 * @param status - 예약 상태
 */
export interface UpdateMyReservationProps {
  reservationId: number;
  status: ReservationStatus;
}

/**
 * @description 내 예약 리뷰 작성
 * @param reservationId - 예약 아이디
 * @param rating - 예약 리뷰 별점
 * @param content - 예약 리뷰 내용
 */
export interface CreateMyReservationReviewProps {
  reservationId: number;
  rating: ReservationRating;
  content: string;
}
