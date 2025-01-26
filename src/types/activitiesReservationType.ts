export type CursorId = number;
export type Size = number;

/**
 * @description 내체험 리스트 조회 parameters
 * @param cursorId  커서 id
 * @param size 사이즈
 */
export interface GetMyActivities {
  cursorId?: CursorId;
  size?: Size;
}

/**
 * @description 내체험 리스트 조회 reponse내 activity
 * @param id 체험 id
 * @param userId 유저 id
 * @param bannerImageUrl 배너 이미지 url
 * @param subImages 서비이미지 배열
 * @param schedules 체험 시간대별 id
 * @param reviewCount 등록된 리뷰수
 * @param rating 별점
 * @param createdAt 체험 생성 시간
 * @param updatedAt 체험 업데이트 시간
 */
export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description 내체험 리스트 조회 response
 * @param cursorId  커서 id
 * @param totalCount 체험 총 수
 * @param activities 체험 내용
 */
export interface MyActivities {
  cursorId: CursorId;
  totalCount: number;
  activities: Activity[];
}

/**
 * @description 내체험 id
 */
export interface ActivityId {
  activityId: number;
}

/**
 * @description 내체험 월별 예약 현황 조회 params
 * @param activityId  내체험 id
 * @param year 조회 연도
 * @param month 조회 달
 */
export interface ReservationDashboardParams {
  activityId: ActivityId;
  year?: string;
  month?: string;
}

/**
 * @description 내체험 날짜별 예약 정보가 있는 스케줄 조회 params
 * @param activityId  내체험 id
 * @param date 조회 날짜
 */
export interface ReservatdeScheduleParams {
  activityId: ActivityId;
  date: string;
}

/**
 * @description 내체험 예약 시간대별 예약 내역 조회 params
 * @param activityId  내체험 id
 * @param cursorId 커서 id
 * @param size 사이즈
 * @param scheduleId 시간대별 id
 * @param status 예약 상태
 */
export interface ReservationsParams {
  activityId: ActivityId;
  cursorId?: number | undefined;
  size?: number | undefined;
  scheduleId: number | undefined;
  status: string;
}

/**
 * @description 내체험 예약 상태
 * @param activityId  내체험 id
 * @param reservationId 예약 id
 * @param status 예약 상태
 */
export interface ReservaitionState {
  activityId: ActivityId;
  reservationId: number;
  status: string;
}

/**
 * @description 내체험 예약 상태별 카운팅 - 캘린더 내 날짜별 상태
 * @param pending  신청 수
 * @param confirmed 승인 수
 * @param completed 거절 수
 */
export interface ReservationStatusCountType {
  completed: number;
  confirmed: number;
  pending: number;
}

/**
 * @description 내체험 예약 상태별 카운팅 - 캘린더 내 날짜별 상태
 * @param pending  신청 수
 * @param confirmed 승인 수
 * @param completed 거절 수
 */
export interface ModalReservationStatusCountType {
  confirmed: number;
  pending: number;
  declined: number;
}

/**
 * @description 내체험 예약현황 일별 상태정보
 * @param date  날짜
 * @param reservations 날짜별 예약 상태
 */
export interface ReservationDayInfoType {
  date: string;
  reservations: ReservationStatusCountType;
}

/**
 * @description 내체험 월별 예약 현황 조회
 * @param MonthReservations  내체험 월별 예약 현황 정보
 */
export interface ReservationMonthInfosType {
  MonthReservations: ReservationDayInfoType[];
}

/**
 * @description 내 체험 날짜별 예약정보(신청, 승인, 거절)이 있는 스케쥴
 * @param scheduleId  시간대별 id
 * @param startTime 체험 시작 시간
 * @param endTime 체험 종료 시간
 * @param count 시간대별 예약 상태 수
 */
export interface ReservationScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ModalReservationStatusCountType;
}

/**
 * @description 내 체험 예약 시간대 별 예약 내역 조회
 * @param id  시간대별 id
 * @param status 예약 상태
 * @param totalPrice 예약 총 가격
 * @param headCount 예약자 수
 * @param nickname 예약자 닉네임
 * @param userId 예약자 id
 * @param date 예약 날짜
 * @param startTime 예약 시작 시간
 * @param endTime  예약 종료 시간
 * @param createdAt 예약 등록 시간
 * @param updatedAt 예약 업데이트 시간
 * @param activityId 체험 id
 * @param scheduleId 예약 시간 id
 * @param reviewSubmitted 리뷰 작성 여부
 * @param teamId 팀 id
 */
export interface ReservationInfoType {
  id: number;
  status: string;
  totalPrice: number;
  headCount: number;
  nickname: string;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  activityId: number;
  scheduleId: number;
  reviewSubmitted: boolean;
  teamId: string;
}

/**
 * @description 내 체험 예약 시간대 별 예약 내역 리스트 조회
 * @param reservations 내 체험 예약 시간대 별 예약 내역
 * @param totalCount 내 체험 시간대별 예약 수
 * @param cursorId 커서 id
 */
export interface ReservationInfosType {
  reservations: ReservationInfoType[];
  totalCount: number;
  cursorId: number;
}

/**
 * @description 내 체험 예약 상태(승인,거절) 업데이트 Responses
 * @param id  시간대별 id
 * @param teamId 팀 id
 * @param userId 예약자 id
 * @param scheduleId 예약 시간 id
 * @param status 예약 상태
 * @param reviewSubmitted 리뷰 작성 여부
 * @param totalPrice 예약 총 가격
 * @param headCount 예약자 총 수
 * @param date 예약 날짜
 * @param startTimeTime  예약 시작 시간
 * @param endTime  예약 종료 시간
 * @param createdAt 예약 등록 시간
 * @param updatedAt 예약 업데이트 시간
 */
export interface ReservaitionStateUpdateRequest {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined";
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
 * @description
 * @param reservations 체험 시간별 타입
 * @param date 체험 날짜
 * @param startTime 체험 시작 시간
 * @param endTime 체험 종료 시간
 */
interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

/**
 * @description 내 체험 수정 Responses
 * @param title  체험 타이틀
 * @param category 체험 카테고리
 * @param description 체험 내용
 * @param price 체험 인당 가격
 * @param address 체험주소
 * @param bannerImageUrl 배너 이미지 url
 * @param subImageIdsToRemove 서브이미지 삭제 url
 * @param subImageUrlsToAdd 새로 등록된 서브이미지 url
 * @param scheduleIdsToRemove 삭제 체험 시간
 * @param schedulesToAdd  새로추가된 체험 시간
 * @param subImageUrls  서브이미지 배열
 */
export interface ActivityUpdateRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: Schedule[];
  subImageUrls?: { id?: number; imageUrl: string }[];
}

/**
 * @description 체험 수정 parmas
 * @param activityId  체험 id
 * @param updateData 수정 체험 내용
 */
export interface PatchMyActivityParams {
  activityId: number;
  updateData: ActivityUpdateRequest;
}
