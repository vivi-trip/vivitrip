import { CursorId } from "@/src/types/activitiesReservationType";
import { ReservationStatus } from "@/src/types/my-reservations";

/**
 * @description 내 예약 체험 데이터
 * @param bannerImageUrl  배너 이미지 url
 * @param title 체험 제목
 * @param id 체험 id
 */
export interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

/**
 * @description 내 예약 내용
 * @param id - 체험 id
 * @param teamIdid - 팀 id
 * @param userId - 유저 id
 * @param activity - 체험 내용
 * @param scheduleId - 예약 시간 id
 * @param status - 예약 상태
 * @param reviewSubmitted - 리뷰 가능 여부
 * @param totalPrice - 체험  토탈 가격
 * @param headCount - 체험 신청 인원 수
 * @param date - 체험 예약 날짜
 * @param startTime - 체험 시작 시간
 * @param endTime - 체험 종료 시간
 * @param createdAt - 생성 시간
 * @param updatedAt - 수정 시간
 */
export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description 리뷰 모달 전달 데이터
 * @param bannerImageUrl - 배너이미지
 * @param title - 체험 타이틀
 * @param totalCount - 체험  토탈 가격
 * @param headCount - 체험 신청 인원 수
 * @param date - 체험 예약 날짜
 * @param startTime - 체험 시작 시간
 * @param endTime - 체험 종료 시간
 */
export interface ReviewData {
  id: number;
  bannerImageUrl: string;
  title: string;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

/**
 * @description 내 예약 체험 별 내용 배열
 */
export type Reservations = Reservation[];

/**
 * @description 내 예약 리스트 조회 리스폰스 데이터
 */
export interface GetMyReservations {
  cursorId: CursorId;
  reservations: Reservations;
  totalCount: number;
}

/**
 * @description 내 예약 수정 리스폰스 데이터
 * @param id - 체험 id
 * @param teamId - 팀 id
 * @param userId - 유저 id
 * @param activityId - 체험 id
 * @param scheduleId - 예약 시간 id
 * @param status - 예약 상태
 * @param reviewSubmitted - 리뷰 가능 여부
 * @param totalCount - 체험  토탈 가격
 * @param headCount - 체험 신청 인원 수
 * @param date - 체험 예약 날짜
 * @param startTime - 체험 시작 시간
 * @param endTime - 체험 종료 시간
 */
export interface MyReservationsPatchResponses {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description 내 예약 리뷰 작성 리스폰스 데이터
 * @param id - 체험 id
 * @param teamId - 팀 id
 * @param activityId - 체험 id
 * @param userId - 유저 id
 * @param rating - 별점
 * @param content - 리뷰 내용
 * @param createdAt - 리뷰 작성 시간
 * @param updatedAt - 리뷰 수정 시간
 * @param deletedAt - 리뷰 삭제 시간
 */
export interface PostMyReviwsResponses {
  id: number;
  teamId: string;
  activityId: number;
  userId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
