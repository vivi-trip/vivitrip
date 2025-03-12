/**
 * @description API 호출 함수 - MyNotifications
 */
import api from "@/src/services/axios";
import type {
  DeleteMyNotificationProps,
  GetMyNotificationsProps,
} from "@/src/types/my-notifications";
import convertParamToQueryString from "@/src/utils/convertParamToQueryString";

/**
 * @description 내 알림 리스트 조회
 * @param size - 알림 갯수
 * @param cursorId - 알림 커서 아이디
 */
export const listMyNotifications = async ({
  size,
  cursorId,
}: GetMyNotificationsProps) => {
  const params: string[] = [`size=${size}`];

  if (cursorId) {
    params.push(`cursorId=${cursorId}`);
  }

  const response = await api.get(
    `/my-notifications${convertParamToQueryString(params)}`,
  );
  return response;
};

/**
 * @description 내 알림 삭제
 * @param notificationId - 알람 id
 */
export const deleteMyNotification = async ({
  notificationId,
}: DeleteMyNotificationProps) => {
  const response = await api.delete(`/my-notifications/${notificationId}`);
  return response;
};
