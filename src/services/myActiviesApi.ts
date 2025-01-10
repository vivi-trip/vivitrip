import {
  ActivityUpdateRequest,
  GetMyActivities,
  MyActivities,
  ReservaitionState,
  ReservaitionStateUpdateRequest,
  ReservatdeScheduleParams,
  ReservationDashboardParams,
  ReservationInfosType,
  ReservationMonthInfosType,
  ReservationScheduleType,
  ReservationsParams,
} from "../types/activitiesReservationType";
import api from "./axios";

/**
내 체험 리스트 조회 
 */
export const getMyActivities = async (
  params: GetMyActivities,
): Promise<MyActivities> => {
  const response = await api.get("/my-activities", { params });
  return response.data;
};

/**
내 체험 월별 예약 현황 조회
 */
export const getMyReservationDashboard = async (
  params: ReservationDashboardParams,
): Promise<ReservationMonthInfosType> => {
  const response = await api.get(
    `/my-activities/${params.activityId}/reservation-dashboard`,
    { params },
  );
  return response.data;
};

/**
내 체험 날짜별 예약 정보 (신청,승인, 거절)가 있는 스케줄 조회
 */
export const getMyReservedSchedule = async (
  params: ReservatdeScheduleParams,
): Promise<ReservationScheduleType> => {
  const response = await api.get(
    `/my-activities/${params.activityId}/reserved-schedule`,
    { params },
  );
  return response.data;
};

/**
내 체험 예약 시간대별 예약 내역 조회 
 */
export const getMyResrvations = async (
  params: ReservationsParams,
): Promise<ReservationInfosType> => {
  const response = await api.get(
    `/my-activities/${params.activityId}/reservations`,
    { params },
  );
  return response.data;
};

/**
내 체험 날짜별 예약 상태(승인,거절) 업데이트
 */
export const patchReservaionState = async (
  params: ReservaitionState,
): Promise<ReservaitionStateUpdateRequest> => {
  const response = await api.patch(
    `/my-activities/${params.activityId}/reservations/${params.reservationId}`,
    { status: params.status },
  );
  return response.data;
};

/**
내 체험 삭제
 */

export const deleteArticle = async (params: number): Promise<void> => {
  await api.delete(`/my-activities/{params.activityId}`, { params });
};

/**
내 체험 수정
 */
export const patchMyActivity = async (
  activityId: number,
  updateData: ActivityUpdateRequest,
): Promise<ActivityUpdateRequest> => {
  const response = await api.patch(`/my-activities/${activityId}`, updateData);
  return response.data;
};
