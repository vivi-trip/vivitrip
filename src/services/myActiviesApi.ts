import api from "@/src/services/axios";
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
} from "@/src/types/activitiesReservationType";

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
  const { activityId, year, month } = params;
  const response = await api.get(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      params: { year, month },
    },
  );
  return { MonthReservations: response.data };
};

/**
내 체험 날짜별 예약 정보 (신청,승인, 거절)가 있는 스케줄 조회
 */
export const getMyReservedSchedule = async ({
  activityId: { activityId },
  date,
}: ReservatdeScheduleParams): Promise<ReservationScheduleType[]> => {
  const response = await api.get(
    `/my-activities/${activityId}/reserved-schedule`,
    { params: { date } },
  );
  return response.data;
};

/**
내 체험 예약 시간대별 예약 내역 조회 
 */
export const getMyResrvations = async ({
  activityId: { activityId },
  ...restParams
}: ReservationsParams): Promise<ReservationInfosType> => {
  const response = await api.get(`/my-activities/${activityId}/reservations`, {
    params: restParams,
  });
  return response.data;
};

/**
내 체험 날짜별 예약 상태(승인,거절) 업데이트
 */
export const patchReservaionState = async ({
  activityId: { activityId },
  ...restParams
}: ReservaitionState): Promise<ReservaitionStateUpdateRequest> => {
  const response = await api.patch(
    `/my-activities/${activityId}/reservations/${restParams.reservationId}`,
    { status: restParams.status },
  );
  return response.data;
};

/**
내 체험 삭제
 */

export const deleteArticle = async (activityId: number): Promise<void> => {
  await api.delete(`/my-activities/${activityId}`);
};

/**
내 체험 수정
 */
export const patchMyActivity = async (
  activityId: number,
  updateData: ActivityUpdateRequest,
) => {
  const response = await api.patch(`/my-activities/${activityId}`, updateData);
  return response.data;
};
