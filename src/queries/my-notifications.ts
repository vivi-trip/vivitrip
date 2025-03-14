import { getMyNotifications } from "@/src/services/my-notifications";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * @description 내 알림 리스트 무한스크롤
 */
const useInfiniteNotifications = ({ size }: { size: number }) => {
  return useInfiniteQuery({
    queryKey: ["notifications", size],
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      getMyNotifications({ size, cursorId: pageParam }),
    initialPageParam: null,
    getNextPageParam: (nextPageParam) => nextPageParam.cursorId ?? null,
    refetchInterval: 1000 * 60, // 60초마다 API 호출
    refetchOnWindowFocus: false, // 탭이 비활성화일 때 API 호출 비활성화
  });
};

export default useInfiniteNotifications;
