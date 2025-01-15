import {
  deleteMyNotification,
  listMyNotifications,
} from "@/src/services/my-notifications";
import type { GetMyNotificationsProps } from "@/src/types/my-notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * @description 내 알림 리스트 조회
 * @param size - 알림 갯수
 * @param cursorId - 알림 커서 아이디
 */
export const useMyNotificationsListQuery = ({
  size,
  cursorId,
}: GetMyNotificationsProps) => {
  return useQuery({
    queryKey: ["my-notifications"],
    queryFn: () => listMyNotifications({ size, cursorId }),
    refetchInterval: 1000 * 10, // 10초마다 API 호출
    refetchOnWindowFocus: false, // 탭이 비활성화일 때 API 호출 비활성화
  });
};

/**
 * @description 내 알림 삭제
 * @param notificationId - 알람 id
 */
export const useDeleteMyNotification = () => {
  // const response = await api.delete(`/my-notifications/${notificationId}`);

  return useMutation({
    mutationKey: ["my-notifications"],
    mutationFn: deleteMyNotification,
    onSuccess(data, variables, context) {
      console.log(
        "🚀 ~ onSuccess ~ data, variables, context:",
        data,
        variables,
        context,
      );
      /**
       * @todo
       * 알림 삭제 성공 토스트 출력
       */
    },
    onError(error, variables, context) {
      console.log(
        "🚀 ~ onError ~ error, variables, context:",
        error,
        variables,
        context,
      );
      /**
       * @todo
       * 알림 삭제 실패 토스트 출력
       */
    },
  });
};
