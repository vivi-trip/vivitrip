/**
 * @description API 호출 - Activites
 */
import api from "@/src/services/axios";
import {
  CreateActivityImageUrlProps,
  CreateActivityProps,
  CreateActivityReservationProps,
  GetActivityAvailableScheduleProps,
  GetActivityProps,
  GetActivityReviewsProps,
} from "@/src/types/activities";

/**
 * @description 체험 리스트 조회
 * @hayuri1990 - [GET] /activities 생성하신 함수로 교체해주시면 됩니다!
 */
export const listActivities = async () => {
  const response = await api.get("/activities");
  return response;
};

/**
 * @description 체험 등록
 * @param title - 체험 제목;
 * @param category - 체험 종류;
 * @param description - 체험 설명;
 * @param address - 체험 주소;
 * @param price - 체험 비용;
 * @param schedules - 체험 스케줄;
 * @param bannerImageUrl - 체험 배너 이미지 url;
 * @param subImageUrls - 체험 내용 이미지 url;
 */
export const createActivity = async ({
  title,
  category,
  description,
  address,
  price,
  schedules,
  bannerImageUrl,
  subImageUrls,
}: CreateActivityProps) => {
  const response = await api.post("/activities", {
    title,
    category,
    description,
    address,
    price,
    schedules,
    bannerImageUrl,
    subImageUrls,
  });
  return response;
};

/**
 * @description 체험 상세 조회
 * @param activityId - 체험 id
 */
export const getActivity = async ({ activityId }: GetActivityProps) => {
  const response = await api.get(`/activities/${activityId}`);
  return response;
};

/**
 * @description 체험 예약 가능일 조회
 * @param activityId - 체험 id
 * @param year - 년
 * @param month - 월
 */
export const getActivityAvailableSchedule = async ({
  activityId,
  year,
  month,
}: GetActivityAvailableScheduleProps) => {
  const response = await api.get(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`,
  );
  return response;
};

/**
 * @description 체험 리뷰 조회
 * @param activityId - 체험 id
 * @param page - 페이지
 * @param size - 갯수
 */
export const getActivityReviews = async ({
  activityId,
  page,
  size,
}: GetActivityReviewsProps) => {
  const response = await api.get(
    `/activities/${activityId}/reviews?page=${page}&size=${size}`,
  );
  return response;
};

/**
 * @description 체험 예약 신청
 * @param activityId - 체험 id
 * @param scheduleId - 체험 스케줄 id
 * @param headCount - 체험 헤드카운트(??)
 */
export const createActivityReservation = async ({
  activityId,
  scheduleId,
  headCount,
}: CreateActivityReservationProps) => {
  const response = await api.post(`/activities/${activityId}/reservations`, {
    scheduleId,
    headCount,
  });
  return response;
};

/**
 * @description 체험 이미지 url 생성
 * @param image - 체험 이미지 파일
 */
export const createActivityImageUrl = async ({
  image,
}: CreateActivityImageUrlProps) => {
  const response = await api.post(`/activities/image`, {
    image,
  });
  return response;
};
