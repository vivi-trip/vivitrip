/* eslint-disable no-console */
import Dropdown from "../Dropdown";
import IconKebab from "@/assets/svgs/ic_kebab.svg";
import HighlightText from "@/src/components/HighlightText/HighlightText";
import STATUS_KEYWORD_HIGHLIGHT from "@/src/constants/my-notifications";
import PATH_NAMES from "@/src/constants/pathname";
import type { MyNotificationsProps } from "@/src/types/my-notifications";
import { formatDateToKorean } from "@/src/utils/calendarFormatDate";
import { getTimeDiffText } from "@/src/utils/date";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

const NotificationItem = ({
  item,
  handleDelete,
}: {
  item: MyNotificationsProps;
  handleDelete: () => void;
}) => {
  const statusColor = useMemo<string | null>(() => {
    if (item.content.includes("승인")) {
      return `bg-${STATUS_KEYWORD_HIGHLIGHT["승인"]}`;
    }

    if (item.content.includes("거절")) {
      return `bg-${STATUS_KEYWORD_HIGHLIGHT["거절"]}`;
    }

    if (item.content.includes("새로 들어왔어요.")) {
      return `bg-${STATUS_KEYWORD_HIGHLIGHT["새로 들어왔어요."]}`;
    }

    return null;
  }, [item]);

  const dateText = useMemo<string>(() => {
    const timeDiff = getTimeDiffText(item.updatedAt);

    return timeDiff.includes("주 전")
      ? formatDateToKorean(item.updatedAt)
      : timeDiff;
  }, [item.updatedAt]);

  return (
    <div className="flex flex-col items-stretch justify-center gap-4 rounded border border-brand-100 bg-white p-12 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className={clsx(statusColor, "size-5 rounded-full")} />
          <p className="font-12px-regular text-gray-700">{dateText}</p>
        </div>
        <Dropdown>
          <Dropdown.Trigger>
            <IconKebab viewBox="0 0 40 40" width={20} height={20} />
          </Dropdown.Trigger>
          <Dropdown.Menu className="left-auto right-0 !mt-0 border border-brand-100 bg-white shadow-md">
            <Dropdown.Item
              className="border-none bg-white p-2 px-10"
              onClick={handleDelete}>
              <p className="font-14px-regular">알림 삭제</p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Link href={PATH_NAMES.MyReservations} draggable={false}>
        <HighlightText
          className="font-12px-regular"
          text={item.content}
          keywords={STATUS_KEYWORD_HIGHLIGHT}
        />
      </Link>
    </div>
  );
};

export default NotificationItem;
