/**
 * @description API 호출 타입 - Activites
 */

export type ActivityId = number;

/**
 * @description 체험 등록
 * @param title - string, 체험 제목;
 * @param category - string, 체험 종류;
 * @param description - string, 체험 설명;
 * @param address - string, 체험 주소;
 * @param price - 체험 비용;
 * @param schedules - string[], 체험 스케줄;
 * @param bannerImageUrl - string, 체험 배너 이미지 url;
 * @param subImageUrls - string[], 체험 내용 이미지 url;
 */
export interface CreateActivityProps {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: string[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

/**
 * @description 체험 상세 조회
 * @param activityId - 체험 id
 */
export interface GetActivityProps {
  activityId: ActivityId;
}

/**
 * @description 체험 예약 가능일 조회
 * @param activityId - 체험 id
 * @param year - 년
 * @param month - 월
 */
export interface GetActivityAvailableScheduleProps {
  activityId: ActivityId;
  year: number;
  month: number;
}

/**
 * @description 체험 리뷰 조회
 * @param activityId - 체험 id
 * @param page - 페이지
 * @param size - 갯수
 */
export interface GetActivityReviewsProps {
  activityId: ActivityId;
  page: number;
  size: number;
}

/**
 * @description 체험 예약 신청
 * @param activityId - 체험 id
 * @param scheduleId - 체험 스케줄 id
 * @param headCount - 체험 헤드카운트(??)
 */
export interface CreateActivityReservationProps {
  activityId: number;
  scheduleId: number;
  headCount: number;
}

/**
 * @description 체험 이미지 url 생성
 * @param image - 체험 이미지 파일
 */
export interface CreateActivityImageUrlProps {
  image: File;
}
