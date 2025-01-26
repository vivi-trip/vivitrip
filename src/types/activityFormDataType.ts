import {
  ActivityBasicDataType,
  Schedule,
  SubImage,
} from "@/src/types/activitiesResponses";

/**
 * @description 폼데이터 타입
 * @param bannerImageUrl - 배너 이미지
 * @param subImages - 소개 이미지
 * @param schedules - 체험 날짜 | 시작시간 | 종료시간
 */
export interface ActivityFormDataType extends ActivityBasicDataType {
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
}
