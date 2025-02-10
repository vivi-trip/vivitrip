/**
 * @description 서브이미지
 * @param id 서브이미지 id
 * @param imageUrl 서브이미지 url
 */
export interface SubImage {
  id?: number;
  imageUrl: string;
}

/**
 * @description 체험 시단대별 스케쥴
 * @param id 체험 시간대별 id
 * @param date 체험 날짜
 * @param startTime 체험 시작시간
 * @param endTime 체험 종료시간
 */
export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Schedules {
  schedules: Schedule[];
}

/**
 * @description 체험 기본데이터 타입
 * @param title 체험 타이틀
 * @param description 체험 내용
 * @param category 체험 카테고리
 * @param price 체험 인당 가격
 * @param address 체험 주소
 */
export interface ActivityBasicDataType {
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
}

/**
 * @description 체험 상세 리스폰스 데이터
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
export interface ActivityDetailResponse extends ActivityBasicDataType {
  id: number;
  userId: number;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
