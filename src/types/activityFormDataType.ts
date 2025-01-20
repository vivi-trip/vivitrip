import {
  ActivityBasicDataType,
  Schedule,
  SubImage,
} from "@/src/types/activitiesResponses";

/**
 * @description 폼데이터 타입
 * @param title - 체험제목
 * @param category - 체험 카테고리
 * @param description - 체험 설명
 * @param address - 체험 주소
 * @param price - 체험 가격
 * @param bannerImageUrl - 배너 이미지
 * @param subImageUrls - 소개 이미지
 * @param scheduleIdsToRemove - 스케줄 삭제
 * @param schedules - 체험 날짜 | 시작시간 | 종료시간
 */
export interface ActivityFormDataType extends ActivityBasicDataType {
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
}
