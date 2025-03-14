import Button from "../Button/Button";
import IconClose from "@/assets/svgs/close.svg";
import IconNotification from "@/assets/svgs/ic_notification.svg";
import IconRefresh from "@/assets/svgs/ic_refresh.svg";
import Dropdown from "@/src/components/Dropdown";
import NotificationItem from "@/src/components/NotificationItem";
import { useInfiniteNotifications } from "@/src/queries/my-notifications";
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

  const { data, fetchNextPage, hasNextPage, isPending, refetch } =
    useInfiniteNotifications({ size: 5 });

  const handleDeleteItem = async (id: NotificationId) => {
    try {
      await deleteMyNotification({ notificationId: id });
      await refetch();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("알림 삭제 중 오류가 발생했습니다: ", error);
    }
  };

  const handleIndicator = useCallback(async () => {
    if (data) {
      setTotalCount(data.pages[0].totalCount);
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
                onClick={() => {
                  refetch();
                }}
                disabled={isPending}>
                <IconRefresh className="size-16" />
              </button>
            </div>
            <Dropdown.Close>
              <IconClose />
            </Dropdown.Close>
          </div>

          {totalCount > 0 && (
            <div className="flex h-main flex-col gap-8 overflow-auto p-24 pt-8 md:h-auto md:!max-h-320 md:p-16 md:pb-24 md:pt-8">
              {data?.pages.map((page, index) => {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`notifications_${index}`}
                    className="flex flex-col gap-8">
                    {page.notifications.map(
                      (notification: MyNotificationsProps) => {
                        return (
                          <NotificationItem
                            key={`notification_${notification.id}`}
                            item={notification}
                            handleDelete={() => {
                              handleDeleteItem(notification.id);
                            }}
                          />
                        );
                      },
                    )}
                  </div>
                );
              })}
              {hasNextPage && (
                <Button
                  type="button"
                  radius="4"
                  backgroundColor="green"
                  fontStyle="l"
                  className="p-4"
                  onClick={() => fetchNextPage()}>
                  더보기
                </Button>
              )}
            </div>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
