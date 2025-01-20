/**
 * @description API 호출 타입 - Activites
 */
import {
  ActivityBasicDataType,
  Schedule,
  SubImage,
} from "@/src/types/activitiesResponses";

export type ActivityId = number;

/**
 * @description 체험
 * @param id - 체험 id
 * @param userId - 체험 등록자 id
 * @param title - 체험 제목
 * @param description - 체험 설명
 * @param category - 체험 종류
 * @param price - 체험 비용
 * @param address - 체험 주소
 * @param bannerImageUrl - 체험 배너 이미지
 * @param rating - 체험 별점
 * @param rating - 리뷰 개수
 * @param createdAt - 체험 등록일
 * @param updatedAt - 체험 수정일
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
 * @description 체험 리스트 조회
 * @param activities - 체험 정보
 * @param totalCount - 체험 개수
 */
export interface ActivitiesResponse {
  activities: Activity[];
  totalCount: number;
}

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
export interface CreateActivityProps extends ActivityBasicDataType {
  bannerImageUrl: string;
  subImageUrls: SubImage[];
  schedules: Schedule[];
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
  page?: number;
  size?: number;
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

export interface ActivityImageUrl {
  activityImageUrl: string;
}
