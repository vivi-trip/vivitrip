/* eslint-disable no-console */
import {
  getMyNotifications,
  listMyNotifications,
} from "@/src/services/my-notifications";
import type { GetMyNotificationsProps } from "@/src/types/my-notifications";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

/**
 * @description 내 알림 리스트 조회
 * @param size - 알림 갯수
 * @param cursorId - 알림 커서 아이디
 */
export const useListMyNotifications = ({
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
 * @description 내 알림 리스트 무한스크롤
 */
export const useInfiniteNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? null,
    refetchInterval: 1000 * 10, // 10초마다 API 호출
    refetchOnWindowFocus: false, // 탭이 비활성화일 때 API 호출 비활성화
  });
};
