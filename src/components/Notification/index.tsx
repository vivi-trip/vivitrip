/* eslint-disable no-console */
import IconClose from "@/assets/svgs/close.svg";
import IconNotification from "@/assets/svgs/ic_notification.svg";
import IconRefresh from "@/assets/svgs/ic_refresh.svg";
import Dropdown from "@/src/components/Dropdown";
import NotificationItem from "@/src/components/NotificationItem";
import useListMyNotifications from "@/src/queries/my-notifications";
import { deleteMyNotification } from "@/src/services/my-notifications";
import type {
  MyNotificationsProps,
  NotificationId,
} from "@/src/types/my-notifications";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const Notification = () => {
  const router = useRouter();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [items, setItems] = useState<MyNotificationsProps[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);

  const size: number = 5;
  const { data, isPending, refetch } = useListMyNotifications({
    size,
    cursorId,
  });

  async function handleDeleteItem(id: NotificationId) {
    await deleteMyNotification({ notificationId: id });
    await refetch();
  }

  const handleIndicator = useCallback(async () => {
    if (data) {
      setTotalCount(data.data.totalCount);
      setItems(data.data.notifications);
      setCursorId(data.data.cursorId);
    }
  }, [data]);

  useEffect(() => {
    handleIndicator();
  }, [handleIndicator]);

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
