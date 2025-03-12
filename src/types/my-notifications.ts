/**
 * @description API 호출 타입 - MyNotifications
 */

export type NotificationId = number;

/**
 * @description 내 알림 리스트 조회
 * @param size - 알림 갯수
 * @param cursorId - 알림 커서 아이디
 */
export interface GetMyNotificationsProps {
  size: number;
  cursorId?: number | null;
}

/**
 * @description 내 알림 데이터
 * @param id - 알림 ID;
 * @param teamId - 팀 ID;
 * @param userId - 유저 ID;
 * @param content - 콘텐츠;
 * @param createdAt - 알림 생성일;
 * @param updatedAt - 알림 수정일;
 * @param deletedAt - 알림 삭제알;
 */
export interface MyNotificationsProps {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

/**
 * @description 내 알림 삭제
 * @param notificationId - 알람 id
 */
export interface DeleteMyNotificationProps {
  notificationId: NotificationId;
}
