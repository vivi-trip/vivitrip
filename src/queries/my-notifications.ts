/* eslint-disable no-console */
import { listMyNotifications } from "@/src/services/my-notifications";
import type { GetMyNotificationsProps } from "@/src/types/my-notifications";
import { useQuery } from "@tanstack/react-query";

/**
 * @description 내 알림 리스트 조회
 * @param size - 알림 갯수
 * @param cursorId - 알림 커서 아이디
 */
const useListMyNotifications = ({
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

export default useListMyNotifications;
