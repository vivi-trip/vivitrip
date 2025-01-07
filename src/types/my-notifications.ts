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
  size?: number;
  cursorId?: number;
}

/**
 * @description 내 알림 삭제
 * @param notificationId - 알람 id
 */
export interface DeleteMyNotificationProps {
  notificationId: NotificationId;
}
