/* eslint-disable no-console */
import IconClose from "@/assets/svgs/close.svg";
import HighlightText from "@/src/components/HighlightText/HighlightText";
import STATUS_KEYWORD_HIGHLIGHT from "@/src/constants/my-notifications";
import PATH_NAMES from "@/src/constants/pathname";
import type { MyNotificationsProps } from "@/src/types/my-notifications";
import { getTimeDiffText } from "@/src/utils/date";
import clsx from "clsx";
import Link from "next/link";
import { MouseEvent, useMemo } from "react";

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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleDelete();
  };

  return (
    <Link
      href={PATH_NAMES.MyReservations}
      className="flex flex-col items-stretch justify-center gap-4 rounded border border-brand-100 bg-white p-12 shadow-md">
      <div className="flex items-center justify-between">
        <p className={clsx(statusColor, "size-5 rounded-full")} />
        <IconClose
          className="origin-right scale-75 cursor-pointer text-gray-500"
          onClick={handleClick}
        />
      </div>

      <HighlightText
        className="font-12px-regular"
        text={item.content}
        keywords={STATUS_KEYWORD_HIGHLIGHT}
      />

      <p className="font-12px-regular text-gray-700">
        {getTimeDiffText(item.updatedAt)}
      </p>
    </Link>
  );
};

export default NotificationItem;
