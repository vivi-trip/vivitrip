/**
 * @description API 호출 함수 - Activites
 */
import api from "@/src/services/axios";
import {
  ActivitiesResponse,
  ActivityImageUrl,
  CreateActivityProps,
  CreateActivityReservationProps,
  GetActivityAvailableScheduleProps,
  GetActivityProps,
  GetActivityReviewsProps,
} from "@/src/types/activities";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";

/**
 * @description 모든 체험 리스트 조회
 * @param sort - 체험 정렬 기준
 * @param category - 체험 종류
 */
export const listAllActivities = async (
  sort: string,
  category?: string,
): Promise<ActivitiesResponse> => {
  let url;

  if (category) {
    url = `/activities?method=offset&sort=${sort}&category=${category}`;
  } else {
    url = `/activities?method=offset&sort=${sort}`;
  }

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { activities: [], totalCount: 0 };
  }
};

/**
 * @description 인기 체험 및 검색 리스트 조회
 * @param size - 개수
 * @param page - 페이지 번호
 * @param q - 검색어
 */
export const listPopularActivities = async (
  size: number,
  page?: number,
  q?: string,
): Promise<ActivitiesResponse> => {
  let url = `/activities?method=offset&sort=most_reviewed&page=1&size=${size}`;

  if (q) {
    url = `/activities?method=offset&keyword=${q}&sort=latest&page=${page}&size=${size}`;
  }

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { activities: [], totalCount: 0 };
  }
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
export const getActivity = async ({
  activityId,
}: GetActivityProps): Promise<ActivityDetailResponse> => {
  const response = await api.get(`/activities/${activityId}`);
  return response.data;
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
  let url;

  if (!page && !size) {
    url = `/activities/${activityId}/reviews`;
  } else {
    url = `/activities/${activityId}/reviews?page=${page}&size=${size}`;
  }

  const response = await api.get(url);
  return response.data;
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
export const createActivityImageUrl = async (
  file: File,
): Promise<ActivityImageUrl> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("activities/image", formData);
  return response.data;
};
