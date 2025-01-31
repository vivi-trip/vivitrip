/* eslint-disable no-console */
import IconClose from "@/assets/svgs/close.svg";
import IconNotification from "@/assets/svgs/ic_notification.svg";
import IconRefresh from "@/assets/svgs/ic_refresh.svg";
import Dropdown from "@/src/components/Dropdown";
import NotificationItem from "@/src/components/NotificationItem";
import {
  useDeleteMyNotification,
  useMyNotificationsListQuery,
} from "@/src/queries/my-notifications";
import type {
  MyNotificationsProps,
  NotificationId,
} from "@/src/types/my-notifications";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

/**
 * @description 알림 목데이터
 */
const MOCK_DATA: MyNotificationsProps[] = [
  {
    id: 1001,
    teamId: "팀 아이디 1",
    userId: 1002,
    content: "체험명(2023-01-14 15:00~18:00) 예약이 승인되었어요.",
    createdAt: "2025-01-13T14:00:00",
    updatedAt: "2025-01-13T16:30:00",
    deletedAt: "2025-01-13T18:00:00",
  },
  {
    id: 2001,
    teamId: "팀 아이디 2",
    userId: 2002,
    content: "체험명(2023-01-14 15:00~18:00) 예약이 거절되었어요.",
    createdAt: "2025-01-14T14:00:00",
    updatedAt: "2025-01-14T16:30:00",
    deletedAt: "2025-01-14T18:00:00",
  },
  {
    id: 3001,
    teamId: "팀 아이디 3",
    userId: 3002,
    content: "체험명(2023-01-14 15:00~18:00) 예약이 새로 들어왔어요.",
    createdAt: "2025-01-15T14:00:00",
    updatedAt: "2025-01-15T16:30:00",
    deletedAt: "2025-01-15T18:00:00",
  },
];

const Notification = () => {
  const router = useRouter();
  const size: number = 10;
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [items, setItems] = useState<MyNotificationsProps[]>([]);
  const { data, isLoading, isPending, refetch } = useMyNotificationsListQuery({
    size,
    cursorId,
  });
  const { mutate: deleteNotification } = useDeleteMyNotification();

  const handleDeleteItem = async (id: NotificationId) => {
    console.log("🚀 ~ handleDeleteItem ~ id:", id);
    /**
     * @todo
     * 알림 삭제 함수 실행
     */
    const response = await deleteNotification({ notificationId: id });
    console.log("🚀 ~ handleDeleteItem ~ response:", response);

    setItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  /**
   * @todo
   * 실제 알림 데이터로 구현 시 수정해야함.
   */
  useEffect(() => {
    setTotalCount(items.length);
  }, [items]);

  const handleIndicator = useCallback(async () => {
    if (isLoading) return;

    if (data) {
      setCursorId(data.data.cursorId);
      setTotalCount(MOCK_DATA.length);
      // setTotalCount(data.data.totalCount);
      // setItems(data.data.notifications);
      setItems(MOCK_DATA);
    }
  }, [data, isLoading]);

  useEffect(() => {
    handleIndicator();
  }, [handleIndicator]);

  useEffect(() => {
    console.log("🚀 ~ Notification ~ router:", router);
  }, [router]);

  return (
    <Dropdown sustain key={router.asPath}>
      <Dropdown.Trigger>
        {totalCount > 0 && (
          <i className="absolute right-0 top-0 z-10 size-8 -translate-x-2 -translate-y-2 rounded-full border border-white bg-red-200" />
        )}
        <IconNotification className="text-gray-600 focus:outline-none" />
      </Dropdown.Trigger>

      <Dropdown.Menu className="left-auto right-0 w-fit !border-gray-200 shadow-xl">
        <div className="fixed inset-0 z-50 flex flex-col bg-brand-200 md:relative md:inset-auto md:min-w-320">
          <div className="flex h-header items-center justify-between p-24 pb-16 text-brand-600 last:pb-16 md:h-auto md:p-16 md:pb-8">
            <div className="flex items-center justify-start gap-8">
              <p className="font-20px-bold text-nowrap">
                {totalCount > 0 ? `알림 ${totalCount}개` : `알림이 없습니다.`}
              </p>
              <button
                type="button"
                aria-label="새로고침"
                onClick={() => refetch()}
                disabled={isPending}>
                <IconRefresh className="size-16" />
              </button>
            </div>
            <Dropdown.Close>
              <IconClose />
            </Dropdown.Close>
          </div>

          {items && items.length > 0 && (
            <div className="flex h-main flex-col gap-8 overflow-auto p-24 pt-8 md:h-320 md:!max-h-[50vh] md:p-16 md:pb-24 md:pt-8">
              {items.map((item) => {
                return (
                  <NotificationItem
                    key={`MyNotifications_${item.id}`}
                    item={item}
                    handleDelete={() => {
                      handleDeleteItem(item.id);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
