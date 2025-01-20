export type CursorId = number;
export type Size = number;

export interface GetMyActivities {
  cursorId?: CursorId;
  size?: Size;
}

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

export interface MyActivities {
  cursorId: CursorId;
  totalCount: number;
  activities: Activity[];
}

export interface ActivityId {
  activityId: number;
}

export interface ReservationDashboardParams {
  activityId: ActivityId;
  year?: string;
  month?: string;
}

export interface ReservatdeScheduleParams {
  activityId: number;
  date: string;
}

export interface ReservationsParams {
  activityId: number;
  cursorId?: number | undefined;
  size?: number | undefined;
  scheduleId: number | undefined;
  status: string;
}

export interface ReservaitionState {
  activityId: number;
  reservationId: number;
  status: string;
}

/**
 * 예약 상태별 카운팅 - 캘린더 내 날짜별 상태
 */
export interface ReservationStatusCountType {
  completed: number;
  confirmed: number;
  pending: number;
}
/**
 * 예약 상태별 카운팅 - 캘린더 내 날짜별 상태
 */
export interface ModalReservationStatusCountType {
  confirmed: number;
  pending: number;
  declined: number;
}

/**
 * 예약현황 일별 상태정보
 */
export interface ReservationDayInfoType {
  date: string;
  reservations: ReservationStatusCountType;
}

/**
 * 예약현황 월간 상태정보 리스트
 */
export interface ReservationMonthInfosType {
  MonthReservations: ReservationDayInfoType[];
}

/**
 * 내 체험 날짜별 예약정보(신청, 승인, 거절)이 있는 스케쥴
 */
export interface ReservationScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ModalReservationStatusCountType;
}

/**
 * 내 체험 예약 시간대 별 예약 내역 조회
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
 * 내 체험 예약 시간대 별 예약 내역 리스트 조회
 */
export interface ReservationInfosType {
  reservations: ReservationInfoType[];
  totalCount: number;
  cursorId: number;
}

/**
 * 내 체험 예약 상태(승인,거절) 업데이트
 */
export interface ReservaitionStateUpdateRequest {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

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

export interface PatchMyActivityParams {
  activityId: number;
  updateData: ActivityUpdateRequest;
}
