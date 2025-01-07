/**
 * @description API 호출 함수 - MyNotifications
 */
import api from "@/src/services/axios";
import {
  DeleteMyNotificationProps,
  GetMyNotificationsProps,
} from "@/src/types/my-notifications";

/**
 * @description 내 알림 리스트 조회
 * @param size - 알림 갯수
 * @param cursorId - 알림 커서 아이디
 */
export const getActivity = async ({
  size,
  cursorId,
}: GetMyNotificationsProps) => {
  const context = {
    query: cursorId || size ? "?" : "",
    size: cursorId ? `cursorId=${cursorId}` : "",
    cursorId: size ? `size=${size}` : "",
  };
  const response = await api.get(
    `/my-notifications${context.query}${context.size}${context.cursorId}`,
  );
  return response;
};

/**
 * @description 내 알림 삭제
 * @param notificationId - 알람 id
 */
export const getActivityAvailableSchedule = async ({
  notificationId,
}: DeleteMyNotificationProps) => {
  const response = await api.delete(`/my-notifications/${notificationId}`);
  return response;
};
